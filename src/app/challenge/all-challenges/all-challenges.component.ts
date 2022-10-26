import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from "@angular/material/select";
import {FormControl} from "@angular/forms";
import {Challenge} from "@app/shared/models/challenge";
import {Observable, of} from "rxjs";
import {ChallengeService} from "@app/services/challenge.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-all-challenges',
  templateUrl: './all-challenges.component.html',
  styleUrls: ['./all-challenges.component.css']
})
export class AllChallengesComponent implements OnInit {

  @Input() allChallenges!: boolean;
  @ViewChild('selectSort') selectSort!: MatSelect;
  challengesControl = new FormControl();
  sortControl = new FormControl();
  ageControl = new FormControl();
  URL = "https://outofmemoryerror-back.azurewebsites.net"
  challenges!: Challenge[];
  filteredChallenges!: Observable<Challenge[]>;
  lastFilter = '';
  lastSort = 'Date';
  lastAge = 'All';
  isLoading = true;
  isLogged = sessionStorage.getItem('token') !== null;
  oneDayMillisecond = 1000 * 60 * 60 * 24;
  panelOpenState!: boolean;

  constructor(private challengeService: ChallengeService, private datePipe: DatePipe) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    //if (this.allChallenges) {
    this.challengeService.getAllChallenges().subscribe(async challenges => {
      this.challenges = challenges;
      this.isLoading = false;
      this.filter('', this.challenges)
    });
    /*} else {
      this.challengeService.getPostsByUserId(sessionStorage.getItem('userId') || '').subscribe(async challenges => {
        this.challenges = challenges;
        this.isLoading = false;
        this.filter('', this.challenges)
      });
    }*/
    this.challengesControl.valueChanges.subscribe((filter =>
    {
      this.filter(filter, this.challenges);
    }));

  }


  async setAllChallenges(): Promise<Challenge[] | null>
  {
    this.challengeService.getAllChallenges().subscribe(async (challenges) => {
      this.challenges = challenges;
      this.isLoading = false;
    });
    return null;
  }


  filter(filter: string, startArray: Challenge[]): Challenge[] {
    let newChallenges = startArray.filter(option =>
    {
      return option.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        || option.description.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    });
    if(startArray === this.challenges)
    {
      newChallenges = this.sortChallenges(this.lastSort, newChallenges);
      newChallenges = this.selectAge(this.lastAge, newChallenges);
      this.filteredChallenges = of(newChallenges);
      this.lastFilter = filter;
    }
    return newChallenges
  }

  sortChallenges(sortType: string, startArray: Challenge[]): Challenge[] {
    let newChallenges = startArray;
    if(sortType === 'Date')
    {
      newChallenges = startArray.sort(((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    }
    if(startArray === this.challenges)
    {
      newChallenges = this.filter(this.lastFilter, newChallenges);
      newChallenges = this.selectAge(this.lastAge, newChallenges);
      this.filteredChallenges = of(newChallenges);
      this.lastSort = sortType
    }
    return newChallenges;
  }

  selectAge(ageSelected: string, startArray: Challenge[]): Challenge[] {
    let newChallenges = startArray;
    if(ageSelected === 'Today')
    {
      newChallenges = startArray.filter(option =>
        (new Date().getTime() - new Date(option.created_at).getTime()) < this.oneDayMillisecond
      )
    }
    else if(ageSelected === 'Week')
    {
      newChallenges = startArray.filter(option =>
        (new Date().getTime() - new Date(option.created_at).getTime()) < this.oneDayMillisecond * 7
      )

    }
    if(startArray === this.challenges)
    {
      newChallenges = this.filter(this.lastFilter, newChallenges);
      newChallenges = this.sortChallenges(this.lastSort, newChallenges);
      this.filteredChallenges = of(newChallenges);
      this.lastAge = ageSelected;
    }
    return newChallenges;
  }


}
