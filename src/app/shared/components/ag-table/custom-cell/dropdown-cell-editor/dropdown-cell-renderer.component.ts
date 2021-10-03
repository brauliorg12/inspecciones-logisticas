import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

/**
 * DOCS: https://www.ag-grid.com/javascript-grid-cell-editor/
 */
@Component({
  selector: 'app-dropdown-cell-renderer',
  template: `
    <span>
    {{value}}
    </span>

  `
})
export class DropdownCellRendererComponent implements ICellRendererAngularComp {

  public params;
  public value;
  constructor() { }

  agInit(params: ICellRendererParams): void {
    this.setValues(params);
  }
  refresh(params: any): boolean {
    this.setValues(params);
    return true;
  }

  setValues(params) {
    this.params = params;
    const value = this.params.value;
    this.value = this.params.valueToShow ? eval(this.params.valueToShow) : value;
  }

}
