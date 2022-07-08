import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarOfflineComponent } from './topbar-offline.component';

describe('TopbarOfflineComponent', () => {
  let component: TopbarOfflineComponent;
  let fixture: ComponentFixture<TopbarOfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarOfflineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
