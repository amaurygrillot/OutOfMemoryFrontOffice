import {AfterContentInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {CodeEditorComponent} from '@ngstack/code-editor';
import {Post} from "@app/shared/models";

export type ProgrammingLanguageAssociation = {
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
  @Input() postCreation !: boolean;
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
        baseValue: 'print("Hello world !")\r\n'
      },
      {
        languageName: 'java',
        displayLanguageName: 'Java',
        mainFile: 'Main.java',
        fileExtension: '.java',
        baseValue: "public class Main {\n\n\tpublic static void main(String[] args) {\n\n\t\tSystem.out.println(\"Hello world!\");\n\t}\n\n}\r\n"
      },
      {
        languageName: 'c',
        displayLanguageName: 'C',
        mainFile: 'main.c',
        fileExtension: '.c',
        baseValue: "#include <stdlib.h>\r\n#include <stdio.h>\r\n\r\nint main(int argc, char** argv) {\r\n  printf(\"Hello World\\n\");\r\n  return 0;\r\n}\r\n"
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
  selectedProgrammingLanguage = this.programmingLanguageAssociations[0];
  changingLanguage = false;
  isEditorReady = false;
  title: any;
  contentReady = false;
  readonly = false;
  foundSavedFile = false;

  constructor(private http: HttpClient) {
  }


  ngOnInit() {
  }
  ngOnChanges(): void {
    if(this.postCreation === undefined || !this.postCreation)
    {
        if(sessionStorage.getItem('userId') !== this.post.person_uid)
        {
          this.readonly = true;
        }
        this.loadAllLanguagesBaseValue(30 * 1000);
    }
    else
    {
      this.codeModel.language = this.programmingLanguageAssociations[0].languageName;
      this.codeModel.uri = this.programmingLanguageAssociations[0].mainFile;
      this.codeModel.value = this.programmingLanguageAssociations[0].baseValue;
      this.code = this.programmingLanguageAssociations[0].baseValue;
      this.contentReady = true;
      this.isEditorReady = true;
    }

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

  changeLanguage(programmingLanguage: ProgrammingLanguageAssociation) {
    this.loading = true;
    this.changingLanguage = !this.changingLanguage;
    this.selectedProgrammingLanguage = programmingLanguage;
    this.codeModel.language = programmingLanguage.languageName;
    if(this.postCreation)
    {
      this.codeModel.uri = programmingLanguage.mainFile;
    }
    else
    {
      this.codeModel.uri = this.post.post_uid + programmingLanguage.mainFile;
    }

    this.codeModel.value = programmingLanguage.baseValue;
    this.code = programmingLanguage.baseValue;
    this.onCodeChanged(this.code);
    this.loading = false;

  }

  async setLanguageBaseValue(programmingLanguage: ProgrammingLanguageAssociation): Promise<Observable<HttpResponse<string>>>
  {
    //filePath : post_uid/user_uid
    const filePath = `${this.post.post_uid}/${this.post.person_uid}`
    return this.http.get<string>(`https://outofmemoryerror-code-executer-container.azurewebsites.net/${programmingLanguage.languageName}/${filePath}`, {observe: 'response'});

  }

  async getAllLanguagesBaseValue(timeout: number): Promise<boolean>
  {
      return new Promise(async (accept, reject) =>
      {
        let code = 200;
        setTimeout(() => {
            reject({
              message : "Il y a eu un problème lors du chargement des fichiers",
              statusCode : code
            });
          },
          (timeout)
        );
        this.loadingBaseValues = true;
        for (const programmingLanguage of this.programmingLanguageAssociations) {
          const value = await this.setLanguageBaseValue(programmingLanguage);
          value.subscribe(result =>
          {
            if (result.status === 200 && !this.foundSavedFile) {
              this.codeModel.value = result.body || ' ';
              this.code = this.codeModel.value;
              this.codeModel.uri = this.post.post_uid + programmingLanguage.mainFile;
              this.selected = programmingLanguage.languageName;
              this.codeModel.language = this.selected;
              this.foundSavedFile = true;
              accept(this.foundSavedFile);
            }
            else if(result.status === 500)
            {
                code = result.status;
            }
            programmingLanguage.baseValue = result.body || '';
          })

        }
    });
  }

  loadAllLanguagesBaseValue(timeout: number)
  {
    this.getAllLanguagesBaseValue(timeout)
      .then((value: boolean) =>
      {
        console.log("value : " + value)
        if(value)
        {
          this.contentReady = true;
          this.isEditorReady = true;
          this.loadingBaseValues = false;
          this.hasLoaded = false;
          this.loading = false;
        }

      })
      .catch((reason: any) =>
      {
        if(reason.code === 500)
        {
          this.loadingBaseValues = false;
          this.title = reason.message;
          this.result = "Veuillez attendre quelques minutes et réessayer";
          this.hasLoaded = true;
          this.loading = false;
          this.resultColor = 'red';
          this.contentReady = true;
        }

      });
  }




}
