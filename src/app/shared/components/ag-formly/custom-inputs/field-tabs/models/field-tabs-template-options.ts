import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';

export interface FieldTabsTemplateOptions extends FormlyTemplateOptions {
  showSubmit?: boolean;
  submitText?: string;
  iconRequired?: (field: FormlyFieldConfig) => boolean;
}
