import { FieldTabsTemplateOptions } from './models/field-tabs-template-options';
import { Component, OnInit } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { ButtonStyles } from '../../../button/button.component';

@Component({
  selector: 'formly-field-tabs',
  template: `
    <mat-tab-group [(selectedIndex)]="formState.fieldTabs.currentTab">
      <mat-tab
        *ngFor="let tab of field.fieldGroup; let i = index; let last = last"
        [label]="getTemplateOptions(tab).label"
        [class]="'container'"
        [disabled]="getTemplateOptions(tab).disabled"
      >
        <formly-field [field]="tab"></formly-field>

        <app-button
          *ngIf="last && getTemplateOptions(tab).showSubmit !== false"
          typeButton="submit"
          class="button"
          [classes]="buttonClasses.primary"
          [disabled]="formControl.invalid"
        >
          {{ getTemplateOptions(tab).submitText || 'Submit' }}
        </app-button>

        <ng-template mat-tab-label>
          {{ getTemplateOptions(tab).label }}
          <mat-icon class="required-icon" *ngIf="showValidIcon(tab)"
            >info</mat-icon
          >
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrls: ['./field-tabs.component.scss'],
})
export class FieldTabs extends FieldType implements OnInit {
  public buttonClasses = ButtonStyles;

  showValidIcon(field: FormlyFieldConfig) {
    let showValidIcon = false;
    const iconRequired = this.getTemplateOptions(field)?.iconRequired;
    if (typeof iconRequired == 'function') showValidIcon = iconRequired(field);
    return showValidIcon;
  }

  getTemplateOptions(field: FormlyFieldConfig) {
    return field.templateOptions as FieldTabsTemplateOptions;
  }

  isValid(field: FormlyFieldConfig) {
    if (field.key) {
      return field.formControl.valid;
    }
    return field.fieldGroup.every((f) => this.isValid(f));
  }

  ngOnInit(): void {
    this.formState.fieldTabs = {
      ...this.formState.fieldTabs,
      currentTab: 0,
    };
  }
}
