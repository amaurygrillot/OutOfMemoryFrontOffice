import {AfterContentInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {CodeEditorComponent} from '@ngstack/code-editor';
import {Post} from "@app/shared/models";

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

export class FullCodeEditorComponent implements OnInit, OnChanges{
  @Input() post !: Post;
  @ViewChild('codeEditor') codeEditor !: CodeEditorComponent;
  @ViewChild('secondCodeEditor') secondCodeEditor !: CodeEditorComponent;
  selected = '';
  loading = false;
  loadingBaseValues = false;
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
  title: any;
  contentReady = false;
  readonly = false;

  constructor(private http: HttpClient) {
  }


  ngOnInit() {
    console.log("on init post : " + this.post)


  }
  ngOnChanges(): void {
    if(sessionStorage.getItem('userId') !== this.post.person_uid)
    {
      this.readonly = true;
    }
    this.loadAllLanguagesBaseValue(30 * 1000);
    this.contentReady = true;
  }



  onCodeChanged(value: any) {
    this.code = value;
    if(this.hasLoaded)
      this.hasLoaded = false;
  }

  async sendData() {
    this.loading = true;
    const programmingLanguage = await this.programmingLanguageAssociations.find((item) => {
      return item.languageName === this.selected
    });
    let file = new Blob([this.code], {type: programmingLanguage?.fileExtension});
    const formData: FormData = new FormData();
    formData.append('fileKey', file, programmingLanguage?.mainFile);
    formData.append('commentId', `${this.post.post_uid}`)
    console.log(programmingLanguage);
    const headers1 = new HttpHeaders()
      .set('Authorization', `${sessionStorage.getItem('token')}`)
    lastValueFrom(this.http.post<string>(`https://outofmemoryerror-code-executer-container.azurewebsites.net/${programmingLanguage?.languageName}/`,
      formData,
      { headers: headers1}))
      .then((data) =>
      {
          console.log(data);
          this.resultColor = 'green';
          this.result = data.substring(0, data.lastIndexOf('\n'))
      })
      .catch((reason) => {
          this.resultColor = 'red';
          this.result = reason.error;
      })
      .finally(() =>
      {
          this.title = "Résultat d'exécution :";
          this.hasLoaded = true;
          this.loading = false;
      });

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
    const filePath = `${this.post.post_uid}/${this.post.person_uid}`
    return this.http.get<string>(`https://outofmemoryerror-code-executer-container.azurewebsites.net/${programmingLanguage.languageName}/${filePath}`).toPromise();

  }

  async getAllLanguagesBaseValue(timeout: number): Promise<boolean>
  {
      return new Promise(async (accept, reject) => {
        setTimeout(() => {
            reject("Il y a eu un problème lors du chargement des fichiers");
          },
          (timeout)
        );
        this.loadingBaseValues = true;
        let foundSavedFile = false;
        for (const programmingLanguage of this.programmingLanguageAssociations) {
          const value = await this.setLanguageBaseValue(programmingLanguage);
          if (value !== programmingLanguage.baseValue && !foundSavedFile) {
            console.log("value :" + value);
            this.codeModel.value = value || ' ';
            this.code = this.codeModel.value;
            this.codeModel.uri = this.post.post_uid + programmingLanguage.mainFile;
            console.log(this.codeModel.uri);
            this.selected = programmingLanguage.languageName;
            this.codeModel.language = this.selected;
            foundSavedFile = true;
          }
          programmingLanguage.baseValue = value || '';
        }
        if(!foundSavedFile)
        {
          this.codeModel.value = this.programmingLanguageAssociations[1].baseValue;
          this.code = this.programmingLanguageAssociations[1].baseValue;
          this.codeModel.uri = this.post.post_uid + this.programmingLanguageAssociations[1].mainFile;
          console.log(this.codeModel.uri);
          this.selected = this.programmingLanguageAssociations[1].languageName;
          this.codeModel.language = this.selected;
          foundSavedFile = true;
        }
        accept(true);
    });
  }

  loadAllLanguagesBaseValue(timeout: number)
  {
    this.getAllLanguagesBaseValue(timeout)
      .then((value: any) =>
      {
        this.isEditorReady = true;
        this.loadingBaseValues = false;
        this.hasLoaded = false;
        this.loading = false;
      })
      .catch((reason: any) =>
      {
        this.loadingBaseValues = false;
        this.title = reason;
        this.result = "Veuillez attendre quelques minutes et réessayer";
        this.hasLoaded = true;
        this.loading = false;
        this.resultColor = 'red';
      });
  }






}
