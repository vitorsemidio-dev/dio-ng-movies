import { Component } from '@angular/core';

import { BaseComponent } from './../base/base.component';
import { ValidarCamposService } from './../validar-campos.service';

@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
})
export class InputTextareaComponent extends BaseComponent {
  constructor(public validarCamposService: ValidarCamposService) {
    super(validarCamposService);
  }
}
