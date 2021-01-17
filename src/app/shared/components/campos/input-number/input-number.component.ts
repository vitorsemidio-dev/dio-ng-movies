import { Component, Input } from '@angular/core';

import { BaseComponent } from './../base/base.component';
import { ValidarCamposService } from './../validar-campos.service';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent extends BaseComponent {
  @Input() minValue = 0;
  @Input() maxValue = 10;
  @Input() step = 1;

  constructor(public validarCamposService: ValidarCamposService) {
    super(validarCamposService);
  }
}
