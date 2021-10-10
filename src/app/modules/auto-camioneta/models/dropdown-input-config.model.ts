import { IAgFormlyConfig } from '@shared/components/ag-formly/models/ag-formly-config.model';
import { DataOptionDropdownMethods } from '@shared/components/ag-formly/models/ag-formly-config.model';


export const dropdownInputConfigFormData: IAgFormlyConfig = {
    formState: {
        // Datos de consulta para la obtencion de opciones para un dropdown-input a traves de un servicio http
        dataOptionsDropdown: {
            departamentos: {
                url: ``, // Endpoint donde se obtendran las opciones mediante http request
                options: [],
                method: DataOptionDropdownMethods.GET, // Metodo de http request
                requestBody: {}, // Body request http
            },
            documentos: {
                url: ``,
                options: [],
                method: DataOptionDropdownMethods.GET,
                requestBody: {},
            },
        }
    },
    submitButton: {
        text: 'Continuar',
        position: 'bottom',
    },
    model: {
        tipo: 1,
        address: {}
    },
    fields: [
        {
            key: 'tipo',
            type: 'dropdown-input', // Custom Dropdown 
            templateOptions: {
                label: 'Tipo',
                required: true,
                options: [ // Opciones estáticas del dropdown
                    { id: 1, label: 'Departamento' },
                    { id: 2, label: 'Documento' },
                ],
                attributes: {
                    bindValueOp: 'id', // Valor que quedara guardado en el model al seleccionar ('id' es el valor por defecto)
                    bindLabelOp: 'label', // Texto que mostrara el option  ('label' es el valor por defecto)
                }
            },
        },
        {
            key: 'departamento',
            type: 'dropdown-input',
            hideExpression: 'model.tipo != 1', // Expresion que define si un campo se oculta
            expressionProperties: {
                // Las opciones se cargaran desde el formState
                'templateOptions.options': 'formState.dataOptionsDropdown.departamentos.options',
            },
            templateOptions: {
                label: 'Departamento',
                options: [],
                description: 'Este input se habilitará solo cuando se seleccione el option tipo = Departamento',
                attributes: {
                    searchable: 'true', // Habilita la busqueda y autocompletado
                    clearable: 'true', // Habilita limpiar el input
                    bindValueOp: 'id',
                    bindLabelOp: 'valor',
                }
            },
        },
        {
            key: 'documento',
            type: 'dropdown-input',
            hideExpression: 'model.tipo != 2', // Expresion que define si un campo se oculta
            expressionProperties: {
                // Las opciones se cargaran desde el formState
                'templateOptions.options': 'formState.dataOptionsDropdown.documentos.options',
            },
            templateOptions: {
                label: 'Documento',
                options: [],
                description: 'Este input se habilitará solo cuando se seleccione el option tipo = Documento',
                attributes: {
                    searchable: 'true', // Habilita la busqueda y autocompletado
                    multiple: 'true', // Habilita seleccion multiple
                    bindValueOp: 'id',
                    bindLabelOp: 'valor',
                }
            },
        },
        // {
        //     key: 'address',
        //     type: 'address-inputs',
        //     templateOptions: {
        //         addressWrapperAttributes: {
        //             hideInput: [], // AddressInputs.PROVINCIA
        //             provincia: {
        //                 bindValueOp: 'id',
        //                 bindLabelOp: 'nombre',
        //                 // className: 'col-5',
        //             },
        //             localidad: {
        //                 bindValueOp: 'id',
        //                 bindLabelOp: 'nombre',
        //             },
        //             calle: {
        //                 bindValueOp: 'nomenclatura',
        //                 bindLabelOp: 'nomenclatura',
        //             },
        //         }
        //     }
        // }
    ],
};