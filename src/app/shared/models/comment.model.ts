export class Comment {
  uid: string;
  comment: string;
  is_like: number;
  created_at: string;
  person_uid: string;
  post_uid: string;
  username: string;
  avatar: string;

  constructor(uid: string, comment: string, is_like: number, created_at: string, person_uid: string, post_uid: string, username: string, avatar: string) {
    this.uid = uid;
    this.comment = comment;
    this.is_like = is_like;
    this.created_at = created_at;
    this.person_uid = person_uid;
    this.post_uid = post_uid;
    this.username = username;
    this.avatar = avatar;
  }
}
