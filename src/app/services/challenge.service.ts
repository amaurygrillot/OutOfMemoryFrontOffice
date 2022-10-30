import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SharedComponent} from "../shared/shared.component";
import {lastValueFrom, Observable} from "rxjs";
import {environment} from "@environments/environment";
import {Challenge} from "../shared/models/challenge";
import {ChallengeResult} from "@app/shared/models/challengeresult.model";
import {AppComponent} from "@app/app.component";
import {ProgrammingLanguageAssociation} from "@app/code-editor/full-code-editor.component";



@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private _token = sessionStorage.getItem('token')

  header = new HttpHeaders()
    .set('Authorization', `${this._token}`)
    .set('Content-Type', 'application/json');
  isPosted = false;

  constructor(private http: HttpClient, private sharedComponent: SharedComponent) {

  }

  getAllChallenges() {
    return new Observable<Challenge[]>((observer) => {
      this.http.get(`${environment.API_URL}/challenge/getchallenge`, { headers : this.header}).subscribe((results: any) => {
        const challenges = results.challengesdb as Challenge[];
        challenges.forEach(element =>
        {
          element.created_at = AppComponent.sharedComponent.formatDateEuropean(element.created_at) || '';
          element.updated_at = AppComponent.sharedComponent.formatDateEuropean(element.updated_at) || '';
        })
        observer.next(challenges);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

  getAllChallengeResults(challengeId: string) {
    return new Observable<ChallengeResult[]>((observer) => {
      this.http.get(`${environment.API_URL}/challenge/getChallengeResultByIdChallenge/${challengeId}`, { headers : this.header}).subscribe((results: any) => {
        const challengeResults = results.ChallengeResults as ChallengeResult[];
        observer.next(challengeResults);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }
/*
  getChallengeById(id: string) {
    return new Observable<Challenge>((observer) => {
      this.http.get<Challenge>(`${environment.API_URL}/challenge/getChallengeByIdChallenge/${id}`,  { headers : this.header}).subscribe((result) => {
          const challenge = result
          observer.next(challenge)
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }
*/
  postChallengeResult(challengeResult: ChallengeResult, challengeResultExists: boolean): Promise<any>
  {
    const body: any = {
      challenge_id : challengeResult.challenge_id,
      resultat_obtenu : challengeResult.resultat_obtenu,
      temps_execution : challengeResult.temps_execution,
      used_language : challengeResult.used_language
    }

      let url = '';
      if(challengeResultExists)
        {
          body.uid = challengeResult.uid;
          body.updated_at = this.sharedComponent.formatDateDB(new Date().toString())
          url = `${environment.API_URL}/challenge/updateChallengeResultById`;
        }
        else
        {
          url = `${environment.API_URL}/challenge/createNewChallengeResult`
        }
      const headers1 = new HttpHeaders()
        .set('Authorization', `${sessionStorage.getItem('token')}`)
      return lastValueFrom(this.http.post<any>(url,
        body, {headers: headers1}));
  }

  checkChallengeResultExists(challengeId: string) {
    const url = `${environment.API_URL}/challenge/getChallengeResultByChallengeAndUserId/${challengeId}/${sessionStorage.getItem('userId')}`
    const headers1 = new HttpHeaders()
      .set('Authorization', `${sessionStorage.getItem('token')}`)
    return lastValueFrom(this.http.get<any>(url,
      { headers: headers1}));
  }

  checkResults(file: Blob, selectedLanguage: ProgrammingLanguageAssociation, challenge_uid: string, challengeResultId: string )
  {
    const formData: FormData = new FormData();
    formData.append('fileKey', file, selectedLanguage.mainFile);
    formData.append('challenge_uid', challenge_uid);
    formData.append('challengeResultId', challengeResultId);
    const headers1 = new HttpHeaders()
      .set('Authorization', `${sessionStorage.getItem('token')}`)
    return this.http.post<any>(`${environment.CODE_EXECUTOR_URL}/${selectedLanguage.languageName}/challenge/checkResults`,
      formData,
      { headers: headers1});
  }



}
