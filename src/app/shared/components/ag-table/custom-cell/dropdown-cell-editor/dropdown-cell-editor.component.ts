import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

/**
 * DOCS: https://www.ag-grid.com/javascript-grid-cell-editor/
 */
@Component({
  selector: 'app-dropdown-cell-editor',
  template: ` <ng-select
    class="ng-select"
    appearance="outline"
    [clearable]="clearable"
    [searchable]="searchable"
    [bindValue]="bindValueOp"
    [bindLabel]="bindLabelOp"
    [items]="options"
    [(ngModel)]="value"
    (change)="onChange($event)"
    appendTo="body"
  ></ng-select>`,
  styleUrls: ['./dropdown-cell-editor.component.scss'],
})
export class DropdownCellEditorComponent implements ICellEditorAngularComp {
  bindValueOp: string;
  bindLabelOp: string;
  clearable = false;
  searchable = false;
  multiple = false;
  options: any[] = [];
  params: any;
  value: any;

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = this.params.value;
    this.options = this.params.values ? this.params.values : [];
    this.clearable = this.params.clearable
      ? this.params.clearable
      : this.clearable;
    this.searchable = this.params.searchable
      ? this.params.searchable
      : this.searchable;
    this.multiple = this.params.multiple ? this.params.multiple : this.multiple;

    this.bindValueOp = this.params.bindValueOp ? this.params.bindValueOp : 'id';
    this.bindLabelOp = this.params.bindLabelOp
      ? this.params.bindLabelOp
      : 'valor';

    // Para cargar los datos desde una url
    if (this.params.loadFromUrl) {
      this.params
        .loadFromUrl(this.params, this.params.api)
        .subscribe((val) => (this.options = val));
    }
  }

  getValue() {
    return this.value;
  }
  isPopup?(): boolean {
    return true;
  }
  onChange(ev) {
    this.params.api.stopEditing();
    const cellEditorParams = this.params.colDef.cellEditorParams;
    if (cellEditorParams.gridDropdownChange)
      cellEditorParams.gridDropdownChange(this.params, ev, this.params.api);
    else if (this.params.context.componentParent.gridDropdownChange)
      this.params.context.componentParent.gridDropdownChange(
        this.params,
        ev,
        this.params.api
      );
    else console.info('No se ha declarado la función gridDropdownChange');
  }

  /*getPopupPosition?(): string {
    throw new Error('Method not implemented.');
  }
  isCancelBeforeStart?(): boolean {
    throw new Error('Method not implemented.');
  }
  isCancelAfterEnd?(): boolean {
    throw new Error('Method not implemented.');
  }
  focusIn?(): void {
    throw new Error('Method not implemented.');
  }
  focusOut?(): void {
    throw new Error('Method not implemented.');
  }
  getFrameworkComponentInstance?() {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }*/
}
