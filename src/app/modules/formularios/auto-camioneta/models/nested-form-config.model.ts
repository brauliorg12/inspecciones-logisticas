import { FormlyFieldConfig } from '@ngx-formly/core';
import { IAgFormlyConfig, IFormState } from '@shared/components/ag-formly/models/ag-formly-config.model';
import { NestedFormTemplateOptions } from '@shared/components/ag-formly/custom-inputs/nested-form-wrapper/models/nested-form-template-options';


export class NestedFormConfig implements IAgFormlyConfig {

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
        this.submitButton = {
            text: 'Continuar',
            position: 'bottom',
        };

        this.model = {};

        this.fields = [
            {
                key: 'datosPersonales',
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        key: 'nombre',
                        type: 'input',
                        className: 'col-6',
                        templateOptions: {
                            label: 'Nombre',
                            required: true,
                            type: 'text',
                        },
                    },
                    {
                        key: 'apellido',
                        type: 'input',
                        className: 'col-6',
                        templateOptions: {
                            label: 'Apellido',
                            required: true,
                            type: 'text',
                        },
                    }
                ]
            },
            {
                key: 'datosDomicilio',
                wrappers: ['nested-form'],
                templateOptions: {
                    title: 'Datos Domicilio',
                    submitText: 'Validar dirección',
                    nestedFormSubmit: model => console.log('Nested submit: ', model),
                } as NestedFormTemplateOptions,
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        key: 'direccion',
                        type: 'input',
                        className: 'col-6',
                        templateOptions: {
                            label: 'Direccion',
                            required: true,
                        },
                    },
                    {
                        key: 'localidad',
                        type: 'input',
                        className: 'col-3',
                        templateOptions: {
                            label: 'Localidad',
                            required: true,
                        },
                    },
                    {
                        key: 'Provincia',
                        type: 'dropdown-input',
                        className: 'col-3',
                        templateOptions: {
                            label: 'Provincia',
                            required: true,
                            options: [
                                { id: 1, label: 'Buenos Aires' }
                            ]
                        },
                    }
                ]
            }
        ];
    }
}

