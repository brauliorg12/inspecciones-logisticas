import { Component, OnInit } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-material-chips-input',
  template: `
    <label>{{ to.label }}</label>
    <mat-chip-list
      class="example-chip"
      cdkDropList
      cdkDropListOrientation="horizontal"
    >
      <mat-chip
        class="example-box"
        cdkDrag
        *ngFor="let chip of field.fieldGroup"
        (click)="click(chip.defaultValue)"
      >
        {{ chip.templateOptions.label }}
      </mat-chip>
    </mat-chip-list>
  `,
  styleUrls: ['./material-chips-input.component.scss'],
})
export class MaterialChipsInputComponent extends FieldType implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}

  click(value: any) {
    this.to.click(this.field, value);
  }
}
