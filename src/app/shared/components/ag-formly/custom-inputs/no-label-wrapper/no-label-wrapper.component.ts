import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import {
  FieldWrapper,
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyTemplateOptions,
} from '@ngx-formly/core';

@Component({
  selector: 'app-no-label-wrapper',
  template: `
    <div class="form-group">
      <label>&nbsp;</label>
      <ng-container #fieldComponent></ng-container>
    </div>
  `,
  styleUrls: ['./no-label-wrapper.component.scss'],
})
export class NoLabelWrapperComponent extends FieldWrapper {
  ngOnInit() {}
}
