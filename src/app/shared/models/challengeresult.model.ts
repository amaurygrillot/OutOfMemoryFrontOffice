export class ChallengeResult {
  uid: string;
  challenge_id: string;
  resultat_obtenu: string;
  temps_execution: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  language_used: string;

  constructor(uid: string, challenge_id: string, resultat_obtenu : string, temps_execution: string, user_id: string, created_at: string, updated_at: string, language_used: string) {
    this.uid = uid;
    this.challenge_id = challenge_id;
    this.resultat_obtenu = resultat_obtenu;
    this.temps_execution = temps_execution;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.language_used = language_used;
  }
}
