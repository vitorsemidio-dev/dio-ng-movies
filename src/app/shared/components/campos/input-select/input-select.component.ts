import { Component } from '@angular/core';

import { BaseComponent } from './../base/base.component';
import { ValidarCamposService } from './../validar-campos.service';

@Component({
  selector: 'dio-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent extends BaseComponent {
  constructor(public validarCamposService: ValidarCamposService) {
    super(validarCamposService);
  }
}
