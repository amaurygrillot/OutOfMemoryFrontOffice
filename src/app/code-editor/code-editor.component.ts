import { Component, OnInit } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";


@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  loading = false;
  hasLoaded = false;
  result = "";
  resultColor = '';
  code = "";
  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'python',
    uri: 'main.py',
    value: '',
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: false,
    },
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onCodeChanged(value: any) {
    this.code = value;
  }

  async sendData() {
    this.loading = true;
    let file = new Blob([this.code], {type: '.py'});
    const formData: FormData = new FormData();
    formData.append('fileKey', file, `test3.py`);
    const data = await lastValueFrom(this.http.post<string>(`https://oome-code-executer.herokuapp.com/pythonExecuter/`, formData));
    console.log(data);
    if(data.search('Process ended with error code : 0') === -1)
    {
       this.resultColor = 'red';
    }
    else
    {
      this.resultColor = 'green';
    }
    this.result = data.substring(0,data.lastIndexOf('\n'));
    this.hasLoaded = true;
    this.loading = false;
  }

}
