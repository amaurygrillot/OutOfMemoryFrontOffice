export class User {
  uid: string;
  fullname: string;
  phone: string;
  image: string;
  cover: string;
  birthday_date: string;
  created_at: string;
  username: string;
  description: string;
  is_private: number;
  is_online: number;
  email: string;

  constructor(uid: string, fullname: string, phone: string, image: string, cover: string, birthday_date: string, created_at: string, username: string, description: string, is_private: number, is_online: number, email: string) {
    this.uid = uid;
    this.fullname = fullname;
    this.phone = phone;
    this.image = image;
    this.cover = cover;
    this.birthday_date = birthday_date;
    this.created_at = created_at;
    this.username = username;
    this.description = description;
    this.is_private = is_private;
    this.is_online = is_online;
    this.email = email;
  }

}
