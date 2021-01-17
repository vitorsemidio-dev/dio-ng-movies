import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss'],
})
export class CadastroFilmesComponent implements OnInit {
  cadastro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validarCamposService: ValidarCamposService,
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  validarCampo(control: AbstractControl, errorName: string) {
    return this.validarCamposService.hasErrorValidation(control, errorName);
  }

  ngOnInit() {
    this.cadastro = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]],
    });
  }

  salvar() {
    if (this.cadastro.invalid) {
      return;
    }

    alert(`Sucesso\n\n ${JSON.stringify(this.cadastro.value, null, 4)}`);
  }

  reiniciarForm() {
    this.cadastro.reset();
  }
}
