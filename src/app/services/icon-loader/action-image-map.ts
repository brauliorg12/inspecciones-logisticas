import { ActionButtonTypes } from '@shared/components/ag-table/custom-cell/action-buttons/icon-button.component';

export interface ActionImageMap {
  [ActionButtonTypes.Delete]: string;
  [ActionButtonTypes.Edit]: string;
  [ActionButtonTypes.Filtro]: string;
  [ActionButtonTypes.New]: string;
  [ActionButtonTypes.Reingresar]: string;
  [ActionButtonTypes.Search]: string;
  [ActionButtonTypes.View]: string;
  [ActionButtonTypes.Warn]: string;
  [ActionButtonTypes.Ok]: string;
  [ActionButtonTypes.Cancel]: string;
  [ActionButtonTypes.UploadPdf]: string;
  [ActionButtonTypes.Despachar]: string;
  [ActionButtonTypes.Kebab]: string;
  [ActionButtonTypes.Pagar]: string;
}
