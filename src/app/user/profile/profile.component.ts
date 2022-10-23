import {Component, Input, OnInit} from '@angular/core';
import {User} from "@app/shared/models";
import {environment} from "@environments/environment";
import {UserService} from "@app/services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() user!: User

  URL = environment.baseUrl
  isNotLoggedUser!: boolean

  count_posts!: number
  count_following!: number
  count_followers!: number

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.isNotLoggedUser = sessionStorage.getItem('userId') !== this.user.uid;
    this.count_posts = this.user.count_posts;
    this.count_following = this.user.count_following;
    this.count_followers = this.user.count_followers;
    console.log(`
      session_userId: ${sessionStorage.getItem('userId')},
      post_userId: ${this.user.uid},
      bool: ${this.isNotLoggedUser}
    `)
    console.log(`all_following: ${this._userService.getAllFollowing()}`);
  }

}
