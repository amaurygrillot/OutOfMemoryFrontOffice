import {SharedComponent} from "@app/shared/shared.component";
import {AppComponent} from "@app/app.component";

export class Challenge {
  challenge_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;


  constructor(challenge_id: string, title: string, description:string, created_at: string, updated_at: string) {
    this.challenge_id = challenge_id;
    this.title = title;
    this.description = description;
    this.created_at = AppComponent.sharedComponent.formatDateEuropean(created_at);
    this.updated_at = AppComponent.sharedComponent.formatDateEuropean(updated_at);
  }
}
