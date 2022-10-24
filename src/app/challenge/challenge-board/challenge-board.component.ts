import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ChallengeService} from "@app/services/challenge.service";
import {ChallengeResult} from "@app/shared/models/challengeresult.model";

@Component({
  selector: 'app-challenge-board',
  templateUrl: './challenge-board.component.html',
  styleUrls: ['./challenge-board.component.css']
})
export class ChallengeBoardComponent implements OnInit {
  @Input() challengeId!: string;
  dataSource: ChallengeResult[] = [];
  displayedColumns: string[] = ['username','resultat_obtenu', 'temps_execution', 'created_at', 'updated_at', 'language_used'];


  constructor(private challengeService: ChallengeService, private datePipe: DatePipe) { }

  ngOnInit(): void {
      this.challengeService.getAllChallengeResults(this.challengeId).subscribe(allChallengeResults => {
        this.dataSource = allChallengeResults as ChallengeResult[]
        console.log(allChallengeResults)
      })
  }




}
