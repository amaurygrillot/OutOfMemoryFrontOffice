import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Post} from "@app/shared/models";
import {PostService} from "@app/services/post.service";
import {Observable, of} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {DatePipe} from "@angular/common";
import {environment} from "@environments/environment.prod";
import {AppComponent} from "@app/app.component";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnChanges {
  @Input() allPosts!: boolean;
  @Input() userId!: string;
  @Input() lastIndex!: number;

  @ViewChild('selectSort') selectSort!: MatSelect;
  postControl = new FormControl();
  sortControl = new FormControl();
  ageControl = new FormControl();
  URL = environment.baseUrl
  posts!: Post[];
  filteredPosts!: Observable<Post[]>;
  lastFilter = '';
  lastSort = 'Date';
  lastAge = 'All';
  isLoading = true;
  isLogged = sessionStorage.getItem('token') !== null;
  oneDayMillisecond = 1000 * 60 * 60 * 24;

  constructor(private postService: PostService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.allPosts) {
      this.postService.getAllPosts().subscribe(async posts => {
        this.posts = posts;
        this.isLoading = false;
        this.filter('', this.posts)
      });
    } else {
      if (this.userId === undefined) { this.userId = sessionStorage.getItem('userId') || ''}
      this.postService.getPostsByUserId().subscribe(async posts => {
        this.posts = posts;
        this.isLoading = false;
        //console.log(`userId ${this.userId} ${this.posts}`)
        this.filter('', this.posts)
      });
    }
    this.postControl.valueChanges.subscribe((filter =>
    {
        this.filter(filter, this.posts);
    }));

  }


  async setAllPosts(): Promise<Post[] | null>
  {
    this.postService.getAllPosts().subscribe(async (posts) => {
      this.posts = posts;
      this.isLoading = false;
    });
    return null;
  }


  filter(filter: string, startArray: Post[]): Post[] {
    let newPosts = startArray.filter(option =>
    {
      return option.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        || option.username.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    });
    if(startArray === this.posts)
    {
      //console.log(newPosts)
      newPosts = this.sortPosts(this.lastSort, newPosts);
      //console.log(newPosts)
      newPosts = this.selectAge(this.lastAge, newPosts);
      this.filteredPosts = of(newPosts);
      this.lastFilter = filter;
    }
    return newPosts
  }

  sortPosts(sortType: string, startArray: Post[]): Post[] {
    let newPosts = startArray;
      if(sortType === 'Popularité')
      {
        newPosts = startArray.sort(((a,b) => b.count_likes - a.count_likes));
      }
      else if(sortType === 'Date')
      {
        newPosts = startArray.sort(((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
      }
      if(startArray === this.posts)
      {
        newPosts = this.filter(this.lastFilter, newPosts);
        newPosts = this.selectAge(this.lastAge, newPosts);
        this.filteredPosts = of(newPosts);
        this.lastSort = sortType
      }
      return newPosts;
  }

  selectAge(ageSelected: string, startArray: Post[]): Post[] {
    let newPosts = startArray;
    if(ageSelected === 'Today')
    {
       newPosts = startArray.filter(option =>
          (new Date().getTime() - new Date(option.created_at).getTime()) < this.oneDayMillisecond
       )
    }
    else if(ageSelected === 'Week')
    {
      newPosts = startArray.filter(option =>
        (new Date().getTime() - new Date(option.created_at).getTime()) < this.oneDayMillisecond * 7
      )

    }
    if(startArray === this.posts)
    {
      newPosts = this.filter(this.lastFilter, newPosts);
      newPosts = this.sortPosts(this.lastSort, newPosts);
      this.filteredPosts = of(newPosts);
      this.lastAge = ageSelected;
    }
    return newPosts;
  }
}
