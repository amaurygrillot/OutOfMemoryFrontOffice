export class Notification {
  uid_notification: string
  type_notification: string
  created_at: string
  user_uid: string
  username: string
  followers_uid: string
  follower: string
  avatar: string
  post_uid: string

  constructor(uid_notification: string, type_notification: string, created_at: string, user_uid: string, username: string, followers_uid: string, follower: string, avatar: string, post_uid: string) {
    this.uid_notification = uid_notification;
    this.type_notification = type_notification;
    this.created_at = created_at;
    this.user_uid = user_uid;
    this.username = username;
    this.followers_uid = followers_uid;
    this.follower = follower;
    this.avatar = avatar;
    this.post_uid = post_uid;
  }
}
