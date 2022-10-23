import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SharedComponent} from "../shared/shared.component";
import {Observable} from "rxjs";
import {Comment, Post} from "../shared/models";
import {CodeModel} from "@ngstack/code-editor";
import {Challenge} from "../shared/models/challenge";
import {ChallengeResult} from "@app/shared/models/challengeresult.model";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private _URL = "https://outofmemoryerror-back.azurewebsites.net"
  private _API_URL = `${this._URL}/api`
  private _token = sessionStorage.getItem('token')

  header = new HttpHeaders()
    .set('Authorization', `${this._token}`)
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private sharedComponent: SharedComponent) { }

  getAllChallenges() {
    return new Observable<Challenge[]>((observer) => {
      this.http.get(`${this._API_URL}/challenge/getchallenge`, { headers : this.header}).subscribe((results: any) => {
        const challenges = [];
        for (const result of results.challengesdb) {
          const challenge = new Challenge(
            result.challenge_id,
            result.title,
            result.description,
            new Date().toString()
            //this.sharedComponent.formatDate(result.created_at)
          );
          challenges.push(challenge);
        }
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
      this.http.get(`${this._API_URL}/challenge/getChallengeResultByIdChallenge/${challengeId}`, { headers : this.header}).subscribe((results: any) => {
        const challengeResults = [];
        for (const challengeResult of results.ChallengeResults) {
          const challenge = new ChallengeResult(
            challengeResult.uid,
            challengeResult.challenge_id,
            challengeResult.resultat_obtenu,
            challengeResult.temps_execution,
            challengeResult.user_id,
            this.sharedComponent.formatDate(challengeResult.created_at),
            this.sharedComponent.formatDate(challengeResult.updated_at),
            challengeResult.used_language
          );
          challengeResults.push(challenge);
        }
        observer.next(challengeResults);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }

  getChallengeById(id: string) {
    return new Observable<Challenge>((observer) => {
      this.http.get(`${this._API_URL}/challenge/getChallengeByIdChallenge/${id}`,  { headers : this.header}).subscribe((result: any) => {
          const challenge = new Challenge(
            result.challenge_uid,
            result.title,
            result.description,
            //this.sharedComponent.formatDate(result.created_at),
            new Date().toString()
            );
          observer.next(challenge)
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    });
  }




}
