import { AbstractControl } from '@angular/forms';

export function atLeastOneUppercaseValidator(control: AbstractControl) {
  const regex = new RegExp(/[A-Z]+/g);

  if (regex.test(control.value)) return null;
  return { noUppercase: true };
}

export function atLeastOneLowercaseValidator(control: AbstractControl) {
  const regex = new RegExp(/[a-z]/);

  if (regex.test(control.value)) return null;
  return { noLowercase: true };
}

export function noNameInPasswordValidator(firstNameControl: string, lastNameControl: string, passwordControl: string) {
  return (c: AbstractControl) => {
    // @ts-ignore
    const controls = c['controls'];
    const firstName = controls[firstNameControl].value;
    const lastName = controls[lastNameControl].value;
    const password= controls[passwordControl];

    if (password.value.includes(firstName) || password.value.includes(lastName)) {
      return password.setErrors({ containsName: true });
    }
    return null
  };
}
