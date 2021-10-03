import { NestedFormTemplateOptions } from './models/nested-form-template-options';
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { AlignSubmit } from './models/align-submit.enum';
import { ButtonStyles } from '../../../button/button.component';

@Component({
  selector: 'app-nested-form-wrapper',
  template: `
    <div class="nested-form">
      <p
        class="nested-form-title"
        *ngIf="to.label && !(to.attributes?.showTitle === 'false')"
      >
        {{ to.label }}
      </p>
      <div class="nested-container" [ngClass]="to.alignSubmit">
        <div class="field-component-container">
          <ng-container #fieldComponent></ng-container>
        </div>
        <div class="button-submit-container" *ngIf="to.nestedFormSubmit">
          <app-button
            class="button"
            [classes]="class"
            (click)="submit()"
            [disabled]="!currentItemIsValid()"
          >
            {{ to.submitText || 'Submit' }}
          </app-button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./nested-form-wrapper.component.scss'],
})
export class NestedFormWrapperComponent extends FieldWrapper {
  classT: any;
  public buttonClasses = ButtonStyles;
  public to: NestedFormTemplateOptions;

  get class() {
    const classes = [ButtonStyles.primary];
    if (this.to.alignSubmit === AlignSubmit.RIGHT) {
      classes.push(ButtonStyles.inlineForm);
    }
    return classes.join(' ');
  }

  currentItemIsValid(): boolean {
    const key = this.field.key as string;
    return this.form.controls[key].valid;
  }

  submit(): void {
    if (this.currentItemIsValid()) {
      this.to.nestedFormSubmit(this.model, this.field, this.formState);
    } else {
      this.field.formControl.markAllAsTouched();
    }
  }
}
