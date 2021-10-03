import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { FieldType } from '@ngx-formly/core';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-form-autocomplete-type',
  template: `
    <input
      matInput
      class="form-control ng-untouched ng-pristine ng-valid ng-star-inserted"
      [matAutocomplete]="auto"
      [formControl]="displayControl"
      [placeholder]="placeholder"
    />
    <input
      matInput
      [hidden]="true"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
    <mat-autocomplete
      #auto="matAutocomplete"
      (optionSelected)="onAutoCompleteSelected($event)"
    >
      <mat-option *ngFor="let item of filter | async" [value]="item.value">
        {{ item.label }}
      </mat-option>
    </mat-autocomplete>
    <mat-error>
      <formly-validation-message [field]="field"></formly-validation-message>
    </mat-error>
  `,
})
export class AutocompleteInputComponent extends FieldType implements OnInit {
  @ViewChild(MatInput) formFieldControl: MatInput;
  filter: Observable<any | string>;
  formControl: FormControl;
  displayControl: FormControl;
  displayControlSub: Subscription;
  searchInputValueObserver: Subscription;
  placeholder: string;
  bindValueOp: string | number;
  bindLabelOp: string | number;
  disabled: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initDisplayControl();
    this.initAttributes();
    this.initAutocompleteFilter();
  }

  onAutoCompleteSelected(event: MatAutocompleteSelectedEvent): void {
    const option = event.option;
    this.onOptionSelected({
      label: option.viewValue,
      value: option.value,
    });
  }

  private initAttributes(): void {
    this.bindValueOp = this.to.attributes
      ? this.to.attributes.bindValueOp
      : 'id';
    this.bindLabelOp = this.to.attributes
      ? this.to.attributes.bindLabelOp
      : 'valor';
    this.disabled = this.to.disabled;
    if (this.disabled) {
      this.formControl.disable();
      this.displayControl.disable();
    }
  }

  private initAutocompleteFilter(): void {
    this.filter = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap((term) => this.processFilter(term))
    );
  }

  private initDisplayControl(): void {
    this.displayControl = new FormControl();
    this.searchInputValueObserver = this.formControl.valueChanges.subscribe(
      (arg) => {
        this.processFilter(arg)
          .toPromise()
          .then((filterValue: FilterValue[]) => {
            if (
              filterValue &&
              filterValue.length > 0 &&
              filterValue.length === 1
            ) {
              this.formControl.setValue(filterValue[0].value);
            }
          });
      }
    );
    this.placeholder = this.field.templateOptions.placeholder;
    this.initDisplayControlSub();
  }

  private initDisplayControlSub(): void {
    this.displayControlSub = this.displayControl.valueChanges.subscribe(
      (newVal) => this.formControl.setValue(newVal)
    );
  }

  private onOptionSelected(option: FilterValue): void {
    this.stopDisplayControlSub();
    this.displayControl.setValue(option.label);
    this.initDisplayControlSub();
  }

  private processFilter(term): Observable<FilterValue[]> {
    return this.to
      // .filter(term)
      .pipe(
        map((filteredItems: any[]) =>
          filteredItems.map((item) => this.processFilterItem(item))
        )
      );
  }

  private processFilterItem(item: any): {
    label: any;
    value: any;
  } {
    return typeof item === 'string'
      ? {
          label: item,
          value: item,
        }
      : {
          label: item[this.bindLabelOp],
          value: item[this.bindValueOp] || item,
        };
  }

  private stopDisplayControlSub(): void {
    this.displayControlSub?.unsubscribe();
  }
}

type FilterValue = {
  value: string | number | any;
  label: string | number;
};
