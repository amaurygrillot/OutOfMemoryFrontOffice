import {AfterContentChecked, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "@app/app.component";
import {MatDialog} from "@angular/material/dialog";
import {Challenge} from "@app/shared/models/challenge";
import {ChallengeService} from "@app/services/challenge.service";
import {ChallengeResult} from "@app/shared/models/challengeresult.model";
import {FullCodeEditorComponent} from "@app/code-editor/full-code-editor.component";
import {SharedComponent} from "@app/shared/shared.component";
import {ChallengeBoardComponent} from "@app/challenge/challenge-board/challenge-board.component";
import {lastValueFrom} from "rxjs";
import {environment} from "@environments/environment";

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit, AfterContentChecked  {

  @Input() challenge!: Challenge;
  @ViewChild('codeEditor') codeEditor!: FullCodeEditorComponent;
  @ViewChild('challengeBoard') challengeBoard!: ChallengeBoardComponent;
  hasLoaded = false;
  participating = false;
  loading = false;
  challengeResultExists = false;
  challengeResult!: ChallengeResult;
  showTestResults = false;
  testResults: string[] = [];
  constructor(private _appComponent: AppComponent, private _challengeService: ChallengeService, private _dialog: MatDialog, private _sharedComponent: SharedComponent) {

  }

  ngAfterContentChecked(): void {
        if(this.codeEditor && this.challengeResultExists && !this.codeEditor.challengeResult)
        {
          this.codeEditor.challengeResult = this.challengeResult;
          if(sessionStorage.getItem('userId') !== this.challengeResult.user_id)
          {
            this.codeEditor.readonly = true;
          }
          this.codeEditor.loadAllLanguagesBaseValue(30 * 1000);
        }
    }


  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this._challengeService.checkChallengeResultExists(this.challenge.challenge_id).then(result =>
    {
      if(result.ChallengeResults.length > 0)
      {
        this.challengeResultExists = true;
        this.challengeResult = result.ChallengeResults[0] as ChallengeResult;
        this.challengeResult.created_at = this._sharedComponent.formatDateEuropean(this.challengeResult.created_at);
        this.challengeResult.updated_at = this._sharedComponent.formatDateEuropean(this.challengeResult.updated_at);

      }
    }).finally(()=> {
      this.hasLoaded = true;
    });

  }


  participateChallenge() {
    if(!sessionStorage.getItem('userId'))
    {
      alert("Veuillez vous connecter avant de participer au challenge.")
    }
    else
    {
      this.participating = true;
    }
  }

  submitResult() {
    this.loading = true;
    let challengeResult = this.createChallengeResultObject();
    if(challengeResult === null)
    {
      return;
    }
    let result = 0;
    let file = new Blob([this.codeEditor.code], {type: this.codeEditor.selectedProgrammingLanguage.fileExtension});
    lastValueFrom(this._challengeService.checkResults(file, this.codeEditor.selectedProgrammingLanguage, this.challenge.challenge_id, challengeResult.uid))
      .then((data) =>
      {
        console.log(data)
        challengeResult!.resultat_obtenu = ((data.passed / data.totalTests) * 100)+ "%";
        challengeResult!.temps_execution = data.totalTime.toFixed(3);
        this.testResults = data.results.map((testResult: any) =>
        {
          let res = testResult.substring(0,testResult.indexOf('Le programme s\'est arrêté avec le code'));
          return res.substring(0, res.indexOf('\n') + 1) + 'Résultat : ' + res.substring(res.indexOf('\n') + 1);
        });
        this.showTestResults = true;
      })
      .catch((reason) => {
        console.log(reason)
      })
      .finally(() =>
      {
        if(challengeResult === null)
        {
          return;
        }
        this._challengeService.postChallengeResult(challengeResult, this.challengeResultExists).then((data) =>
        {
          if(this.challengeResultExists && challengeResult !== null)
          {
            this.challengeResult = challengeResult;
            this.challengeResult.uid = data.uidChallengeResult;
            this.challengeResult.updated_at = this._sharedComponent.formatDateEuropean(new Date().toString());
            this.codeEditor.challengeResult = this.challengeResult;
            this.challengeResultExists = true;
          }
        })
          .catch((reason) => {
            console.log(reason.error);
          })
          .finally(() =>
          {
            this.codeEditor.saveCodeNoExecution().then((result) =>
            {
              this.loading = false;
              this.challengeBoard.updateChallengeBoard()
            })
          });
      });



  }

  private createChallengeResultObject(): ChallengeResult | null {
    const resultat_obtenu = this.codeEditor.result.substring(0, this.codeEditor.result.indexOf('Temps d\'exécution'))
    if(!resultat_obtenu)
    {
      alert('Veuillez exécuter votre code au moins une fois avant de le soumettre');
      this.loading = false;
      return null;
    }
    const temps_execution = this.codeEditor.result.substring(this.codeEditor.result.indexOf(' : ') + 3, this.codeEditor.result.indexOf(' seconde'))
    const challengeResult = new ChallengeResult(
      '',
      this.challenge.challenge_id,
      resultat_obtenu,
      parseFloat(temps_execution),
      sessionStorage.getItem('userId') || '',
      '',
      new Date().toString(),
      this.codeEditor.selectedProgrammingLanguage.languageName,
      sessionStorage.getItem("username") || ''
    )
    if(this.challengeResultExists)
    {
      challengeResult.uid = this.challengeResult.uid;
      challengeResult.created_at = this.challengeResult.created_at;
    }
    return challengeResult;
  }
}
