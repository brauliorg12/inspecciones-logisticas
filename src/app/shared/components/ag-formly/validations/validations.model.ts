import { FormControl } from '@angular/forms';
import { ValidatorOption } from '@ngx-formly/core/lib/services/formly.config';

export const validations: ValidatorOption[] = [
  {
    name: 'ip',
    validation: (control: FormControl) =>
      /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { ip: true },
  },
  {
    name: 'cuit',
    validation: (control: FormControl) =>
      /^null$|^undefined$|^$|^(20|23|24|27|30|33|34)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g.test(
        control.value
      )
        ? null
        : { cuit: true },
  },
  {
    name: 'cuil',
    validation: (control: FormControl) =>
      /^(20|23|24|25|26|27)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g.test(control.value)
        ? null
        : { cuil: true },
  },
  {
    name: 'cuilnull',
    validation: (control: FormControl) =>
      /^null$|^undefined$|^$|^(20|23|24|25|26|27)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g.test(
        control.value
      )
        ? null
        : { cuilnull: true },
  },
  {
    name: 'string',
    validation: (control: FormControl) =>
      /[a-zA-Z ]{2,254}$/g.test(control.value) ? null : { cuil: true },
  },
];
