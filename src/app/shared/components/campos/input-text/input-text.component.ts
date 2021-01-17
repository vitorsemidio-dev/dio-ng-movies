import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { ValidarCamposService } from './../validar-campos.service';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent {
  @Input() titulo: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;

  constructor(private validarCamposService: ValidarCamposService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  validarCampo(control: AbstractControl, errorName: string) {
    return this.validarCamposService.hasErrorValidation(control, errorName);
  }
}
