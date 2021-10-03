import { ICellEditorParams } from 'ag-grid-community';

export interface IBasicInputCellEditorParams extends ICellEditorParams {
    getValue: (value: any, params?: ICellEditorParams) => void;
}