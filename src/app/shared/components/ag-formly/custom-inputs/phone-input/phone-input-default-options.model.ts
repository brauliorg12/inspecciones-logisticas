import { FormlyFieldConfig } from '@ngx-formly/core';

export const PhoneInputDefaulOptions: FormlyFieldConfig = {
  fieldGroupClassName: 'row',
  fieldGroup: [
    {
      className: 'col-12 label',
      template: '<p>N° de Teléfono</p>',
    },
    {
      key: 'prefijoPais',
      type: 'input',
      className: 'col-3',
      templateOptions: {
        label: '',
        placeholder: 'País',
        type: 'number',
      },
    },
    {
      key: 'prefijoZona',
      type: 'input',
      className: 'col-3',
      templateOptions: {
        label: '',
        placeholder: 'Zona',
        type: 'number',
      },
    },
    {
      key: 'numeroTelefono',
      type: 'input',
      className: 'col-6',
      templateOptions: {
        label: '',
        placeholder: 'Número',
        type: 'number',
      },
    },
  ],
};
