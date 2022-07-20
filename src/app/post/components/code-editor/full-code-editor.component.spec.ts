import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCodeEditorComponent } from './full-code-editor.component';

describe('CodeEditorComponent', () => {
  let component: FullCodeEditorComponent;
  let fixture: ComponentFixture<FullCodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullCodeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
