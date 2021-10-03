import { ColDef } from 'ag-grid-community';
import { actionType } from './icon-button.component';

export interface IconButtonParent<T = any> {
  iconButtonAction(model: T, colDef: ColDef, action: actionType): void;
}
