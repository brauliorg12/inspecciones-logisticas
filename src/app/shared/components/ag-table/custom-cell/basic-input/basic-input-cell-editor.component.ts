import { ICellEditorAngularComp } from 'ag-grid-angular';
import { Component } from '@angular/core';
import { IBasicInputCellEditorParams } from './models';

@Component({
  selector: 'app-basic-input',
  template: `<ion-input type="text" [(ngModel)]="value"></ion-input>`,
  styles: []
})
export class BasicInputCellEditorComponent implements ICellEditorAngularComp {

  public value: string;
  public params: IBasicInputCellEditorParams;

  constructor() { }

  agInit(params: IBasicInputCellEditorParams): void {
    this.params = params;
    this.value = this.params.value;
  }

  getValue() {
    if (this.params?.getValue) this.params.getValue(this.value, this.params);
  }

}
