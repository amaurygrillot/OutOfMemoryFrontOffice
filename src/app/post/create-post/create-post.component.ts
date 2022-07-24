import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatTabGroup} from "@angular/material/tabs";
import {PostService} from "@app/services/post.service";
import {AppComponent} from "@app/app.component";
import {PostComponent} from "@app/post/post.component";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  files: File[] = [];
  isLoading = false;
  uploadedFile: File | undefined

  @ViewChild("contentTabGroup") contentTabGroup!: MatTabGroup

  constructor(private postService: PostService, private appComponent: AppComponent) {
  }

  ngOnInit(): void {
  }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  submitPost() {
    this.isLoading = true;
    this.uploadedFile = this.createEmptyFile();
    if (this.contentTabGroup.selectedIndex == 1) {
      this.uploadedFile = this.createCodeFile();
    } else if (this.contentTabGroup.selectedIndex == 2) {
      if (this.files.length > 0) {
        this.uploadedFile = this.files[0];
      }
    }
    if (this.postIsValid()) {
      const title = this.titleFormControl.value;
      const description = this.descriptionFormControl.value;
      this.createPost(this.uploadedFile, title, description);
    }
  }

  createEmptyFile() {
    return new File(["foo"], "empty.txt", {
      type: "image/text"
    });
  }

  createCodeFile() {
    return new File(["code"], "code.txt", {
      type: "image/text"
    });
  }

  createPost(file: File, title: string, description: string) {
    this.postService.createNewPost(file, title, description).subscribe(result => {
      console.log(result);
      this.appComponent.tabGroup.selectedIndex = 0;
      this.isLoading = false;
    }, error => {
      console.log(error)
    });
  }

  postIsValid() {
    return (
      this.titleFormControl.value.trim() != "" && this.descriptionFormControl.value.trim() != ""
      && ((this.contentTabGroup.selectedIndex == 0 || this.contentTabGroup.selectedIndex == 1) || this.contentTabGroup.selectedIndex == 2 && this.files.length > 0)
    );
  }

}
