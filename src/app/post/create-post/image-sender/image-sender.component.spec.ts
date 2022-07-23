import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSenderComponent } from './image-sender.component';

describe('ImageSenderComponent', () => {
  let component: ImageSenderComponent;
  let fixture: ComponentFixture<ImageSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
