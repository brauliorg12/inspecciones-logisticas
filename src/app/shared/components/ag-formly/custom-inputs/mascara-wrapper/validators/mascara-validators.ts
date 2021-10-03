import { FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MascaraComponenteTipoIdEnum } from '../enums/mascara-componente-tipo-id-enum';

export function ValidatorMascara(
  control: FormControl,
  field: FormlyFieldConfig
): boolean {
  let valid = true;
  if (!control.value || control.value === '') {
    valid = false;
  }
  if (
    field.templateOptions.componenteTipo ===
      MascaraComponenteTipoIdEnum.NUMBER &&
    isNaN(control.value)
  ) {
    valid = false;
  }
  return valid;
}
