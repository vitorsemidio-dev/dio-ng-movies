import { ValidarCamposService } from './../validar-campos.service';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent implements OnInit {
  @Input() titulo: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;

  constructor(private validarCamposService: ValidarCamposService) {}

  ngOnInit() {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  validarCampo(control: AbstractControl, errorName: string) {
    return this.validarCamposService.hasErrorValidation(control, errorName);
  }
}
