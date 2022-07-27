import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentPostComponent } from './create-comment-post.component';

describe('CreateCommentPostComponent', () => {
  let component: CreateCommentPostComponent;
  let fixture: ComponentFixture<CreateCommentPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommentPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
