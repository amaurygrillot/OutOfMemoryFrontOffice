import {Component, Input, OnInit} from '@angular/core';
import {AppComponent} from "@app/app.component";
import {MatDialog} from "@angular/material/dialog";
import {Challenge} from "@app/shared/models/challenge";
import {ChallengeService} from "@app/services/challenge.service";

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  @Input() challenge!: Challenge;

  URL = "https://outofmemoryerror-back.azurewebsites.net"

  hasLoaded = false;

  count_likes!: number;

  constructor(private _appComponent: AppComponent, private _postService: ChallengeService, private _dialog: MatDialog) {}


  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.hasLoaded = true;
    console.log(this.challenge)
  }

}
