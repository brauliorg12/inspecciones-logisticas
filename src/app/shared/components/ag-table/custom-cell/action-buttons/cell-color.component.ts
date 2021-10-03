import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

/**
 * MODELA UN COLOR DE TEXTO PARA UNA PROPIEDAD STRING
 *
 * MODELO A USAR CON CellColor
 *
 *  { field = params.value -> El valor del campo se considera para ver si es rojo o verde y renderizar la clase  }
 */
@Component({
  selector: 'app-child-cell',
  template: ` <div class="d-flex">
    <span [ngClass]="params.value == 'Normal' ? 'verde' : 'rojo'">{{
      params.value
    }}</span>
  </div>`,
  styles: ['.verde { color: #28A745; } .rojo { color: #F10826;}'],
})
export class CellColor implements ICellRendererAngularComp {
  public params: any;
  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
