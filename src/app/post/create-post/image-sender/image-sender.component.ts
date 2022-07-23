import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-sender',
  templateUrl: './image-sender.component.html',
  styleUrls: ['./image-sender.component.css']
})
export class ImageSenderComponent implements OnInit {

  files: File[] = [];

  constructor() { }

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

}
