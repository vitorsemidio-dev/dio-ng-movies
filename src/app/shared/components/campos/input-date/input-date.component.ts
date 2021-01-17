import { Component } from '@angular/core';

import { ValidarCamposService } from './../validar-campos.service';
import { BaseComponent } from './../base/base.component';

@Component({
  selector: 'dio-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent extends BaseComponent {
  constructor(public validarCamposService: ValidarCamposService) {
    super(validarCamposService);
  }
}
