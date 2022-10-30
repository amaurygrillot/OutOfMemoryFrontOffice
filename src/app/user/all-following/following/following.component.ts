import {Component, Input, OnInit} from '@angular/core';
import {Follow} from "@app/shared/models";
import {environment} from "@environments/environment";
import {UserService} from "@app/services/user.service";
import {AllFollowingComponent} from "@app/user/all-following/all-following.component";

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  @Input() following!: Follow
  URL = environment.baseUrl;

  followButtonValue!: string
  mouseOverFollow = false

  constructor(
    private _userService: UserService,
    private _allFollowingComponent: AllFollowingComponent
  ) { }

  ngOnInit(): void {
    this.setFollowedButton()
  }

  unfollow() {
    this._userService.unfollowUser(this.following.uid_user).subscribe(res => {
      this._allFollowingComponent.ngOnInit();
    })
  }

  setFollowedButton() {
    this.followButtonValue = "FOLLOWED"
    this.mouseOverFollow = false
  }

  setUnfollowButton() {
    this.followButtonValue = "UNFOLLOW"
    this.mouseOverFollow = true
  }

}
