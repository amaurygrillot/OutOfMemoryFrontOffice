import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFollowingComponent } from './all-following.component';

describe('AllFollowingComponent', () => {
  let component: AllFollowingComponent;
  let fixture: ComponentFixture<AllFollowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFollowingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
