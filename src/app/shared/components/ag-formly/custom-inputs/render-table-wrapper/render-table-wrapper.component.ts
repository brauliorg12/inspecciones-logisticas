import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { Subscription } from 'rxjs';

import { GridOptions } from 'ag-grid-community';
import { AgTableComponent } from '../../../ag-table/ag-table.component';

@Component({
  selector: 'app-render-table-wrapper',
  template: `
    <div class="table-container">
      <app-ag-table
        #table
        [gridOptions]="to.gridOptions"
        [headerColumns]="to.gridOptions.columnDefs"
        [dataRows]="dataRows"
        (gridOptionsInstance)="gridOptionsInstance($event)"
      ></app-ag-table>
      <ng-container #fieldComponent></ng-container>
    </div>
  `,
  styleUrls: ['./render-table-wrapper.component.scss'],
})
export class RenderTableWrapperComponent
  extends FieldWrapper
  implements OnInit, OnDestroy
{
  @ViewChild('table') table: AgTableComponent;

  private changesSub: Subscription;

  get dataRows() {
    return !Array.isArray(this.model) || !this.model ? [] : this.model;
  }

  ngOnInit(): void {
    this.initChangesSub();
  }

  ngOnDestroy(): void {
    this.changesSub.unsubscribe();
  }

  currentItemIsValid(): boolean {
    const key = <string>this.field.key;
    return this.form.controls[key].valid;
  }

  onFirstDataRendered(params): void {
    params.api.sizeColumnsToFit();
  }

  private initChangesSub(): void {
    this.changesSub = this.field.formControl.valueChanges.subscribe(() => {
      this.table.update();
    });
  }

  public gridOptionsInstance(gridOptions: GridOptions): void {
    const key = this.field.key as string;
    if (!this.field.options.formState.renderTableInstances) {
      this.field.options.formState.renderTableInstances = {};
    }
    this.field.options.formState.renderTableInstances[key] = gridOptions;
  }
}
