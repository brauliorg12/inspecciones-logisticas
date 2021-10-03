import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownCellEditorComponent} from './custom-cell/dropdown-cell-editor/dropdown-cell-editor.component';
import {AG_GRID_LOCALE_ES} from './locale/gridLocaleES';
import {AgTableConfig} from './models/ag-table-config';
import {RowSelectionEnum} from './models/ag-table.enum';
import {GridOptions} from 'ag-grid-community';

/**
 * IMPLEMENTACION DE AG GRID
 * -- INPUTS
 *  headerColumns -> Columnas de la tabla del tipo ColDef |
 *  dataRows -> Datos que completan los row de la tabla |
 *  gridOptions ->
 *  pagination -> Activa la paginacion |
 *  paginationPageSize -> Determina el tamaño de row por pagina
 */
@Component({
  selector: 'app-ag-table',
  templateUrl: './ag-table.component.html',
  styleUrls: ['./ag-table.component.scss']
})
export class AgTableComponent implements OnInit {
  @Output() gridOptionsInstance = new EventEmitter<GridOptions>();
  /**
   * @deprecated
   */
  @Output() RowSelected = new EventEmitter<any>();
  /**
   * @deprecated
   */
  @Input() headerColumns;

  @Input('colDefs') set _colDefs(newVal) {
    this.gridOptions.columnDefs = newVal;
  }

  // TODO intentar pasar dataRowsPinned en el gridoptions y que actualice la data
  @Input() dataRowsPinned;

  @Input() dataRows;
  @Input() gridOptions: GridOptions;
  @Input() agTableConfig: AgTableConfig;
  frameworkComponents = {
    dropdownCellEditorComponent: DropdownCellEditorComponent,
  };

  // constructor() {
  // }

  // style = {
  //   width: '100%',
  //   height: '100%',
  //   flex: '1 1 auto'
  // };

  ngOnInit(): void {
    if (!this.gridOptions.columnDefs) {
      // TODO: Eliminar cuando no haya mas utilizacion de headerColumns
      this.gridOptions.columnDefs = this.headerColumns;
    }
    this.fillTableConfig();
    this.gridOptionsInstance.emit(this.gridOptions);
  }

  /**
   * Se llenan los parametros por si vienen nulos
   */
  fillTableConfig(): void {
    // COMPROBACION SI ES NULL PARA DEJAR POR DEFECTO
    if (!this.agTableConfig) {
      this.agTableConfig = { rowSelection: this.gridOptions.rowSelection ? this.gridOptions.rowSelection : RowSelectionEnum.Single };
    }
    // PASAR TODO ESTO A UN METODO
    this.agTableConfig.suppressRowClickSelection === null ? false : this.agTableConfig.suppressRowClickSelection;
    this.agTableConfig.pagination === null ? false : this.agTableConfig.pagination;
    this.agTableConfig.paginationPageSize === null ? 100 : this.agTableConfig.paginationPageSize;
    this.agTableConfig.rowHeight === null ? 25 : this.agTableConfig.rowHeight;
    this.gridOptions = {...this.gridOptions, localeText: AG_GRID_LOCALE_ES};
  }

  public update(): void {
    this.gridOptions.api.setRowData(this.dataRows);
  }
}
