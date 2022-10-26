export class ChallengeResult {
  uid: string;
  challenge_id: string;
  resultat_obtenu: string;
  temps_execution: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  used_language: string;
  username ?: string;
  position ?: number;

  constructor(uid: string, challenge_id: string, resultat_obtenu : string, temps_execution: number, user_id: string, created_at: string, updated_at: string, used_language: string, username ?: string, position ?: number) {
    this.uid = uid;
    this.challenge_id = challenge_id;
    this.resultat_obtenu = resultat_obtenu;
    this.temps_execution = temps_execution;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.used_language = used_language;
    this.username = username;
    this.position = position;
  }
}
