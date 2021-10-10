import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { environment } from 'src/environments/environment';
import { IFormState, IAgFormlyConfig } from '@shared/components/ag-formly/models/ag-formly-config.model';


export class AgGridFormlyConfig implements IAgFormlyConfig {

    public fields: FormlyFieldConfig[];
    public model ? : any;
    public submit ? : (values: any, options?: FormlyFormOptions) => void;
    public configs ? : {
        resetWhenSubmit ? : boolean | string[];
    };
    public submitButton ? : {
        text ? : string;position ? : string;class ? : string;
    };
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
                templateOptions: {
                    required: true,
                },
            },
            {
                key: 'digitoMatricula',
                hideExpression: hideFolioReal,
                type: 'input',
                templateOptions: {
                    maxLength: 3
                },
            },
        ];

        const fieldsFormTomoCronologico: FormlyFieldConfig[] = [
            {
                key: 'tomo',
                hideExpression: hideTomoCronologico,
                type: 'input',
                templateOptions: {
                    min: 0,
                    required: true,
                    type: 'number',
                },
            },
            {
                key: 'folio',
                hideExpression: hideTomoCronologico,
                type: 'input',
                templateOptions: {
                    min: 0,
                    required: true,
                    type: 'number',
                },
            },
            {
                key: 'finca',
                hideExpression: hideTomoCronologico,
                type: 'input',
                templateOptions: {
                    min: 0,
                    required: true,
                    type: 'number',
                },
            },
        ];

        const commonFields: FormlyFieldConfig[] = [
            {
                key: 'planoTomo',
                type: 'input',
                templateOptions: {
                    min: 0,
                    placeholder: 'Tomo',
                    type: 'number',
                },
            },
            {
                key: 'planoFolio',
                type: 'input',
                templateOptions: {
                    min: 0,
                    placeholder: 'Folio',
                    type: 'number',
                },
            },
            {
                key: 'lote',
                type: 'input',
                templateOptions: {
                    min: 0,
                    type: 'number',
                },
            },
            {
                key: 'manzana',
                type: 'input',
                templateOptions: {
                    min: 0,
                    type: 'number',
                },
            },
        ];


        this.formState = {
            dataOptionsDropdown: {
                departamentos: {
                    url: `${environment.basepath}/`,
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
              }
            ],
        };
        
        this.fields = [
            {
                key: 'datosInmuebles',
                type: 'grid',
                className: '',
                templateOptions: {
                    height: '200px',
                    gridOptions: {
                        rowHeight: 42,
                        columnDefs: [{
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
                        agTableConfig: {
                            pagination: true,
                            paginationPageSize: 5
                        }
                    },
                },
                fieldArray: {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                        {
                            key: 'tipoDocInmueblesId',
                            type: 'dropdown-input',
                            defaultValue: 1,
                            templateOptions: {
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
                            expressionProperties: {
                                'templateOptions.options': 'formState.dataOptionsDropdown.departamentos.options',
                            },
                            templateOptions: {
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