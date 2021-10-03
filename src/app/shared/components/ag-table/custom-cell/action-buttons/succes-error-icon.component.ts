import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {ActionButtonTypes} from './icon-button.component'
import { IconLoaderService } from '../../../../../services/icon-loader/icon-loader.service';
/**
 * MODELA UN ICON PARA UNA PROPIEDAD BOOL
 * MODELO A USAR CON SuccessErrorIconButton
 * [ -- ARRAY DE OBJETOS
 *  { campo -> Campo que se considera para ver si es true o false para renderizar el icon
 *  }
 * ]
 */
@Component({
  selector: 'app-child-cell',
  template: `
  <div class="d-flex">
        <img
          style="cursor: pointer; margin-left: 5px"
          width="30px" height="auto"
          [src]="'assets/images/buttons/Boton-' + image + '.svg'">
  </div>`,
  styles: [ `.d-flex { justify-content: center; } `]
})
// tslint:disable-next-line:component-class-suffix
export class SuccessErrorIconButton implements ICellRendererAngularComp {
  public params: any;
  public image: any;

  constructor(private iconService: IconLoaderService) { }

  agInit(params: any): void {
    this.params = params;
    if(this.params.data[params.colDef.cellRendererParams[0].campo]){
      this.image = this.iconService.getIconSvgName(ActionButtonTypes.Ok)
    }else{
      this.image = this.iconService.getIconSvgName(ActionButtonTypes.Cancel)
    }
  }



  refresh(): boolean {
    return false;
  }
}