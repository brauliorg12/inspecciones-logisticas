import { ButtonStyles } from './../../../button/button.component';
import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div
      *ngFor="
        let field of field.fieldGroup;
        let c = count;
        let i = index;
        let l = last;
        let f = first
      "
      class="row item"
    >
      <ng-container *ngIf="(l && to.showOnlyLast) || !to.showOnlyLast">
        <formly-field class="col-12" [field]="field"></formly-field>
        <div class="col-3" *ngIf="c > 1 && !to.showOnlyLast">
          <app-button
            class="button"
            [classes]="buttonClasses.alert"
            (click)="removeItem(i)"
          >
            {{ to.removeText }}
          </app-button>
        </div>
      </ng-container>
    </div>
    <div style="margin:30px 0;">
      <app-button
        class="button"
        [classes]="buttonClasses.primary"
        (click)="addItem()"
      >
        {{ to.addText }}
      </app-button>
    </div>
  `,
  styleUrls: ['./repeat-section.component.scss'],
})
export class RepeatSectionComponent extends FieldArrayType {
  public formControl: FormArray;
  public buttonClasses = ButtonStyles;

  currentItemIsValid(): boolean {
    const key = <string>this.field.key;
    return this.form.controls[key].valid;
  }

  addItem() {
    if (this.currentItemIsValid()) {
      this.add();
    }
  }

  removeItem(i) {
    if (this.field.fieldGroup.length > 1) {
      this.remove(i);
    }
  }
}
