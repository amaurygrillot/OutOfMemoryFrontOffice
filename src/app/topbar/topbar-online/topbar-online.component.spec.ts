import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarOnlineComponent } from './topbar-online.component';

describe('TopbarOnlineComponent', () => {
  let component: TopbarOnlineComponent;
  let fixture: ComponentFixture<TopbarOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarOnlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
