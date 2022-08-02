import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Post} from "@app/shared/models";
import {PostService} from "@app/services/post.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnChanges {
  @Input() allPosts!: boolean;
  @ViewChild('selectSort') selectSort!: MatSelect;
  postControl = new FormControl();
  sortControl = new FormControl();
  ageControl = new FormControl();
  URL = "https://outofmemoryerror-back.azurewebsites.net"
  posts!: Post[];
  filteredPosts!: Observable<Post[]>;
  lastFilter = '';
  isLoading = true;
  isLogged = sessionStorage.getItem('token') !== null;
  oneDayMillisecond = 1000 * 60 * 60 * 24;
  constructor(private postService: PostService, private datePipe: DatePipe) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.allPosts) {
      this.postService.getAllPosts().subscribe(async posts => {
        console.log("on est passé la")
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
      console.log("mais aussi ici")
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
    console.log("filter " + this.lastFilter);
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


  sortPosts(sortType: string) {
    console.log("last filter " + this.lastFilter)
      if(sortType === 'Popularité')
      {
        this.filteredPosts = this.filteredPosts.pipe(
          map(array =>
            array.sort(((a,b) => b.count_likes - a.count_likes))
          )
        )
      }
      else if(sortType === 'Date')
      {
        this.filteredPosts = this.filteredPosts.pipe(
          map(array =>
            array.sort(((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
          )
        )
      }
  }

  selectAge(sortType: string) {
    console.log("last filter " + this.lastFilter)
    if(sortType === 'Today')
    {
      this.filteredPosts = this.filteredPosts.pipe(
        map(array =>
          array.filter(option => {
        return (new Date().getTime() - new Date(option.created_at).getTime()) < this.oneDayMillisecond;
      })))
    }
    else if(sortType === 'Week')
    {
      this.filteredPosts = this.filteredPosts.pipe(
        map(array =>
          array.filter(option => {
        return (new Date().getTime() - new Date(option.created_at).getTime()) < this.oneDayMillisecond * 7;
      })))
    }
  }
}
