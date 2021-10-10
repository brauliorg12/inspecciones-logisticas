import { FormlyFieldConfig } from '@ngx-formly/core';
import { IAgFormlyConfig, IFormState } from '@shared/components/ag-formly/models/ag-formly-config.model';
import { environment } from '@environments/environment';


export class RepeatingSectionConfig implements IAgFormlyConfig {

    public fields: FormlyFieldConfig[];
    public model?: any;
    public submit?: (values: any) => void;
    public configs?: { resetWhenSubmit?: boolean | string[]; };
    public submitButton?: { text?: string; position?: string; class?: string; };
    public formState: IFormState;

    constructor() {
        this.setFormConfig();
    }

    setFormConfig() {
        const hideTomoCronologico = 'model.tipoDocInmueblesId != 1';
        const hideFolioReal = 'model.tipoDocInmueblesId != 2';

        const fieldsFormFolioReal: FormlyFieldConfig[] = [
            {
                key: 'matricula',
                hideExpression: hideFolioReal,
                type: 'input',
                className: 'col-3',
                templateOptions: {
                    required: true,
                    label: 'Matrícula',
                },
            },
            {
                key: 'digitoMatricula',
                hideExpression: hideFolioReal,
                type: 'input',
                className: 'col-2',
                templateOptions: {
                    label: 'Dig. Matr.',
                    maxLength: 3
                },
            },
        ];

        const fieldsFormTomoCronologico: FormlyFieldConfig[] = [
            {
                key: 'tomo',
                hideExpression: hideTomoCronologico,
                type: 'input',
                className: 'col-2',
                templateOptions: {
                    min: 0,
                    required: true,
                    type: 'number',
                    label: 'Tomo',
                },
            },
            {
                key: 'folio',
                hideExpression: hideTomoCronologico,
                type: 'input',
                className: 'col-2',
                templateOptions: {
                    min: 0,
                    required: true,
                    type: 'number',
                    label: 'Folio',
                },
            },
            {
                key: 'finca',
                hideExpression: hideTomoCronologico,
                type: 'input',
                className: 'col-2',
                templateOptions: {
                    min: 0,
                    required: true,
                    type: 'number',
                    label: 'Finca',
                },
            },
        ];

        const commonFields: FormlyFieldConfig[] = [
            {
                key: 'planoTomo',
                type: 'input',
                className: 'col-2',
                templateOptions: {
                    min: 0,
                    //required: true,
                    label: 'Plano Catastral',
                    placeholder: 'Tomo',
                    type: 'number',
                },
            },
            {
                key: 'planoFolio',
                wrappers: ['no-label'],
                type: 'input',
                className: 'col-2',
                templateOptions: {
                    min: 0,
                    //required: true,
                    label: '*',
                    placeholder: 'Folio',
                    type: 'number',
                },
            },
            {
                key: 'lote',
                type: 'input',
                className: 'col-4',
                templateOptions: {
                    min: 0,
                    //required: true,
                    label: 'Lote N°',
                    type: 'number',
                },
            },
            {
                key: 'manzana',
                type: 'input',
                className: 'col-4',
                templateOptions: {
                    min: 0,
                    //required: true,
                    label: 'Manzana N°',
                    type: 'number',
                },
            },
        ];

        this.formState = {
            dataOptionsDropdown: {
                departamentos: {
                    url: `${environment.basepath}/${environment.basepath}`,
                    options: []
                },
            },
        }

        this.submitButton = {
            text: 'Continuar',
            position: 'bottom',
        };

        this.model = {
            datosInmuebles: [
              {
                departamentoValor: "APOSTOLES",
                finca: 2,
                folio: 2,
                lote: 2,
                manzana: 2,
                planoFolio: 2,
                planoTomo: 2,
                pubDepartamentosId: 1,
                tipoDocInmueblesId: 1,
                tomo: 2,
              },
              /*
              {
                departamentoValor: "APOSTOLES",
                finca: 2,
                folio: 2,
                lote: 2,
                manzana: 2,
                planoFolio: 2,
                planoTomo: 2,
                pubDepartamentosId: 1,
                tipoDocInmueblesId: 1,
                tomo: 2,
              }
              */
            ],
        };

        this.fields = [
            /*{
                key: 'tabla',
                type: 'render-table',
                templateOptions: {
                    change: (control) => { console.log('ASDASD'); },
                    gridOptions: {
                        columnDefs: [
                            {
                                headerName: 'Departamento',
                                field: 'pubDepartamentosId',
                                sortable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Tomo',
                                field: 'tomo',
                                sortable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Folio',
                                field: 'folio',
                                flex: 1,
                            },
                        ],
                        onModelChange: ev => {
                            console.log(ev);
                        }
                    },
                }
            },*/
            {
                key: 'datosInmuebles',
                type: 'repeat-section',
                wrappers: ['render-table'],
                templateOptions: {
                    addText: 'Agregar inmueble',
                    removeText: 'Eliminar',
                    //showOnlyLast: true,
                    gridOptions: {
                        columnDefs: [
                            {
                                headerName: 'Departamento',
                                field: 'pubDepartamentosId',
                                sortable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Tomo',
                                field: 'tomo',
                                sortable: true,
                                flex: 1,
                            },
                            {
                                headerName: 'Folio',
                                field: 'folio',
                                flex: 1,
                            },
                        ],
                        onModelChange: ev => {
                            console.log(ev);
                        }
                    },
                },
                fieldArray: {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                        {
                            key: 'tipoDocInmueblesId',
                            type: 'dropdown-input',
                            className: 'col-3',
                            defaultValue: 1,
                            templateOptions: {
                                label: 'Tipo',
                                required: true,
                                options: [
                                    { id: 1, label: 'Tomo cronológico' },
                                    { id: 2, label: 'Folio real' },
                                ],
                                attributes: {
                                    bindValueOp: 'id',
                                    bindLabelOp: 'label',
                                }
                            },
                        },
                        {
                            key: 'pubDepartamentosId',
                            type: 'dropdown-input',
                            className: 'col-3',
                            expressionProperties: {
                                'templateOptions.options': 'formState.dataOptionsDropdown.departamentos.options',
                                'className': `${hideFolioReal} ? 'col-3' : 'col-4'`
                            },
                            templateOptions: {
                                label: 'Departamento',
                                required: true,
                                options: [],
                                optionsEndpoint: '',
                                change: (field, value) => { field.model.departamentoValor = value.valor; },
                                attributes: {
                                    searchable: 'true',
                                    bindValueOp: 'id',
                                    bindLabelOp: 'valor',
                                }
                            },
                        },
                        ...fieldsFormTomoCronologico,
                        ...fieldsFormFolioReal,
                        ...commonFields,
                    ],
                },
            },
            {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        key: 'justificacion',
                        type: 'textarea',
                        className: 'col-12',
                        templateOptions: {
                            required: true,
                            label: 'Justificación',
                            rows: 2,
                        },
                    },
                    {
                        key: 'pubPrioridadesId',
                        type: 'dropdown-input',
                        className: 'col-3',
                        templateOptions: {
                            required: true,
                            label: 'Prioridad',
                            attributes: {
                                bindValueOp: 'id',
                                bindLabelOp: 'valor',
                            },
                            options: [
                                { id: 1, valor: 'Normal' },
                                { id: 2, valor: 'Urgente' },
                            ],
                        },
                    }
                ]
            },
        ];
    }
}
