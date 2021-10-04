import { FormlyFieldConfig } from '@ngx-formly/core';
import { IAgFormlyConfig } from '@shared/components/ag-formly/models/ag-formly-config.model';
import { NestedFormTemplateOptions } from '@shared/components/ag-formly/custom-inputs/nested-form-wrapper/models/nested-form-template-options';
import { mockMotosTableModelParteExternaBase } from '../../../motos-table-model';

let check = 'false';
const dataTablaArray = [];

export const tabsFormConfig: IAgFormlyConfig = {
  submitButton: {
    text: 'Guardar',
    position: 'bottom',
  },
  model: {
    resultados: {
      datosTabla: setDefault(),
    },
  },
  formState: {
    resetModelWhenSubmit: true, // para resetear lo encontre aca chusmenado el codigo, para submit global, no se si nested pero en la doc veo que se puede usar el (click)="options.resetModel()" desde html

    dataOptionsDropdown: {
      // Data para dropdown
      servidores: {
        options: [
          {
            // ! Estatico
            valor: 'server_p',
            descripcion: 'Servidor Principal',
          },
          {
            valor: 'server_s',
            descripcion: 'Servidor Secundario',
          },
        ],
        // url: `https://dev-sql-sir-rpi-be.coasa.com.ar/api/v1/` + CanalesDto.endpoint // ! Por endpoint
      },
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
              searchable: 'true', // Hacerlo buscable
              multiple: 'true', // Utilizo la seleccion multiple de ng-select
              appendTo: 'body', // Aca agregue el appendTo como funcionalidad del modulo compartido para superponer el selector y que no quede debajo a nivel de css lo trae el propio ng-select
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
              searchable: 'true', // Hacerlo buscable
              multiple: 'true', // Utilizo la seleccion multiple de ng-select
              appendTo: 'body', // Aca agregue el appendTo como funcionalidad del modulo compartido para superponer el selector y que no quede debajo a nivel de css lo trae el propio ng-select
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
            // label: 'ESTADO',
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
          key: 'resultados', // Key general del group
          wrappers: ['nested-form'],
          templateOptions: {
            label: 'Resultados Formulario',
            required: false,
            showSubmit: false,
            submitText: 'LLenar Tabla',
            nestedFormSubmit: (model, field) => {
              // if (field.parent?.model?.datosPersonales) {
              //   // aca condiciono que sea valido al menos datospersonales
              //   const datatabla = {
              //     ...field.parent.model.datosPersonales,
              //     ...field.parent.model.Intereses,
              //   }; // creo un solo objeto de varios fields
              //   dataTablaArray.push(datatabla);
              //   field.parent.model.resultados.datosTabla = [
              //     ...dataTablaArray,
              //   ]; // se los paso a la tabla
              // } else {
              field.parent.model.resultados.datosTabla = setDefault(); // Limpio la data por default
              // }
            },
          } as NestedFormTemplateOptions,
          fieldGroupClassName: 'row',
          fieldGroup: [
            // Ag Grid
            {
              key: 'datosTabla',
              wrappers: ['render-table'],
              // type: 'grid',
              fieldGroup: [],
              className: 'col-12',
              // hooks: { // ! Falta averiguar como funciona solo
              //   onInit: (field: FormlyFieldConfig) => {
              //     console.log(field);

              // const formState = field.options.formState;
              // const gridOptions = field.templateOptions.gridOptions;
              // console.log(gridOptions);

              //     // gridOptions.onRowSelected = (event: RowSelectedEvent) => {
              //     //   if (formState.buscadorPersonas?.onRowSelected) formState.buscadorPersonas.onRowSelected(event, field);
              //     //   else console.info('BuscadorPersonas: se debe agregar la funcion buscadorPersonas.onRowSelected(event: RowSelectedEvent, field: FormlyFieldConfig) en el formState.');
              //     // };
              //   }
              // },
              templateOptions: {
                label: 'Resultados',
                gridOptions: {
                  rowSelection: 'single',
                  columnDefs: [
                    {
                      // Estan todos en la docs, para que sirven
                      headerName: 'PARTE EXTERNA',
                      resizable: true,
                      sortable: true,
                      // filter: true,
                      flex: 1,
                      field: 'parteExterna',
                      tooltipField: 'PARTE EXTERNA',
                      autoHeight: true,
                    },
                    {
                      headerName: 'ESTADO',
                      field: 'estado',
                      flex: 1,
                      resizable: true,
                      autoHeight: true,
                    },
                    {
                      headerName: 'OBSERVACIONES',
                      field: 'observaciones',
                      flex: 1,
                      resizable: true,
                      autoHeight: true,
                      editable: true,
                    },
                    // {
                    //   headerName: 'PARTE EXTERNA',
                    //   field: 'address.valueProvincia.nombre',
                    //   flex: 1,
                    //   resizable: true,
                    //   autoHeight: true,
                    // },
                    // {
                    //   headerName: 'ESTADO',
                    //   field: 'edad',
                    //   flex: 1,
                    //   resizable: true,
                    //   autoHeight: true,
                    // },
                    // {
                    //   headerName: 'OBSERVACIONES',
                    //   field: 'edad',
                    //   flex: 1,
                    //   resizable: true,
                    //   autoHeight: true,
                    // },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  ],

  // submitButton: {
  //     text: 'Continuar',
  //     position: 'bottom',
  // },
  // model: {},
  // fields: [
  //     {
  //         type: 'tabs',
  //         fieldGroup: [
  //             {
  //                 key: 'datosDomicilio',
  //                 wrappers: ['nested-form'],
  //                 templateOptions: {
  //                     label: 'Domicilio',
  //                     submitText: 'Validar domicilio',
  //                     nestedFormSubmit: model => console.log('Nested submit: ', model),
  //                 } as NestedFormTemplateOptions,
  //                 fieldGroupClassName: 'row',
  //                 fieldGroup: [
  //                     {
  //                         key: 'direccion',
  //                         type: 'address-inputs',
  //                         className: 'col-12',
  //                         templateOptions: {
  //                             addressWrapperAttributes: {
  //                                 provincia: {
  //                                     required: 'true'
  //                                 },
  //                                 localidad: {
  //                                     required: 'true'
  //                                 },
  //                                 calle: {
  //                                     required: 'true'
  //                                 },
  //                             }
  //                         },
  //                     },
  //                 ]
  //             },
  //             {
  //                 templateOptions: { label: 'Personal data' },
  //                 fieldGroup: [
  //                   {
  //                     key: 'firstname',
  //                     type: 'input',
  //                     templateOptions: {
  //                       label: 'First name',
  //                       required: false,
  //                     },
  //                   },
  //                   {
  //                     key: 'age',
  //                     type: 'input',
  //                     templateOptions: {
  //                       type: 'number',
  //                       label: 'Age',
  //                       required: false,
  //                     },
  //                   },
  //                 ],
  //             },
  //             {
  //                 templateOptions: { label: 'Destination' },
  //                 fieldGroup: [
  //                   {
  //                     key: 'country',
  //                     type: 'input',
  //                     templateOptions: {
  //                       label: 'Country',
  //                       required: false,
  //                     },
  //                   },
  //                 ],
  //             },
  //             {
  //                 templateOptions: { label: 'Day of the trip' },
  //                 fieldGroup: [
  //                   {
  //                     key: 'day',
  //                     type: 'input',
  //                     templateOptions: {
  //                       type: 'date',
  //                       label: 'Day of the trip',
  //                       required: false,
  //                     },
  //                   },
  //                 ],
  //             },
  //         ]
  //     }
  // ]
};

function setDefault() {
  // Funcion para limpiar por defecto la tabla
  console.log(mockMotosTableModelParteExternaBase);

  return mockMotosTableModelParteExternaBase;
  // return [
  //   {
  //     nombre: '-',
  //     edad: '-',
  //     address: {
  //       valueProvincia: {
  //         nombre: '-',
  //       },
  //       valueLocalidad: {
  //         nombre: '-',
  //       },
  //     },
  //     deportes: '-',
  //   },
  // ];
}
