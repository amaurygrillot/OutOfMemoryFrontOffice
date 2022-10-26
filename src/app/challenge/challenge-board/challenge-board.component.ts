import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChallengeService} from "@app/services/challenge.service";
import {ChallengeResult} from "@app/shared/models/challengeresult.model";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-challenge-board',
  templateUrl: './challenge-board.component.html',
  styleUrls: ['./challenge-board.component.css']
})
export class ChallengeBoardComponent implements OnInit, AfterViewInit  {
  @Input() challengeId!: string;
  @ViewChild(MatSort) sort!: MatSort;
  allChallengeResults: ChallengeResult[] = [];
  dataSource = new MatTableDataSource<ChallengeResult>();
  displayedColumns: string[] = ['position', 'username','resultat_obtenu', 'temps_execution', 'created_at', 'updated_at', 'language_used'];


  constructor(private challengeService: ChallengeService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
      this.updateChallengeBoard()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  updateChallengeBoard()
  {
    this.challengeService.getAllChallengeResults(this.challengeId).subscribe(allChallengeResults => {
      this.allChallengeResults = allChallengeResults as ChallengeResult[]
      this.dataSource.data = this.allChallengeResults;
    })
  }

  addChallengeResultToBoard(challengeResult: ChallengeResult)
  {
    let crIndex = this.allChallengeResults.findIndex((element) =>
    {
      return element.uid === challengeResult.uid;
    });
    if(crIndex !== -1)
    {
      console.log(challengeResult)
      this.allChallengeResults[crIndex] = challengeResult;
    }
    else
    {
      this.allChallengeResults.push(challengeResult)
    }
    console.log(this.allChallengeResults)
    this.dataSource.data = this.allChallengeResults;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log("here")
    console.log(sortState);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }




}
