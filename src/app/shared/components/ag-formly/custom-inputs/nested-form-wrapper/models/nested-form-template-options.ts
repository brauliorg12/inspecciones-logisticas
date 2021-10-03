import { AlignSubmit } from './align-submit.enum';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';

export interface NestedFormTemplateOptions extends FormlyTemplateOptions {
  alignSubmit?: AlignSubmit;
  nestedFormSubmit?: (
    model: any,
    field?: FormlyFieldConfig,
    formState?: any
  ) => any;
}
