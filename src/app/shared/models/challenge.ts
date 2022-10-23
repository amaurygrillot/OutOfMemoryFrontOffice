export class Challenge {
  uid: string;
  title: string;
  description: string;
  created_at: string;


  constructor(uid: string, title: string, description:string, created_at: string) {
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.created_at = created_at;
  }
}
