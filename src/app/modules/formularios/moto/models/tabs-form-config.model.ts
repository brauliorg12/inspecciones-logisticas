import { IAgFormlyConfig } from '@shared/components/ag-formly/models/ag-formly-config.model';
import { NestedFormTemplateOptions } from '@shared/components/ag-formly/custom-inputs/nested-form-wrapper/models/nested-form-template-options';
import { mockMotosTableModelParteExternaBase } from '../../../../models/motos-table-model';
import { DropdownCellRendererComponent } from '@shared/components/ag-table/custom-cell/dropdown-cell-editor/dropdown-cell-renderer.component';
import { DropdownCellEditorComponent } from '@shared/components/ag-table/custom-cell/dropdown-cell-editor/dropdown-cell-editor.component';

const setDefault = () => {
  // Funcion para limpiar por defecto la tabla
  console.log(mockMotosTableModelParteExternaBase);

  return mockMotosTableModelParteExternaBase;
};

export const getEstados = (): any => {
  const result: any[] = [
    { id: 1, value: 'Bueno' },
    { id: 2, value: 'Regular' },
    { id: 3, value: 'Malo' },
  ];
  return result;
};

export const tabsFormConfig: IAgFormlyConfig = {
  // submitButton: {
  //   text: 'Guardar',
  //   position: 'bottom',
  // },
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
          key: 'movilRoId',
          type: 'radio',
          className: 'col-6',
          templateOptions: {
            label: 'MOVIL R.O./O.I.',
            required: false,
            options: [
              {
                value: 1,
                label: 'Auto/Camioneta',
              },
              {
                value: 2,
                label: 'Moto',
              },
            ],
          },
        },
        {
          key: 'movilRoId',
          type: 'dropdown-input',
          className: 'col-6',
          templateOptions: {
            label: 'MOVIL R.O./O.I.',
            required: false,
            options: [
              {
                value: 1,
                label: 'Auto/Camioneta',
              },
              {
                value: 2,
                label: 'Moto',
              },
            ],
            attributes: {
              searchable: 'true',
              multiple: 'true',
              // appendTo: 'body',
              bindValueOp: 'value',
              bindLabelOp: 'label',
            },
          },
        },

        {
          key: 'estadoGeneralId',
          type: 'radio',
          className: 'col-6',
          templateOptions: {
            label: 'ESTADO',
            required: false,
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
          },
        },

        {
          key: 'estadoGeneralId',
          type: 'dropdown-input',
          className: 'col-6',
          templateOptions: {
            label: 'ESTADO',
            required: false,
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
          type: 'radio',
          className: 'col-6',
          templateOptions: {
            required: false,
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
                value: 2,
                label: 'FORTALECIMIENTO',
              },
            ],
          },
        },

        {
          key: 'dependencia',
          className: 'col-6',
          type: 'input',
          templateOptions: {
            label: 'DEPENDENCIA',
          },
        },

        {
          key: 'avlId',
          type: 'radio',
          className: 'col-6',
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
          key: 'marca',
          className: 'col-4',
          type: 'input',
          templateOptions: {
            label: 'MARCA',
          },
        },

        {
          key: 'modelo',
          className: 'col-4',
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
          key: 'tipoId',
          type: 'radio',
          className: 'col-6',
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
          wrappers: ['nested-form'],
          templateOptions: {
            label: 'Resultados Formulario',
            required: false,
            submitText: 'Guardar',
            nestedFormSubmit: (model, field) =>
              (field.parent.model.resultados.datosTabla = setDefault()),
          } as NestedFormTemplateOptions,
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
                  pagination: true,
                  paginationPageSize: 5,
                  columnDefs: [
                    {
                      headerName: 'PARTE EXTERNA',
                      resizable: true,
                      sortable: true,
                      filter: true,
                      flex: 2,
                      field: 'parteExterna',
                      tooltipField: 'PARTE EXTERNA',
                      autoHeight: true,
                      minWidth: 200,
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
                      minWidth: 200,
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
                      editable: true,
                      minWidth: 200,
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
