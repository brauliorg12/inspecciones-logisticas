import { AddressInputs } from './enums/address-inputs.enum';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { of } from 'rxjs';

/**
 * Obtener propiedad custom de addressWrapperAttributes
 */
function setAttribute(field: FormlyFieldConfig, property, def) {
  let value = null;
  try {
    value =
      field.parent.templateOptions.addressWrapperAttributes[<string>field.key][
        property
      ];
  } finally {
    return value ? value : def;
  }
}

/**
 * Chequear si el input esta en la lista addressWrapperAttributes.hideInput
 */
function checkHideField(field?: FormlyFieldConfig, key = field.key) {
  return (
    field.parent.templateOptions.addressWrapperAttributes?.hideInput?.indexOf(
      key
    ) > -1
  );
}

export const AddressInputDefaulOptions: FormlyFieldConfig = {
  fieldGroupClassName: 'row',
  wrappers: ['address'],
  fieldGroup: [
    {
      className: 'col-12 label',
      template: '<p>Domicilio</p>',
    },
    {
      key: 'provincia',
      type: 'dropdown-input',
      className: 'col-3',
      hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) =>
        checkHideField(field),
      expressionProperties: {
        'templateOptions.options':
          'formState.addressWrapper?.dataOptionsDropdown.provincias.options.provincias',

        // Setear funcion utilizada para obtener la lista de LOCALIDADES cuando cambie la PROVINCIA
        'templateOptions.afterChange':
          'formState.addressWrapper ? () => formState.addressWrapper.getLocalidadesOptions(model) : null',

        // Setear atributos segun inputs en addressWrapperAttributes
        'templateOptions.attributes.bindLabelOp': (
          model: any,
          formState: any,
          field?: FormlyFieldConfig
        ) =>
          setAttribute(
            field,
            'bindLabelOp',
            field.templateOptions.attributes.bindLabelOp
          ),
        'templateOptions.attributes.bindValueOp': (
          model: any,
          formState: any,
          field?: FormlyFieldConfig
        ) =>
          setAttribute(
            field,
            'bindValueOp',
            field.templateOptions.attributes.bindValueOp
          ),
        'templateOptions.required': (
          model: any,
          formState: any,
          field?: FormlyFieldConfig
        ) =>
          setAttribute(
            field,
            'required',
            field.templateOptions.attributes.required
          ),
        className: (model: any, formState: any, field?: FormlyFieldConfig) =>
          setAttribute(field, 'className', field.className),
      },
      templateOptions: {
        required: true,
        placeholder: 'Provincia',
        change: (field: FormlyFieldConfig, event?: any) => {
          // Guardar objeto seleccionado en valueProvincia
          field.model.valueProvincia = event;
          field.templateOptions.afterChange();
        },
        attributes: {
          bindLabelOp: 'nombre',
          bindValueOp: 'nombre',
          searchable: 'true',
        },
      },
    },
    {
      key: 'localidad',
      type: 'autocomplete',
      className: 'col-3',
      hideExpression: (model: any, formState: any, field?: FormlyFieldConfig) =>
        checkHideField(field) || checkHideField(field, AddressInputs.PROVINCIA),
      expressionProperties: {
        'templateOptions.options':
          'formState.addressWrapper?.dataOptionsDropdown.localidades.options.localidades',

        // Setear atributos segun inputs en addressWrapperAttributes
        'templateOptions.filter': (
          model: any,
          formState: any,
          field?: FormlyFieldConfig
        ) => setAttribute(field, 'filter', field.templateOptions.filter),
        className: (model: any, formState: any, field?: FormlyFieldConfig) =>
          setAttribute(field, 'className', field.className),
      },
      templateOptions: {
        placeholder: 'Localidad',
        change: (field: FormlyFieldConfig, event?: any) => {
          // Guardar objeto seleccionado en valueLocalidad
          field.model.valueLocalidad = event;
        },
      },
    },
    {
      key: 'calle',
      type: 'autocomplete',
      className: 'col-4',
      expressionProperties: {
        'templateOptions.options':
          'formState.dataOptionsDropdown?.calles?.options',
        // Setear atributos segun inputs en addressWrapperAttributes
        'templateOptions.filter': (
          model: any,
          formState: any,
          field?: FormlyFieldConfig
        ) => setAttribute(field, 'filter', field.templateOptions.filter),
        className: (model: any, formState: any, field?: FormlyFieldConfig) =>
          setAttribute(field, 'className', field.className),
      },
      templateOptions: {
        placeholder: 'Calle',
        change: (field: FormlyFieldConfig, event?: any) => {
          // Guardar objeto seleccionado en valueCalle
          field.model.valueCalle = event;
        },
      },
    },
    {
      key: 'numero',
      type: 'input',
      className: 'col-2',
      expressionProperties: {
        className: (model: any, formState: any, field?: FormlyFieldConfig) =>
          setAttribute(field, 'className', field.className),
      },
      templateOptions: {
        placeholder: 'Número',
      },
    },
  ],
};
