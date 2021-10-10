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
        // Simple texto y requerido
        {
          // key: 'movilRoId',
          // type: 'radio',
          className: 'col-12',
          expressionProperties: {
            template: () => `<h3><strong>MOVIL R.O./O.I.:</strong> Moto </h3>`,
          },
          // templateOptions: {
          //   label: 'MOVIL R.O./O.I.',
          //   required: false,
          //   options: [
          //     {
          //       value: 1,
          //       label: 'Auto/Camioneta',
          //     },
          //     {
          //       value: 2,
          //       label: 'Moto',
          //     },
          //   ],
          // },
        },
        // {
        //   key: 'movilRoId',
        //   type: 'dropdown-input',
        //   className: 'col-6',
        //   templateOptions: {
        //     label: 'MOVIL R.O./O.I.',
        //     required: false,
        //     options: [
        //       {
        //         value: 1,
        //         label: 'Auto/Camioneta',
        //       },
        //       {
        //         value: 2,
        //         label: 'Moto',
        //       },
        //     ],
        //     attributes: {
        //       searchable: 'true',
        //       multiple: 'true',
        //       // appendTo: 'body',
        //       bindValueOp: 'value',
        //       bindLabelOp: 'label',
        //     },
        //   },
        // },

        // {
        //   key: 'estadoGeneralId',
        //   type: 'radio',
        //   className: 'col-6',
        //   templateOptions: {
        //     label: 'ESTADO',
        //     required: true,
        //     options: [
        //       {
        //         value: 1,
        //         label: 'Servicio',
        //       },
        //       {
        //         value: 2,
        //         label: 'Radicado',
        //       },
        //       {
        //         value: 3,
        //         label: 'Irrecuperable',
        //       },
        //     ],
        //   },
        // },

        {
          key: 'estadoGeneralId',
          type: 'dropdown-input',
          className: 'col-6',
          templateOptions: {
            label: 'ESTADO',
            required: true,
            options: [
              {
                value: 1,
                label: 'Servicio',
              },
              {
                value: 2,
                label: 'Radicado',
              },
              {
                value: 3,
                label: 'Irrecuperable',
              },
            ],
            attributes: {
              searchable: 'true',
              multiple: 'true',
              appendTo: 'body',
              bindValueOp: 'value',
              bindLabelOp: 'label',
            },
          },
        },

        {
          key: 'ministerioId',
          type: 'dropdown-input',
          className: 'col-6',
          templateOptions: {
            label: 'TIPO',
            required: true,
            options: [
              {
                value: 1,
                label: '  MINISTERIO',
              },
              {
                value: 2,
                label: 'COMODATO',
              },
              {
                value: 3,
                label: 'FORTALECIMIENTO',
              },
            ],
            attributes: {
              searchable: 'true',
              multiple: 'true',
              appendTo: 'body',
              bindValueOp: 'value',
              bindLabelOp: 'label',
            },
          },
        },

        // {
        //   key: 'ministerioId',
        //   type: 'radio',
        //   className: 'col-12',
        //   templateOptions: {
        //     required: false,
        //     options: [
        //       {
        //         value: 1,
        //         label: '  MINISTERIO',
        //       },
        //       {
        //         value: 2,
        //         label: 'COMODATO',
        //       },
        //       {
        //         value: 3,
        //         label: 'FORTALECIMIENTO',
        //       },
        //     ],
        //   },
        // },

        {
          key: 'dependencia',
          className: 'col-12',
          type: 'textarea',
          templateOptions: {
            label: 'DEPENDENCIA',
            rows: 1,
          },
        },

        {
          key: 'marca',
          className: 'col-6',
          type: 'input',
          templateOptions: {
            label: 'MARCA',
          },
        },

        {
          key: 'modelo',
          className: 'col-6',
          type: 'input',
          templateOptions: {
            label: 'MODELO',
          },
        },

        {
          key: 'anio',
          className: 'col-4',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'AÑO',
          },
        },

        {
          key: 'km',
          className: 'col-4',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'KM',
          },
        },

        {
          key: 'dominio',
          className: 'col-4',
          type: 'input',
          templateOptions: {
            label: 'DOMINIO',
          },
        },

        {
          key: 'avlId',
          type: 'radio',
          className: 'col-3',
          templateOptions: {
            label: 'AVL',
            required: false,
            options: [
              {
                value: 1,
                label: 'SI',
              },
              {
                value: 2,
                label: 'NO',
              },
            ],
          },
        },

        {
          key: 'tipoId',
          type: 'radio',
          className: 'col-3',
          templateOptions: {
            label: 'TIPO',
            required: false,
            options: [
              {
                value: 1,
                label: '4x2',
              },
              {
                value: 2,
                label: '4x4',
              },
            ],
          },
        },
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
                      headerName: 'PARTE EXTERNA',
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
                      headerName: 'ESTADO',
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
                      headerName: 'OBSERVACIONES',
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
        {
          key: 'observacionesGlobal',
          className: 'col-12',
          type: 'textarea',
          templateOptions: {
            label: 'OBSERVACIONES',
            rows: 4,
          },
        },
      ],
    },
  ],
};
