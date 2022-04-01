import { Component, OnInit } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  loading = false;
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

  sendData() {
    this.loading = true;
    let file = new Blob([this.code], {type: '.py'});
    const formData: FormData = new FormData();
    formData.append('fileKey', file, `test3.py`);
    this.http.post(`https://oome-code-executer.herokuapp.com/pythonExecuter/`, formData)
      .subscribe((data: any) => {
        console.log(data);
        this.loading = false;
      });
  }

}
