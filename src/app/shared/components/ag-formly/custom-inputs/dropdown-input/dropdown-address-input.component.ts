import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { DropdownInputComponent } from './dropdown-input.component';

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
      [items]="items$ | async"
      [placeholder]="placeholder"
      [formlyAttributes]="field"
      [dropdownPosition]="dropdownPosition"
      (keyup)="calles($event)"
    >
      <ng-template
        ng-option-tmp
        let-item="item"
        let-index="index"
        let-search="searchTerm"
      >
        <div style="margin: 10px 0;">
          <span>{{ item.calle.nombre }} {{ item.altura.valor }}</span
          ><br />
          <span>{{ item.localidad_censal.nombre }}</span
          ><br />
          <small>{{ item.provincia.nombre }}</small>
        </div>
      </ng-template>
    </ng-select>
  `,
})
export class DropdownAddressInputComponent extends DropdownInputComponent {
  public items$: Observable<any[]>;
  constructor() {
    super();
  }

  calles(ev): boolean {
    const value = ev.target.value;
    if (value.length < 4) {
      return false;
    }
    this.items$ = this.formState.addressWrapper.dataDireccionDropdown(value);
    return true;
  }
}
