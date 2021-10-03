import { ICellRendererParams } from "ag-grid-community";
import { BasicInputIconClasses, BasicInputIcons } from ".";

export interface IBasicInputCellRendererParams extends ICellRendererParams {
    [key: string]: any;
    valueToShow?: string;
    icon?: BasicInputIcons;
    iconClass?: BasicInputIconClasses;
    iconFn?: (params: ICellRendererParams) => BasicInputIcons;
    iconClassFn?: (params: ICellRendererParams) => BasicInputIconClasses;
    iconTooltipDescription?: string;
}