import {AfterContentInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {CodeEditorComponent} from '@ngstack/code-editor';
import {Post} from "@app/shared/models";
import {ChallengeResult} from "@app/shared/models/challengeresult.model";
import {environment} from "@environments/environment";

export type ProgrammingLanguageAssociation = {
  languageName: string;
  displayLanguageName: string;
  mainFile: string;
  fileExtension: string;
  baseValue: string;
}

@Component({
  selector: 'full-code-editor',
  templateUrl: './full-code-editor.component.html',
  styleUrls: ['./full-code-editor.component.css']
})

export class FullCodeEditorComponent implements OnInit, OnChanges{

  get challengeResult(): ChallengeResult {
    return this._challengeResult;
  }
  set challengeResult(value: ChallengeResult) {
    this._challengeResult = value;
  }
  @Input() post !: Post;
  @Input() postCreation!: boolean;
  @Input() challengeId !: string;
  @Input() executeNoSave !: boolean;
  @Input() challengeParticipation !: boolean;
  @ViewChild('codeEditor') codeEditor !: CodeEditorComponent;
  @ViewChild('secondCodeEditor') secondCodeEditor !: CodeEditorComponent;
  private _challengeResult!: ChallengeResult;
  loading = false;
  loadingBaseValues = false;
  hasLoaded = false;
  result = "";
  resultColor = '';
  code = "";
  theme = 'vs-dark';
  programmingLanguageAssociations: ProgrammingLanguageAssociation[] =

    [
      {
        languageName: 'python',
        displayLanguageName: 'Python',
        mainFile: 'main.py',
        fileExtension: '.py',
        baseValue: 'print("Hello world !")\r\n'
      },
      {
        languageName: 'java',
        displayLanguageName: 'Java',
        mainFile: 'Main.java',
        fileExtension: '.java',
        baseValue: "public class Main {\n\n\tpublic static void main(String[] args) {\n\n\t\tSystem.out.println(\"Hello world!\");\n\t}\n\n}\r\n"
      },
      {
        languageName: 'c',
        displayLanguageName: 'C',
        mainFile: 'main.c',
        fileExtension: '.c',
        baseValue: "#include <stdlib.h>\r\n#include <stdio.h>\r\n\r\nint main(int argc, char** argv) {\r\n  printf(\"Hello World\\n\");\r\n  return 0;\r\n}\r\n"
      }/*,
      {
        languageName: 'typescript',
        displayLanguageName: 'Typescript',
        mainFile: 'main.ts',
        fileExtension: '.ts',
        baseValue: ''
      }*/
    ];
  selected = this.programmingLanguageAssociations[0].languageName;

  codeModel: CodeModel = {
    language: this.selected,
    uri: '',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: false,
    },
  };
  selectedProgrammingLanguage = this.programmingLanguageAssociations[0];
  changingLanguage = false;
  isEditorReady = false;
  title: any;
  contentReady = false;
  readonly = false;
  foundSavedFile = false;

  constructor(private http: HttpClient) {
  }


  ngOnInit() {
  }
  ngOnChanges(): void {
    if(this.postCreation)
    {
      this.loadAllLanguagesBaseValue(2 * 1000);
      return;
    }
    else
    {
      this.loadAllLanguagesBaseValue(10 * 1000);
    }
    if(this.post && sessionStorage.getItem('userId') !== this.post.person_uid)
    {
      this.readonly = true;
    }

  }

  onCodeChanged(value: any) {
    this.code = value;
    if(this.hasLoaded)
      this.hasLoaded = false;
  }

  async sendData() {
    this.loading = true;
    let url = `${environment.CODE_EXECUTOR_URL}/${this.selectedProgrammingLanguage.languageName}`
    const formData: FormData = new FormData();
    if(this.challengeParticipation && !this.executeNoSave)
    {
      if(sessionStorage.getItem('userId'))
      {
        if(this._challengeResult)
        {
          url += `/challenge`
          formData.append('challengeResultId', `${this._challengeResult.uid}`)
        }
        else
        {
          url += `/executeNoSave`
        }
      }
      else
      {
        alert("Veuillez vous connecter avant de participer au challenge.")
        this.loading = false;
        return;
      }
    }
    else if(this.executeNoSave || this.post.person_uid !== sessionStorage.getItem('userId'))
    {
      url += `/executeNoSave`
    }
    else
    {
      formData.append('commentId', `${this.post.post_uid}`)
    }
    let file = new Blob([this.code], {type: this.selectedProgrammingLanguage.fileExtension});

    formData.append('fileKey', file, this.selectedProgrammingLanguage.mainFile);
    this.executeWithSave(url, formData)
  }

  changeLanguage(programmingLanguage: ProgrammingLanguageAssociation) {
    this.loading = true;
    this.changingLanguage = !this.changingLanguage;
    this.selectedProgrammingLanguage = programmingLanguage;
    this.setEditorValues()
    this.onCodeChanged(this.code);
    this.loading = false;

  }

  async setLanguageBaseValue(programmingLanguage: ProgrammingLanguageAssociation): Promise<Observable<HttpResponse<string>>>
  {
    let filePath: string;
    if(this.challengeParticipation)
    {
      filePath = `challenge/${this.challengeId}/${sessionStorage.getItem('userId')}`
    }
    else if(this.post === null || this.post === undefined)
    {
      filePath = 'null/null'
    }
    else
    {
      filePath = `${this.post.post_uid}/${this.post.person_uid}`
    }
    return this.http.get<string>(`${environment.CODE_EXECUTOR_URL}/${programmingLanguage.languageName}/${filePath}`, {observe: 'response'});
  }

  async getAllLanguagesBaseValue(timeout: number): Promise<boolean>
  {
      return new Promise(async (accept, reject) =>
      {
        let code = 200;
        setTimeout(() => {
            reject({
              message : "Il y a eu un problème lors du chargement des fichiers",
              statusCode : code
            });
          },
          (timeout)
        );
        this.loadingBaseValues = true;
        for (const programmingLanguage of this.programmingLanguageAssociations) {
          const value = await this.setLanguageBaseValue(programmingLanguage);
          value.subscribe(result =>
          {

            if (result.status === 200 && !this.foundSavedFile) {
              programmingLanguage.baseValue = result.body || ' ';
              this.code = programmingLanguage.baseValue;
              this.selectedProgrammingLanguage = programmingLanguage;
              this.foundSavedFile = true;
              accept(this.foundSavedFile);
            }
            else if(result.status === 500)
            {
                code = result.status;
            }
          })
        }
    });
  }

  loadAllLanguagesBaseValue(timeout: number)
  {
    this.getAllLanguagesBaseValue(timeout)
      .then((value: boolean) =>
      {

      })
      .catch((reason: any) =>
      {
        if(reason.code === 500)
        {
          this.loadingBaseValues = false;
          this.title = reason.message;
          this.result = "Veuillez attendre quelques minutes et réessayer";
          this.hasLoaded = true;
          this.loading = false;
          this.resultColor = 'red';
          this.contentReady = true;
        }

      }).finally(() =>
    {
      this.setEditorValues();
      this.contentReady = true;
      this.isEditorReady = true;
      this.loadingBaseValues = false;
      this.hasLoaded = false;
      this.loading = false;
    });
  }

  private executeWithSave(url: string, formData: FormData) {
    const headers1 = new HttpHeaders()
      .set('Authorization', `${sessionStorage.getItem('token')}`)
    lastValueFrom(this.http.post<string>(url,
      formData,
      { headers: headers1}))
      .then((data) =>
      {
        this.resultColor = 'green';
        this.result = data.substring(0, data.lastIndexOf('\n'))
      })
      .catch((reason) => {
        this.resultColor = 'red';
        this.result = reason.message;

      })
      .finally(() =>
      {
        this.title = "Résultat d'exécution :";
        this.hasLoaded = true;
        this.loading = false;
      });
  }

  async saveCodeNoExecution(): Promise<string>
  {
    const programmingLanguage = await this.programmingLanguageAssociations.find((item) => {
      return item.languageName === this.selected
    });
    let url = `${environment.CODE_EXECUTOR_URL}/${programmingLanguage?.languageName}`
    const formData: FormData = new FormData();
    if(this.challengeParticipation)
    {
      url += `/challenge`;
      formData.append('challengeResultId', `${this._challengeResult.uid}`);
      formData.append('challengeId', `${this._challengeResult.challenge_id}`);
    }
    else
    {
      formData.append('commentId', `${this.post.post_uid}`)
    }
    url += `/saveFile`;
    let file = new Blob([this.code], {type: programmingLanguage?.fileExtension});
    formData.append('fileKey', file, programmingLanguage?.mainFile);
    const headers1 = new HttpHeaders()
      .set('Authorization', `${sessionStorage.getItem('token')}`)
    return lastValueFrom(this.http.post<string>(url,
      formData,
      {headers: headers1}));
  }

  public setEditorValues()
  {
    this.codeModel.language = this.selectedProgrammingLanguage.languageName;
    if(this.challengeParticipation)
    {
      this.codeModel.uri = this.challengeId + this.selectedProgrammingLanguage.mainFile;
    }
    else if(this.post !== undefined)
    {
      this.codeModel.uri = this.post.post_uid + this.selectedProgrammingLanguage.mainFile;
    }
    else
    {
      this.codeModel.uri = this.selectedProgrammingLanguage.mainFile;
    }
    this.codeModel.value = this.selectedProgrammingLanguage.baseValue;
    this.code = this.selectedProgrammingLanguage.baseValue;
    this.contentReady = true;
    this.isEditorReady = true;
  }
}
