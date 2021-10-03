import { tabsFormConfig } from './models/tabs-form-config.model';
import { NestedFormConfig } from './models/nested-form-config.model';
import { dropdownInputConfigFormData } from './models/dropdown-input-config.model';
import { AgGridFormlyConfig } from './models/ag-grid-config.model';
import { RepeatingSectionConfig } from './models/repeating-section-config.model';
import { Component, OnInit } from '@angular/core';
import { IAgFormlyConfig } from '@shared/components/ag-formly/models/ag-formly-config.model';

@Component({
  selector: 'app-demo-formly',
  templateUrl: './demo-formly.component.html',
  styleUrls: ['./demo-formly.component.scss'],
})
export class DemoFormlyComponent implements OnInit {
  formRepeatSection: IAgFormlyConfig = new RepeatingSectionConfig();
  formAgFormlyGrid: IAgFormlyConfig = new AgGridFormlyConfig();
  formDropdownInput: IAgFormlyConfig = dropdownInputConfigFormData;
  nestedForm: IAgFormlyConfig = new NestedFormConfig();
  tabsForms: IAgFormlyConfig = tabsFormConfig;

  ngOnInit() {
    this.tabsForms.submit = (model) =>
      console.log('Submit TabsForm >> ', model);
  }
}
