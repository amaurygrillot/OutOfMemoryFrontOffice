import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Post} from "@app/shared/models";
import {PostService} from "@app/services/post.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnChanges {
  @Input() allPosts!: boolean
  postControl = new FormControl();
  URL = "https://outofmemoryerror-back.azurewebsites.net"
  posts!: Post[];
  filteredPosts!: Observable<Post[]>;
  lastFilter = '';
  isLoading = true;
  isLogged = sessionStorage.getItem('token') !== null;
  constructor(private postService: PostService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.allPosts) {
      this.postService.getAllPosts().subscribe(async posts => {
        this.filteredPosts = this.postControl.valueChanges.pipe(
          startWith<string | Post[]>(this.posts),
          map(value => typeof value === 'string' ? value : this.lastFilter),
          map(filter => this.filter(filter))
        );
        console.log(posts)
        this.posts = posts;
        this.isLoading = false;
      });
    } else {
      this.postService.getPostsByUserId(sessionStorage.getItem('userId') || '').subscribe(async posts => {
        console.log(posts)
        this.posts = posts;
        this.isLoading = false;
        this.filteredPosts = this.postControl.valueChanges.pipe(
          startWith<string | Post[]>(this.posts),
          map(value => typeof value === 'string' ? value : this.lastFilter),
          map(filter => this.filter(filter))
        );
      });
    }
  }


  filter(filter: string): Post[] {
    this.lastFilter = filter;
    if (filter) {
      return this.posts.filter(option => {
        return option.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0
          || option.username.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.posts.slice();
    }
  }

  async setAllPosts(): Promise<Post[] | null>
  {
    this.postService.getAllPosts().subscribe(async (posts) => {
      this.posts = posts;
      this.isLoading = false;
    });
    return null;
  }


}
