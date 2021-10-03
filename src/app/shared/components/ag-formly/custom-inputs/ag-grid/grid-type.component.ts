import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { GridOptions } from 'ag-grid-community';
import { GridFormlyCellComponent } from './grid-formly-cell.component';
import { AgTableConfig } from '../../../ag-table/models/ag-table-config';

@Component({
  selector: 'formly-field-grid',
  template: `
    <div [ngStyle]="style">
      <app-ag-table
        *ngIf="gridOptions.columnDefs"
        [gridOptions]="gridOptions"
        [headerColumns]="gridOptions.columnDefs"
        [dataRows]="model"
        [agTableConfig]="agTableConfig"
      ></app-ag-table>
    </div>
    <!--<button class="btn btn-primary" type="button" (click)="addItem()">Add</button>-->
  `,
})
export class GridTypeComponent extends FieldArrayType implements OnInit {
  @ViewChild('agGrid') agGrid: TemplateRef<any>;

  agTableConfig: AgTableConfig = null;
  gridOptions: GridOptions;
  style: any = {};

  ngOnInit() {
    this.style = {
      width: this.to.width,
      height: this.to.height,
    };

    // map cell Renderer to Formly Component
    this.to.gridOptions.columnDefs.forEach(
      (column) => (column.cellRendererFramework = GridFormlyCellComponent)
    );

    // set grid options and context of the parent formly field
    const gridOptions: GridOptions = this.to.gridOptions || {};
    gridOptions.context = {
      parentField: this.field,
    };
    gridOptions.onFirstDataRendered = ($event) => {
      this.onFirstDataRendered($event);
    };
    this.gridOptions = gridOptions;

    this.agTableConfig = this.to.gridOptions?.agTableConfig;
  }

  addItem() {
    this.add();
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
}
