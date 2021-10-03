import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-multi-state-checkbox',
  template: `
    <div class="custom-control custom-checkbox">
      <input
        #checkbox
        type="checkbox"
        class="custom-control-input"
        [id]="id"
        [formControl]="to.formControl"
        [formlyAttributes]="field"
        (change)="onInputChange($event)"
      />

      <label [for]="id" class="custom-control-label">
        {{ to.label }}
      </label>
    </div>
  `,
})
export class MultiStateCheckboxComponent
  extends FieldType
  implements OnInit, AfterViewInit
{
  @ViewChild('checkbox') checkbox: ElementRef;
  private previousValue: boolean = undefined;

  ngOnInit(): void {
    this.previousValue = this.formControl.value;
  }

  ngAfterViewInit(): void {
    const target = this.checkbox.nativeElement;
    if (this.formControl.value === 'undefined') {
      target.indeterminate = true;
    }
  }

  onInputChange(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const newVal: boolean = this.getNewVal(target.checked);

    if (newVal === undefined) {
      target.indeterminate = true;
    }
    this.formControl.setValue(newVal);
    this.previousValue = newVal;
    target.checked = !!newVal;
  }

  private getNewVal(isChecked: boolean): boolean {
    switch (this.previousValue) {
      case true:
        return undefined;
      case undefined:
        return false;
      case null:
      default:
        return isChecked;
    }
  }
}
