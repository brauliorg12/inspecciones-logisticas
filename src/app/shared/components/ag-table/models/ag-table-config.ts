//AL AGREGAR PROPIEDADES TIENE QUE SER OPCIONALES (propiedad?)
//ADEMAS VER DE COMPROBAR QUE SI ES NULL, TENGA EL VALOR POR DEFECTO DE AGGRID
//Y AGREGAR LA PROPIEDAD AL HTML
/**
 * Propiedades de la tabla.
 * Se puede agregar otras propiedades
 */

import { RowSelectionEnum } from "./ag-table.enum";

export interface AgTableConfig{
    pagination? : boolean;
    paginationPageSize? : number;
    rowSelection : RowSelectionEnum | string;
    rowHeight? : number;
    suppressRowClickSelection? : boolean;
  }