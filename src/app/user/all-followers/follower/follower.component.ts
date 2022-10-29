import {Component, Input, OnInit} from '@angular/core';
import {Follow} from "@app/shared/models";
import {environment} from "@environments/environment";
import {UserService} from "@app/services/user.service";
import {AllFollowersComponent} from "@app/user/all-followers/all-followers.component";

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {

  @Input() follower!: Follow
  URL = environment.baseUrl;

  constructor(
    private _userService: UserService,
    private _allFollowersComponent: AllFollowersComponent
  ) { }

  ngOnInit(): void {
  }

  removeFollower() {
    this._userService.removeFollower(this.follower.uid_user).subscribe(_ => {
      this._allFollowersComponent.ngOnInit();
    })
  }
}
