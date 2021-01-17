import { Component } from '@angular/core';

import { BaseComponent } from './../base/base.component';
import { ValidarCamposService } from './../validar-campos.service';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent extends BaseComponent {
  constructor(public validarCamposService: ValidarCamposService) {
    super(validarCamposService);
  }
}
