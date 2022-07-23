import {Component, OnInit, ViewChild} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {CodeEditorComponent} from '@ngstack/code-editor';

type ProgrammingLanguageAssociation = {
  languageName: string;
  displayLanguageName: string;
  mainFile: string;
  fileExtension: string;
  baseValue: string;
}

@Component({
  selector: 'full-code-editor',
  templateUrl: './full-code-editor.component.html',
  styleUrls: ['./full-code-editor.component.css']
})

export class FullCodeEditorComponent implements OnInit {
  @ViewChild('codeEditor') codeEditor !: CodeEditorComponent;
  @ViewChild('secondCodeEditor') secondCodeEditor !: CodeEditorComponent;
  selected = 'java';
  loading = false;
  hasLoaded = false;
  result = "";
  resultColor = '';
  code = "";
  theme = 'vs-dark';
  programmingLanguageAssociations: ProgrammingLanguageAssociation[] =

    [
      {languageName: 'python', displayLanguageName: 'Python', mainFile: 'main.py', fileExtension: '.py', baseValue: ''},
      {
        languageName: 'java',
        displayLanguageName: 'Java',
        mainFile: 'Main.java',
        fileExtension: '.java',
        baseValue: 'public class Main {\n\n\tpublic static void main(String[] args) {\n\n\t\tSystem.out.println("Hello world!");\n\t}\n\n}'
      },
      {
        languageName: 'c',
        displayLanguageName: 'C',
        mainFile: 'main.c',
        fileExtension: '.c',
        baseValue: '#include <stdlib.h>\n' +
          '#include <stdio.h>\n' +
          '\n' +
          'int main(int argc, char** argv) {\n' +
          '  printf("Hello World\\n");\n' +
          '  return 0;\n' +
          '}'
      },
      {
        languageName: 'typescript',
        displayLanguageName: 'Typescript',
        mainFile: 'main.ts',
        fileExtension: '.ts',
        baseValue: ''
      }
    ];
  codeModel: CodeModel = {
    language: this.selected,
    uri: this.programmingLanguageAssociations.find((item) => {
      return item.languageName === this.selected
    })?.mainFile || 'main.py',
    value: this.programmingLanguageAssociations.find((item) => {
      return item.languageName === 'java'
    })?.baseValue || ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: false,
    },
  };
  changingLanguage = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onCodeChanged(value: any) {
    this.code = value;
  }

  async sendData() {
    this.loading = true;
    const programmingLanguage = await this.programmingLanguageAssociations.find((item) => {
      return item.languageName === this.selected
    });
    let file = new Blob([this.code], {type: programmingLanguage?.fileExtension});
    const formData: FormData = new FormData();
    formData.append('fileKey', file, programmingLanguage?.mainFile);
    formData.append('commentId', 'e16bc063-5a08-4a87-9c88-866fe1c2bb55')
    console.log(programmingLanguage);
    const headers1 = new HttpHeaders()
      .set('Authorization', `${sessionStorage.getItem('token')}`)
    const data = await lastValueFrom(this.http.post<string>(`https://outofmemoryerror-code-executer-container.azurewebsites.net/${programmingLanguage?.languageName}/`,
      formData,
      { headers: headers1}));
    console.log(data);
    if (data.search('Process ended with error code : 0') === -1) {
      this.resultColor = 'red';
    } else {
      this.resultColor = 'green';
    }
    this.result = data.substring(0, data.lastIndexOf('\n'));
    this.hasLoaded = true;
    this.loading = false;
  }

  changeLanguage(languageName: string): void {
    this.changingLanguage = !this.changingLanguage;
    const programmingLanguage = this.programmingLanguageAssociations.find((item) => {
      return item.languageName === languageName
    });
    this.codeModel.value = programmingLanguage?.baseValue || '';
    this.codeModel.language = programmingLanguage?.languageName || 'python';
    this.codeModel.uri = programmingLanguage?.mainFile || 'main.py';
  }

}
