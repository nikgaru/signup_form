import { AbstractControl } from '@angular/forms'

export function emailValidator(control: AbstractControl) {
  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (regex.test(control.value)) {
    return null;
  }
  return { validPattern: true };
}
