import { AbstractControl } from '@angular/forms';

export function UrlValidator(control: AbstractControl) {
  if (!control?.value?.startsWith('https://')) {
    return { invalidUrl: true };
  }
  return null;
}
