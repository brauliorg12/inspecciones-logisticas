import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyActionButtonComponent } from './formly-action-button.component';

describe('FormlyFieldButtonComponent', () => {
  let component: FormlyActionButtonComponent;
  let fixture: ComponentFixture<FormlyActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlyActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
