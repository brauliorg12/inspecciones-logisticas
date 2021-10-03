import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
export interface IAgFormlyConfig {
  /** Configuración de campos para construir el formulario */
  fields: FormlyFieldConfig[];
  /** Variables y funciones custom que modifiquen el comportamiento del formulario */
  formState?: IFormState;
  options?: FormlyFormOptions;
  /** Modelo que sera representado en el formulario */
  model?: any;
  /** TODO: ? */
  clase?: any;
  /** Funcion que se ejecutará al submitear el formulario, solo si el formulario es valido */
  submit?: (values: any, options?: FormlyFormOptions) => any;
  /** Estilos custom que se aplican al tag formly-form */
  formStyles?: any;
  /** Configuraciones adicionales */
  configs?: {
    /** Resetear el formulario luego de submit */
    resetWhenSubmit?: boolean | string[];
  };
  /** Configuracion del boton submit del formulario */
  submitButton?: {
    text?: string;
    position?: string;
    class?: string;
    styles?: any;
  };
}
export interface IFormState {
  [key: string]: any;
  /** Datos de consulta para la obtencion de opciones para un dropdown a traves de un servicio http */
  dataOptionsDropdown?: {
    [key: string]: IDataOptionDropdown;
  };
  resetModelWhenSubmit?: boolean;
}
export interface IDataOptionDropdown {
  /** URL de consulta del servicio */
  url?: string;
  /** Opciones del dropdown */
  options: any[];
  /** Metodo http */
  method?: DataOptionDropdownMethods;
  /** Request body */
  requestBody?: any;
  /** Pipes a aplicar al response obtenido */
  pipes?: any[];
}

/** Metodos http disponibles para DataOptionDropdown */
export enum DataOptionDropdownMethods {
  GET = 'get',
  POST = 'post',
}
