import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from "@angular/material/select";
import {FormControl} from "@angular/forms";
import {Challenge} from "@app/shared/models/challenge";
import {Observable, of} from "rxjs";
import {PostService} from "@app/services/post.service";
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
  displayedColumns: string[] = ['uid', 'challenge_id', 'resultat_obtenu', 'temps_execution', 'user_id', 'created_at', 'updated_at', 'language_used'];


  constructor(private challengeService: ChallengeService, private datePipe: DatePipe) { }

  ngOnInit(): void {
      this.challengeService.getAllChallengeResults(this.challengeId).subscribe(allChallengeResults => {
        this.dataSource = allChallengeResults as ChallengeResult[]
      })
  }




}
