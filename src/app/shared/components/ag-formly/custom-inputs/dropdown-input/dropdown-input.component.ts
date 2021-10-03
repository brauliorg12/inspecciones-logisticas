import { Component, OnInit } from '@angular/core';
import { DropdownPosition } from '@ng-select/ng-select';
import { FieldType } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';

@Component({
  styleUrls: ['./dropdown-input.component.scss'],
  template: `
    <ng-select
      [id]="key"
      appearance="outline"
      class="ng-select"
      [ngClass]="{
        'is-invalid': field.formControl.invalid && field.formControl.touched
      }"
      [clearable]="clearable"
      [searchable]="searchable"
      [multiple]="multiple"
      [formControl]="formControl"
      [bindValue]="bindValueOp"
      [bindLabel]="bindLabelOp"
      [items]="optionsValue"
      [placeholder]="placeholder"
      [formlyAttributes]="field"
      [dropdownPosition]="dropdownPosition"
      [readonly]="disabled"
    >
    </ng-select>
  `,
})
export class DropdownInputComponent extends FieldType implements OnInit {
  required = false;
  key: string;
  bindValueOp: string;
  bindLabelOp: string;
  clearable: boolean;
  searchable: boolean;
  multiple: boolean;
  label: string | number;
  placeholder: string;
  dropdownPosition: DropdownPosition;
  disabled: boolean = false;
  formControl: FormControl;
  optionsValue: any;

  ngOnInit(): void {
    this.setAttributes();
  }

  setAttributes(): void {
    this.optionsValue = this.to.options ? this.to.options : [];
    this.bindValueOp = this.to.attributes
      ? (this.to.attributes.bindValueOp as string)
      : 'id';
    this.bindLabelOp = this.to.attributes
      ? (this.to.attributes.bindLabelOp as string)
      : 'valor';
    this.clearable = this.to.clearable ? (this.to.clearable as boolean) : false;
    this.searchable = this.to.searchable
      ? (this.to.searchable as boolean)
      : false;
    this.multiple = this.to.multiple ? (this.to.multiple as boolean) : false;
    this.label = this.to.label;
    this.placeholder = this.to.placeholder
      ? this.to.placeholder
      : 'Seleccionar';
    this.required = this.to.required ? this.to.required : false;
    this.dropdownPosition = this.to.attributes
      ? (this.to.attributes.dropdownPosition as DropdownPosition)
      : 'bottom';
    // this.disabled = this.to.disabled ? this.to.disabled : false;
  }
}
