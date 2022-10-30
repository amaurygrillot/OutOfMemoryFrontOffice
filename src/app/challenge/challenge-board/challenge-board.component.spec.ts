import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeBoardComponent } from './challenge-board.component';

describe('ChallengeBoardComponent', () => {
  let component: ChallengeBoardComponent;
  let fixture: ComponentFixture<ChallengeBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
