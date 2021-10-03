import { FormlyTemplateOptions } from '@ngx-formly/core';
import { MascaraComponenteTipoIdEnum } from '../enums/mascara-componente-tipo-id-enum';

export interface MascaraWrapperTemplateOptions extends FormlyTemplateOptions {
  componenteTipo: MascaraComponenteTipoIdEnum;
}
