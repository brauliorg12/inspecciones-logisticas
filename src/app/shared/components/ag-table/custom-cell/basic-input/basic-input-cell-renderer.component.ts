import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component } from '@angular/core';
import { IBasicInputCellRendererParams, BasicInputIcons, BasicInputIconClasses } from './models';


@Component({
  selector: 'app-basic-input',
  template: `<div class="editable">
    {{ value }}
    <mat-icon [ngClass]="iconClassFn ? iconClassFn : iconClass" [title]="iconTooltipDescription">{{ iconFn ? iconFn : icon }}</mat-icon>
  </div>`,
  styles: [`
    .editable { position: relative; cursor: pointer; display: flex; align-items: center; justify-content: center; min-height: 100%; }
    mat-icon.green { position: absolute; right: 0; color: green; }
    mat-icon.red { position: absolute; right: 0; color: red; }
  `]
})
export class BasicInputCellRendererComponent implements ICellRendererAngularComp {

  public value: any;
  public params: IBasicInputCellRendererParams;
  public icon: BasicInputIcons = BasicInputIcons.check_circle;
  public iconClass: BasicInputIconClasses = BasicInputIconClasses.success;
  public iconFn: BasicInputIcons = BasicInputIcons.check_circle;
  public iconClassFn: BasicInputIconClasses = BasicInputIconClasses.success;
  public iconTooltipDescription: string;

  constructor() { }

  agInit(params: IBasicInputCellRendererParams): void {
    this.setValues(params);
  }
  refresh(params: any): boolean {
    this.setValues(params);
    return true;
  }
  
  setValues(params: IBasicInputCellRendererParams) {
    this.params = params;
    this.value = this.params.value ? this.params.value : ' ';
    this.icon = this.params.icon ? this.params.icon : null;
    this.iconClass = this.params.iconClass ? this.params.iconClass : null;
    this.iconFn = this.params.iconFn ? this.params.iconFn(params) : null;
    this.iconClassFn = this.params.iconClassFn ? this.params.iconClassFn(params) : null;
    this.iconTooltipDescription = this.params.iconTooltipDescription ? this.params.iconTooltipDescription : '';
  }


}
