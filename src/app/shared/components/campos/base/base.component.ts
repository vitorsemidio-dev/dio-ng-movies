import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { ValidarCamposService } from './../validar-campos.service';

@Component({
  selector: 'dio-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() label: string;

  constructor(public validarCamposService: ValidarCamposService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  validarCampo(control: AbstractControl, errorName: string) {
    return this.validarCamposService.hasErrorValidation(control, errorName);
  }
}
