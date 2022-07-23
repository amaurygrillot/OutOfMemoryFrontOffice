import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  formatDate(date: string) {
    return this.datePipe.transform(date, 'yyyy/MM/dd hh:mm') || "";
  }

}
