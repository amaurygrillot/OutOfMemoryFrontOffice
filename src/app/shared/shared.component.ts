import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
  constructor(private _datePipe: DatePipe, private _http: HttpClient) {
  }

  ngOnInit(): void {
  }

  formatDate(date: string) {
    return this._datePipe.transform(date, 'yyyy/MM/dd HH:mm') || "";
  }

  formatDateDB(date: string) {
    return this._datePipe.transform(date, 'yyyy/MM/dd HH:mm:ss') || "";
  }

  formatDateEuropean(date: string) {
    return this._datePipe.transform(date, 'dd/MM/yyyy HH:mm','+00') || "";
  }

  readFileFromAPI(url: string, fileName: string) {
    return this._http.get(`${url}/${fileName}`);
  }



}
