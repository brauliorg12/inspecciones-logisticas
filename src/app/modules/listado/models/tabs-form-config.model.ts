import { IAgFormlyConfig } from '@shared/components/ag-formly/models/ag-formly-config.model';
import { mockMotosTableModelParteExternaBase } from '@models/motos-table-model';
import { DropdownCellRendererComponent } from '@shared/components/ag-table/custom-cell/dropdown-cell-editor/dropdown-cell-renderer.component';
import { DropdownCellEditorComponent } from '@shared/components/ag-table/custom-cell/dropdown-cell-editor/dropdown-cell-editor.component';

const setDefault = () => {
  // Funcion para limpiar por defecto la tabla
  /// console.log(mockMotosTableModelParteExternaBase);

  return mockMotosTableModelParteExternaBase;
};

export const getEstados = (): any => {
  const result: any[] = [
    { id: 1, value: 'BUENO' },
    { id: 2, value: 'REGULAR' },
    { id: 3, value: 'MALO' },
  ];
  return result;
};

export const tabsFormConfig: IAgFormlyConfig = {
  // submitButton: {
  //   text: 'Guardar',
  //   position: 'bottom',
  // },
  submit: (model) => model,
  model: {
    resultados: {
      datosTabla: setDefault(),
    },
  },
  formState: {
    resetModelWhenSubmit: true,

    dataOptionsDropdown: {
      // Data para dropdown
    },
  },
  fields: [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        // Tabla
        {
          key: 'resultados',
          // wrappers: ['nested-form'],
          // templateOptions: {
          //   // label: 'Resultados Formulario',
          //   required: false,
          //   submitText: 'Guardar',
          //   nestedFormSubmit: (model, field) =>
          //     (field.parent.model.resultados.datosTabla = setDefault()),
          // } as NestedFormTemplateOptions,
          fieldGroupClassName: 'row',
          fieldGroup: [
            // Ag Grid
            {
              key: 'datosTabla',
              wrappers: ['render-table'],

              fieldGroup: [],
              className: 'col-12 mb-3',
              templateOptions: {
                label: 'Resultados',
                gridOptions: {
                  rowSelection: 'single',
                  // pagination: true,
                  // paginationPageSize: 10,
                  // suppressPaginationPanel: true,
                  columnDefs: [
                    {
                      headerName: 'PARTIDOS',
                      resizable: true,
                      suppressMovable: true,
                      sortable: true,
                      
                      flex: 2,
                      field: 'parteExterna',
                      tooltipField: 'PARTE EXTERNA',

                      filter: true,
                      floatingFilter: true,
                      filterParams: {
                        debounceMs: 400,
                      },
                      autoHeight: true,
                      minWidth: 230,
                      maxWidth: 300,
                    },
                    {
                      headerName: 'N° MOVIL',
                      field: 'estadoTable',
                      cellStyle: { textAlign: 'center', position: 'relative' },
                      editable: true,
                      singleClickEdit: true,
                      filter: false,
                      sortable: true,
                      flex: 0.7,
                      resizable: true,
                      suppressMovable: true,
                      minWidth: 120,
                      maxWidth: 120,
                      cellRendererFramework: DropdownCellRendererComponent,
                      cellEditorFramework: DropdownCellEditorComponent,
                      cellEditorParams: {
                        values: getEstados(),
                        bindLabelOp: 'value',
                        bindValueOp: 'value',
                        gridDropdownChange: (params: any) => {
                          const row: any = params.data;
                          console.log(row);
                        },
                      },
                      // valueGetter: (params) => {
                      //   if (params.data.habilitacion) {
                      //     params.data.value = 'Si';
                      //     return 'Si';
                      //   } else {
                      //     params.data.value = 'No';
                      //     return 'No';
                      //   }
                      // },
                    },
                    {
                      headerName: 'R.O./O.I.',
                      field: 'observaciones',
                      flex: 1,
                      resizable: true,
                      autoHeight: true,
                      suppressMovable: true,
                      editable: true,
                      minWidth: 200,
                      filter: true,
                      floatingFilter: true,
                      filterParams: {
                        debounceMs: 400,
                      },
                      cellEditor: 'agLargeTextCellEditor',
                      cellEditorParams: {
                        borders: true,
                        maxLength: '300',
                        cols: '50',
                        rows: '6',
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
