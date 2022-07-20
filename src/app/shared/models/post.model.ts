export class Post {
  post_uid: string;
  is_comment: bigint;
  type_privacy: string;
  created_at: string;
  person_uid: string;
  username: string;
  avatar: string;
  images: string;
  count_comment: bigint;
  count_likes: bigint;
  is_like: bigint

  constructor(post_uid: string, is_comment: bigint, type_privacy: string, created_at: string, person_uid: string, username: string, avatar: string, images: string, count_comment: bigint, count_likes: bigint, is_like: bigint) {
    this.post_uid = post_uid;
    this.is_comment = is_comment;
    this.type_privacy = type_privacy;
    this.created_at = created_at;
    this.person_uid = person_uid;
    this.username = username;
    this.avatar = avatar;
    this.images = images;
    this.count_comment = count_comment;
    this.count_likes = count_likes;
    this.is_like = is_like;
  }
}
