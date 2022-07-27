import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCommentsByPostComponent } from './all-comments-by-post.component';

describe('AllCommentsByPostComponent', () => {
  let component: AllCommentsByPostComponent;
  let fixture: ComponentFixture<AllCommentsByPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCommentsByPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCommentsByPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
