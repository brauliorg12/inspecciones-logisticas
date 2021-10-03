import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActionBtnTemplateOptions, ActionBtnTypeEnum } from '../models';

export const defaultOptions: FormlyFieldConfig = {
  expressionProperties: {
    'templateOptions.model': 'model',
  },
  templateOptions: {
    btnType: ActionBtnTypeEnum.DEFAULT,
    type: 'button',
    disableIfInvalid: true,
  } as ActionBtnTemplateOptions,
};
