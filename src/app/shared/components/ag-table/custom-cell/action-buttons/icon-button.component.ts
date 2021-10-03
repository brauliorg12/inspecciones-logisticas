import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, ColDef } from 'ag-grid-community';
import { IconLoaderService } from '../../../../../services/icon-loader/icon-loader.service';
/**
 * MODELO A USAR CON ICONBUTTON
 * [ -- ARRAY DE OBJETOS
 *  { icon -> iconos en ActionButtonTypes |
 *    action -> action a ejecutar en callback en iconButtonAction que se implementa en el component
 *              que se llama el ag-grid |
 *    hideProperty -> Acompañado de hideExpression sirve para condicionar la muestra del boton a la expresion
 *                    Si esta solo, si la propiedad es distinta de null esconde el boton |
 *    hideExpression -> Tiene que estar el hideProperty. Sirve para condicionar la muestra del boton a la expresion.
 *                      Si la condicion es true se esconde
 *  }
 * ]
 */
@Component({
  selector: 'app-child-cell',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class IconButton implements ICellRendererAngularComp {
  public params: ICellRendererParams;
  public cellRendererParams: CellRendererParam[];
  // TODO Consultar si el CellRenderParams es array. sino evaluar [{kebabButtons}, {buttonsToShow}]
  public cellRendererParamsKebab: CellRendererParam[];
  public allow = [];
  public isSvg: boolean[] = [];
  public iconName: string[] = [];

  constructor(private iconService: IconLoaderService) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.cellRendererParams = params.colDef.cellRendererParams;
    this.cellRendererParams.forEach((element, i) => {
      if (element.showFunction) {
        this.allow[i] = element.showFunction(params.data);
      } else if (!element.hideExpression) {
        if (params.data[element.hideProperty]) {
          this.allow[i] = null;
        } else {
          this.allow[i] = true;
        }
      } else if (element.hideExpression) {
        if (eval(`params.data.${element.hideExpression}`)) {
          this.allow[i] = true;
        } else {
          this.allow[i] = null;
        }
      }
    });

    this.initIcons(this.cellRendererParams);
  }

  iconButtonAction(cellRendererParam: CellRendererParam): void {
    // action,i
    if (cellRendererParam.iconButtonAction)
      cellRendererParam.iconButtonAction(
        this.params.node.data,
        this.params.colDef
      );
    else
      this.params.context.componentParent.iconButtonAction(
        this.params.node.data,
        this.params.colDef,
        cellRendererParam.action
      );
  }

  refresh(): boolean {
    return false;
  }

  private initIcons(params: CellRendererParam[]): void {
    params.forEach((item, i) => {
      const isSvg = this.iconService.isSvgIcon(item.icon);
      this.isSvg[i] = isSvg;
      this.iconName[i] = this.iconService.getIconAlias(item.icon);
    });
  }
}

export enum ActionButtonTypes {
  Delete = 'delete',
  Edit = 'edit',
  Filtro = 'filtro',
  New = 'new',
  Reingresar = 'reingresar',
  Search = 'search',
  View = 'view',
  Warn = 'warn',
  Ok = 'ok',
  Cancel = 'cancel',
  UploadPdf = 'cargaPdf',
  Despachar = 'despachar',
  Mensajes = 'mensajes',
  Kebab = 'opciones',
  Pagar = 'pagar',
}

export type actionType =
  | 'cancel'
  | 'carga-pdf'
  | 'delete'
  | 'despachar'
  | 'edit'
  | 'exclama'
  | 'filtro'
  | 'new'
  | 'ok'
  | 'pagar'
  | 'reingresar'
  | 'search'
  | 'view'
  | 'mensajes'
  | 'opciones'
  | string;

export type CellRendererParam = {
  icon: ActionButtonTypes;
  action?: actionType | string;
  /**
   * @property hideProperty, acompañado de hideExpression sirve para condicionar la muestra del boton a la expresion
   * Si esta solo, si la propiedad es distinta de null esconde el boton
   */
  hideProperty?: any;
  /**
   * @property hideExpression, Tiene que estar el hideProperty. Sirve para condicionar la muestra del boton a la expresion.
   * Si la condicion es true se esconde
   */
  hideExpression?: any;
  /**
   * @property showFunction, Condicionar la muestra del boton segun sea el boolean que devuelva la funcion.
   */
  showFunction?: (data: any) => boolean;

  /**
   * @property iconButtonAction, funcion particular al clickear el icono. Reemplaza la funcion parentComponent.iconButtonAction
   */
  iconButtonAction?: (data: any, colDef: ColDef) => void;
};
