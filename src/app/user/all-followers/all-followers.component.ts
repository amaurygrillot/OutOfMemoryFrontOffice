import { Component, OnInit } from '@angular/core';
import {Follow} from "@app/shared/models";
import {UserService} from "@app/services/user.service";

@Component({
  selector: 'app-all-followers',
  templateUrl: './all-followers.component.html',
  styleUrls: ['./all-followers.component.css']
})
export class AllFollowersComponent implements OnInit {

  allFollowers!: Follow[]

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getAllFollowers().subscribe(followers => {
      this.allFollowers = followers;
      this.allFollowers.sort((a, b) => a.username.localeCompare(b.username))
    });
  }

}
