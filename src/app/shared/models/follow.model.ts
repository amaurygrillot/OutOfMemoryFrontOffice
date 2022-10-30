export class Follow {
  id_follow: string;
  uid_user: string;
  follow_at: string;
  username: string;
  fullname: string;
  avatar: string;

  constructor(idFollower: string, uid_user: string, date_followers: string, username: string, fullname: string, avatar: string) {
    this.id_follow = idFollower;
    this.uid_user = uid_user;
    this.follow_at = date_followers;
    this.username = username;
    this.fullname = fullname;
    this.avatar = avatar;
  }
}
