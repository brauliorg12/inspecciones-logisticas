import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { ActionBtnTypeEnum } from './action-btn-type-enum';
import { ButtonStyles } from '../../../../button/button.component';

export interface ActionBtnTemplateOptions extends FormlyTemplateOptions {  
  btnType: ActionBtnTypeEnum;
  text?: string;
  classes?: ButtonStyles[];
  parentGroup?: string | ((field: FormlyFieldConfig) => FormlyFieldConfig);
  disableIfInvalid?: boolean;
  actionFn: actionBtnFn;
}

export type actionBtnFn = (model?: any) => any;