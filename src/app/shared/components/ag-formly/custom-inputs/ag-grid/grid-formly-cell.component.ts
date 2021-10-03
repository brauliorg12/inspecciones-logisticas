import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'formly-ag-grid-cell',
  template: `<formly-field [field]="getField()"></formly-field>`,
})
export class GridFormlyCellComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.setParams(params);
  }

  refresh(params): boolean {
    this.setParams(params);
    return true;
  }

  setParams(params: any) {
    this.params = params;
  }

  getField(): FormlyFieldConfig {
    const rowIndex = this.params.rowIndex;
    const prop = this.params.colDef.field;
    const fg = this.params.context.parentField.fieldGroup;

    return fg[rowIndex].fieldGroup.find((f) => f.key === prop);
  }
}
