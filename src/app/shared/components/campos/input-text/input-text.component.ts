import { Component } from '@angular/core';

import { BaseComponent } from './../base/base.component';
import { ValidarCamposService } from './../validar-campos.service';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent extends BaseComponent {
  constructor(public validarCamposService: ValidarCamposService) {
    super(validarCamposService);
  }
}
