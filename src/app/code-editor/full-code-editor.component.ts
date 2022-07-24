import {Component, OnInit, ViewChild } from '@angular/core';
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

export class FullCodeEditorComponent implements OnInit{
  @ViewChild('codeEditor') codeEditor !: CodeEditorComponent;
  @ViewChild('secondCodeEditor') secondCodeEditor !: CodeEditorComponent;
  selected = '';
  loading = false;
  hasLoaded = false;
  result = "";
  resultColor = '';
  code = "";
  theme = 'vs-dark';
  programmingLanguageAssociations: ProgrammingLanguageAssociation[] =

    [
      {
        languageName: 'python',
        displayLanguageName: 'Python',
        mainFile: 'main.py',
        fileExtension: '.py',
        baseValue: ''
      },
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
      }/*,
      {
        languageName: 'typescript',
        displayLanguageName: 'Typescript',
        mainFile: 'main.ts',
        fileExtension: '.ts',
        baseValue: ''
      }*/
    ];
  codeModel: CodeModel = {
    language: this.selected,
    uri: '',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: false,
    },
  };
  changingLanguage = false;
  isEditorReady = false;

  constructor(private http: HttpClient) {
  }


  async ngOnInit() {
    let foundSavedFile = false;
      for (const programmingLanguage of this.programmingLanguageAssociations)
      {
          const value = await this.setLanguageBaseValue(programmingLanguage);
          if(value !== programmingLanguage.baseValue && !foundSavedFile)
          {
              this.codeModel.value = value || this.codeModel.value;
              this.code = this.codeModel.value;
              this.codeModel.uri = programmingLanguage.mainFile;
              this.selected = programmingLanguage.languageName;
              this.codeModel.language = this.selected;
              foundSavedFile = true;
          }
          programmingLanguage.baseValue = value || '';

      }


    this.isEditorReady = true;

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

  changeLanguage(languageName: string) {
    this.loading = true;
    this.changingLanguage = !this.changingLanguage;
    const programmingLanguage = this.programmingLanguageAssociations.find((item) => {
      return item.languageName === languageName
    });
    this.codeModel.language = programmingLanguage?.languageName || 'python';
    this.codeModel.uri = programmingLanguage?.mainFile || 'main.py';
    this.codeModel.value = programmingLanguage?.baseValue || '';
    this.code = programmingLanguage?.baseValue || '';
    this.onCodeChanged(this.code);
    this.loading = false;

  }

  async setLanguageBaseValue(programmingLanguage: ProgrammingLanguageAssociation): Promise<string | undefined>
  {
    //filePath : post_uid/user_uid
    const filePath = `e16bc063-5a08-4a87-9c88-866fe1c2bb55/41aaef93-5341-43e3-b3ca-955374f2d0f8`
    return this.http.get<string>(`https://outofmemoryerror-code-executer-container.azurewebsites.net/${programmingLanguage.languageName}/${filePath}`).toPromise();

  }



}
