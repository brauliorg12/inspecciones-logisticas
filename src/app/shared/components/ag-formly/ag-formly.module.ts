import { NgModule } from '@angular/core';
import { AgFormlyComponent } from './ag-formly.component';

import { DropdownInputComponent } from './custom-inputs/dropdown-input/dropdown-input.component';
import { DropdownAddressInputComponent } from './custom-inputs/dropdown-input/dropdown-address-input.component';
import { FieldTabs } from './custom-inputs/field-tabs/field-tabs.component';
import { FormlyActionButtonComponent } from './custom-inputs/formly-action-button';
import { GridFormlyCellComponent } from './custom-inputs/ag-grid/grid-formly-cell.component';
import { GridTypeComponent } from './custom-inputs/ag-grid/grid-type.component';
import { RepeatSectionComponent } from './custom-inputs/repeat-section/repeat-section.component';
import { MultiStateCheckboxComponent } from './custom-inputs/multi-state-checkbox/multi-state-checkbox.component';
import { NoLabelWrapperComponent } from './custom-inputs/no-label-wrapper/no-label-wrapper.component';
import { NestedFormWrapperComponent } from './custom-inputs/nested-form-wrapper/nested-form-wrapper.component';
import { RenderTableWrapperComponent } from './custom-inputs/render-table-wrapper/render-table-wrapper.component';
import { MascaraWrapperComponent } from './custom-inputs/mascara-wrapper/mascara-wrapper.component';
import { AutocompleteInputComponent } from './custom-inputs/autocomplete/autocomplete-input.component';
import { MaterialChipsInputComponent } from './custom-inputs/material-chips-input/material-chips-input/material-chips-input.component';

import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AddressWrapperComponent } from './custom-inputs/address-input/address-input-wrapper.component';
import { AddressInputDefaulOptions } from './custom-inputs/address-input/address-input-default-options.model';
import { AgGridModule } from 'ag-grid-angular';

import { AgTableModule } from './../ag-table/ag-table.module';

import { defaultOptions as defaultActionBtnOptions } from './custom-inputs/formly-action-button/constants/default-options';
import { FormlyModule } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { PhoneInputDefaulOptions } from './custom-inputs/phone-input/phone-input-default-options.model';
import { MatInputModule } from '@angular/material/input';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { validations } from './validations/validations.model';
import { validationMessages } from './validations/validation-messages.model';

@NgModule({
  declarations: [
    AgFormlyComponent,
    DropdownInputComponent,
    DropdownAddressInputComponent,
    FieldTabs,
    FormlyActionButtonComponent,
    GridFormlyCellComponent,
    GridTypeComponent,
    RepeatSectionComponent,
    MultiStateCheckboxComponent,
    NoLabelWrapperComponent,
    NestedFormWrapperComponent,
    RenderTableWrapperComponent,
    MascaraWrapperComponent,
    AutocompleteInputComponent,
    MaterialChipsInputComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormlyMaterialModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatInputModule,
    MatAutocompleteModule,
    AgGridModule.withComponents([GridFormlyCellComponent]),
    AgTableModule,
    FormlyModule.forRoot({
      validators: [...validations],
      validationMessages: [...validationMessages],
      wrappers: [
        { name: 'no-label', component: NoLabelWrapperComponent },
        { name: 'nested-form', component: NestedFormWrapperComponent },
        { name: 'render-table', component: RenderTableWrapperComponent },
        { name: 'address', component: AddressWrapperComponent },
        { name: 'mascara', component: MascaraWrapperComponent },
      ],
      types: [
        {
          name: 'action-button',
          component: FormlyActionButtonComponent,
          wrappers: ['form-field'],
          defaultOptions: defaultActionBtnOptions,
        },
        {
          name: 'multi-state-checkbox',
          component: MultiStateCheckboxComponent,
        },
        {
          name: 'dropdown-address-input',
          component: DropdownAddressInputComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'dropdown-input',
          component: DropdownInputComponent,
          wrappers: ['form-field'],
        },
        { name: 'repeat-section', component: RepeatSectionComponent },
        { name: 'tabs', component: FieldTabs },
        { name: 'material-chips', component: MaterialChipsInputComponent },
        {
          name: 'telefono-inputs',
          extends: 'formly-group',
          defaultOptions: PhoneInputDefaulOptions,
        },
        {
          name: 'address-inputs',
          extends: 'formly-group',
          defaultOptions: AddressInputDefaulOptions,
        },
        {
          name: 'grid',
          component: GridTypeComponent,
          defaultOptions: {
            templateOptions: {
              width: '100%',
              height: '400px',
            },
          },
        },
        {
          name: 'autocomplete',
          component: AutocompleteInputComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
  providers: [],
  exports: [AgFormlyComponent],
})
export class AgFormlyModule {}
