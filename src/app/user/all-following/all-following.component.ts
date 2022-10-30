import {Component, OnInit} from '@angular/core';
import {UserService} from "@app/services/user.service";
import {Follow} from "@app/shared/models";

@Component({
  selector: 'app-all-following',
  templateUrl: './all-following.component.html',
  styleUrls: ['./all-following.component.css']
})
export class AllFollowingComponent implements OnInit {

  allFollowing!: Follow[]

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getAllFollowing().subscribe(following => {
      this.allFollowing = following;
      this.allFollowing.sort((a, b) => a.username.localeCompare(b.username))
    });
  }

}
