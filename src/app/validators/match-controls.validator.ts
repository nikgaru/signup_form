import { AbstractControl } from '@angular/forms';

export function matchControlsValidator(controlName: string, matchingControlName: string) {
  return (c: AbstractControl) => {
    // @ts-ignore
    const controls = c['controls'];
    const control = controls[controlName];
    const matchingControl = controls[matchingControlName];

    if (control.value === matchingControl.value) return null;
    return matchingControl.setErrors({ mismatch: true });
  };
}
