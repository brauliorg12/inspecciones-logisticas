/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MotoFormlyComponent } from './moto-formly.component';

describe('DemoFormlyComponent', () => {
  let component: MotoFormlyComponent;
  let fixture: ComponentFixture<MotoFormlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotoFormlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoFormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
