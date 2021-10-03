import { Component, OnInit } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-mascara-wrapper',
  template: `
    <div class="form-group">
      <label>{{ to.label }} <span *ngIf="to.required">*</span> </label>
      <div class="custom-input" *ngFor="let input of field.fieldGroup">
        <formly-field [field]="input" class="formly-custom"></formly-field>
      </div>
    </div>
  `,
  styleUrls: ['./mascara-wrapper.component.scss'],
})
export class MascaraWrapperComponent extends FieldWrapper implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.field.fieldGroup.forEach((input) => {
      if (this.field.templateOptions.blur && !input.templateOptions.blur) {
        input.templateOptions.blur = (field: FormlyFieldConfig, event?: any) =>
          this.field.templateOptions.blur(this.field, event);
      }
      if (this.field.templateOptions.change && !input.templateOptions.change) {
        input.templateOptions.change = (
          field: FormlyFieldConfig,
          event?: any
        ) => this.field.templateOptions.change(this.field, event);
      }
    });
  }
}
