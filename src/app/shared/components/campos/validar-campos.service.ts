import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidarCamposService {
  constructor() {}

  hasError(control: AbstractControl, errorName: string): boolean {
    return control.hasError(errorName);
  }

  hasErrorValidation(control: AbstractControl, errorName: string): boolean {
    return (
      (control.dirty || control.touched) && this.hasError(control, errorName)
    );
  }
}
