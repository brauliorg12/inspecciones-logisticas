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
      type: 'tabs',
      fieldGroup: [
        {
          // key: 'datosPersonales',
          // modelOptions: { // ! No encontre mucho al respecto, al parecer el updateOn es un evento propio de Angular que se podria usar aca pero el debounce no se si es para el modelo entero, o cada un en particular, no sveo que hagao mucho
          //   updateOn: 'blur', // ! De todos modos hice otro debounce que encontré, y lo aplique, con link de referencia
          //   debounce: {
          //     default: 2000,
          //   },
          // },
          // expressionProperties: {
          //   'model.isvalid': (a, b, field) => {
          //     return field.formControl.valid;
          //   },
          // },
          templateOptions: {
            label: 'Info personal',
            required: false,
          },
          fieldGroupClassName: 'row',

          fieldGroup: [
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
            // Direccion usando ya el addres inputs de aca
            // {
            //   key: 'address',
            //   className: 'col-12',
            //   type: 'address-inputs',
            //   templateOptions: {
            //     // required: false, // ! Veo que no funciona, debe estar establecido en el custom
            //     // Configuraciones opcionales
            //     addressWrapper: {},
            //     addressWrapperAttributes: {
            //       // hideInput: [AddressInputs.CALLE, AddressInputs.NUMERO], // Ocultar inputs OPCIONAL ( agregue numero y el hideExpression en el address-inputs )
            //     },
            //   },
            // },

            // Number + requerido
            {
              key: 'edad',
              type: 'input',
              className: 'col-6',
              templateOptions: {
                type: 'number',
                label: 'Edad',
                required: false,
                // max: 3, // Veo que no funciona por lo que vi puede ser propio de formly el problema
                // minLength: 1
              },
            },

            // Textarea + description + rows + maxlength
            {
              key: 'bio',
              type: 'textarea',
              className: 'col-12',
              templateOptions: {
                label: 'Biografía',
                placeholder: 'Algo sobre ti',
                description: 'pequeña descripción biográfica',
                rows: 2,
                maxLength: 15,
                min: 5,
                keyup: (field: FormlyFieldConfig): void => {
                  // Chequeo con keyup si alcanzo el maxlength o no para habilitar el checkbox
                  if (
                    field?.templateOptions?.maxLength ===
                    field?.form?.get('bio')?.value?.length
                  ) {
                    // consulto si el maxlength es igual al valor del campo
                    check = 'true';
                  } else if (
                    field?.form?.get('bio')?.value?.length >
                    field?.templateOptions?.min
                  ) {
                    // luego si el valor del campo es mayor al minimo requerido
                    check = 'casi';

                    field?.parent?.fieldGroup?.forEach((resp) => {
                      if (resp) {
                        // Lo hice de este modo para seguir aprendiendo el tema de manejo de field
                        resp.form.get('checkbox_aun_mas_info').setValue(false); // saco el checked al checkbox

                        if (
                          resp.form.get('aun_mas_info') &&
                          resp.form.get('aun_mas_info').value?.length >= 1
                        ) {
                          // chequeo que exista y que tenga length
                          resp.form.get('aun_mas_info').setValue(null);
                        }
                      }
                    });
                  } else {
                    check = 'false';
                  }
                },
              },
            },

            // CheckBox chequea que existe bio
            {
              key: 'checkbox_aun_mas_info',
              type: 'checkbox',
              className: 'col-12',
              defaultValue: false,
              // expressionProperties: {
              //   // 'model.isvalid': (a, b, field) => {
              //   //   // Habilito el check
              //   //   return field.formControl.valid;
              //   // },
              //   'templateOptions.disabled': () => check !== 'true',
              //   'templateOptions.label': () => {
              //     let label_check = ''; // creo un label para pasarle segun corresponda, el valor
              //     switch (check) {
              //       case 'false':
              //         label_check = 'Sigue escribiendo para agregar algo más';
              //         // field.form.get('aun_mas_info').setValue('')
              //         break;

              //       case 'casi':
              //         label_check =
              //           'aparezco con el mínimo de caracteres y me activo igualando al maxlength :)';
              //         // field.form.get('aun_mas_info').setValue('')
              //         break;

              //       case 'true':
              //         label_check = 'Deseas agregar algo más?';
              //         break;

              //       default:
              //         break;
              //     }

              //     return label_check;
              //   },
              // },
              templateOptions: {
                label: 'Label oculto', // no creo que sea necesario agregarlo
              },
              hideExpression: (model) => {
                if (!model.bio && check === 'false') {
                  delete model.aun_mas_info; // Limpio data / ! Si esta como nested al parecer no lo toma
                  delete model.checkbox_aun_mas_info; // Elimino el true NO se si sera la manera correcta
                  return true;
                }
                return false;
              },
            },

            // Textarea que debe cumplir el bio o el checkbox, sino limpia data, ADEMAS TIENE MAXLENGTH
            {
              key: 'aun_mas_info',
              type: 'textarea',
              className: 'col-12',
              hideExpression: (model) => {
                if (!model.bio || !model.checkbox_aun_mas_info) {
                  delete model.aun_mas_info;
                  delete model.checkbox_aun_mas_info;
                  return true;
                }
                return false;
              },
              templateOptions: {
                label: 'Adicional',
                placeholder: 'Escribe algo más de ti',
                maxLength: 20,
              },
            },
          ],
        },

        {
          key: 'Intereses', // Key general del group
          wrappers: ['nested-form'], // Necesario para el nestedformsubmit
          // expressionProperties: {
          //   'templateOptions.disabled': (model, b, field) =>
          //     !field.parent.model.datosPersonales.isvalid, // aca accedemos al tabs anterior y a la variable que creamos alli (isvalid )

          //   'model.isvalid2': (a, b, field) => {
          //     return field.formControl.valid;
          //   },
          // },
          templateOptions: {
            label: 'Intereses',
          },
          fieldGroupClassName: 'row',
          fieldGroup: [
            // Dropdown de ng-select, multiple, requerido y con appendTo
            {
              key: 'deportes',
              type: 'dropdown-input',
              className: 'col-12',
              templateOptions: {
                label: 'Deporte/s',
                placeholder: 'Seleccione uno o varios deportes de su interes:',
                required: false,
                options: [
                  { id: 'F', label: 'Futbol' },
                  { id: 'B', label: 'Basket' },
                  { id: 'N', label: 'Natación' },
                  { id: 'V', label: 'Voleibol' },
                  { id: 'A', label: 'Atletismo' },
                  { id: 'C', label: 'Ciclismo' },
                ],
                attributes: {
                  searchable: 'true', // Hacerlo buscable
                  multiple: 'true', // Utilizo la seleccion multiple de ng-select
                  appendTo: 'body', // Aca agregue el appendTo como funcionalidad del modulo compartido para superponer el selector y que no quede debajo a nivel de css lo trae el propio ng-select
                  bindValueOp: 'id',
                  bindLabelOp: 'label',
                },
              },
            },

            // Aparece cuando hay valor en el campo
            {
              key: 'deportes_horas',
              type: 'dropdown-input',
              className: 'col-12',
              templateOptions: {
                label: '¿Cuántas horas le dedicas a los deportes al día?',
                required: false,
                options: [
                  { id: '1', label: '1' },
                  { id: '2', label: '2' },
                  { id: '3', label: '3' },
                  { id: '4', label: '4' },
                  { id: '5', label: '5' },
                  { id: '6', label: '6' },
                ],
                attributes: {
                  appendTo: 'body', // ! OJO se puede scrolear // Aca agregue el appendTo como funcionalidad del modulo compartido para superponer el selector y que no quede debajo a nivel de css lo trae el propio ng-select
                  bindValueOp: 'id',
                  bindLabelOp: 'label',
                },
              },
              hideExpression: (model, a, field) => {
                // Uso model y field
                if (!field.form.get('deportes').value?.length) {
                  // Consulto de otro modo la key deportes, deshabilito deportes_horas y elimino las horas
                  delete model.deportes_horas;
                  return true;
                }
                return false;
              },
            },
          ],
        },

        {
          key: 'Configuraciones', // Key general del group
          // expressionProperties: {
          //   'templateOptions.disabled': (model, b, field) =>
          //     !field.parent.model.Intereses.isvalid2, // aca accedemos al tabs Intereses y a la variable que creamos alli (isvalid )

          //   'model.isvalid3': (a, b, field) => {
          //     return field.formControl.valid;
          //   },
          // },
          templateOptions: {
            label: 'Configuraciones',
            // submitText: 'Submit Tab 3', // ! Se duplico el submit text y el boton en este tab, preguntarle a Aly
            // nestedFormSubmit: model => alert('Tab 3 submit: ' + JSON.stringify(model)),
          },
          fieldGroupClassName: 'row',
          fieldGroup: [
            // Selector Dropdown, le estoy pasando los valores estaticos pero tambien se como pasarlo dinamico
            {
              key: 'servidores',
              type: 'dropdown-input',
              className: 'col-5',
              expressionProperties: {
                'templateOptions.options':
                  'formState.dataOptionsDropdown.servidores.options', // valores dropdown
              },
              templateOptions: {
                placeholder: 'Seleccione un servidor',
                label: 'Servidores',
                required: false,
                attributes: {
                  searchable: 'true',
                  clearable: 'true', // Habilita limpiar el input // ! Lo saque de la doc
                  bindLabelOp: 'descripcion', // Para mostrar la descripcion definida en servidores.options
                },
              },
            },

            // Campo de IP requerido, al cual se bluera cuando selecciona un servidor del key servidores
            {
              key: 'ip',
              type: 'input',
              className: 'col-7',
              defaultValue: '192.168.1.1', // Valor por defecto
              templateOptions: {
                label: 'Dirección IP del Servidor',
                pattern: /(\d{1,3}\.){3}\d{1,3}/,
                required: false,
              },
              validation: {
                // Uso la validacion en este caso como en la doc, uso pattern
                messages: {
                  pattern: (error, field: FormlyFieldConfig) =>
                    `"${field.formControl.value}" No es una IP Válida`,
                },
              },
            },
          ],
        },

        {
          key: 'Mascotas', // Key general del group
          // expressionProperties: {
          //   'templateOptions.disabled': (model, b, field) =>
          //     !field.parent.model.Configuraciones.isvalid3, // aca accedemos al tabs anterior y a la variable que creamos alli (isvalid )
          // },
          templateOptions: {
            label: 'Mascotas',
            showSubmit: false,
          },
          fieldGroupClassName: 'row',
          fieldGroup: [
            // Reapet
            {
              key: 'mascota_extras',
              type: 'repeat-section', // Custom input
              templateOptions: {
                addText: 'Agregar Mascota', // Texto del botón agregar
                removeText: 'Eliminar', // Texto del botón eliminar
              },
              fieldArray: {
                // Define que la propiedad "investments" será un array en el model
                fieldGroupClassName: 'row', // Clase del contenedor de inputs
                fieldGroup: [
                  {
                    className: 'col-4',
                    type: 'input',
                    key: 'nombre_mascota',
                    templateOptions: {
                      label: 'Nombre',
                      placeholder: 'Nombre de la mascota',
                    },
                  },
                  {
                    type: 'input',
                    key: 'birthday_mascota',
                    className: 'col-4',
                    templateOptions: {
                      type: 'date',
                      label: 'Fecha de nacimiento',
                    }, // Para colocarle un minimo y maximo de fecha, creo que con date no se puede, deberia ser con datepicker
                  },
                  {
                    type: 'input',
                    key: 'tipo_mascota',
                    className: 'col-4',
                    templateOptions: {
                      label: 'Especie/Tipo',
                      placeholder: 'Ej: gato, perro, etc',
                    },
                  },
                ],
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
