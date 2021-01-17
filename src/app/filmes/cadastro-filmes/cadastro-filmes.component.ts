import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { FilmeService } from './../../core/filme.service';

import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';

import { Filme } from './../../shared/model/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss'],
})
export class CadastroFilmesComponent implements OnInit {
  cadastro: FormGroup;
  generos = [
    'Ação',
    'Aventura',
    'Comédia',
    'Drama',
    'Ficção Científica',
    'Romance',
    'Terror',
  ];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private validarCamposService: ValidarCamposService,
    private filmeService: FilmeService,
  ) {}

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

  submit() {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;

    this.salvar(filme);
  }

  reiniciarForm() {
    this.cadastro.reset();
  }

  private salvar(filme: Filme) {
    this.filmeService.salvar(filme).subscribe({
      next: (filmeResponse) => {
        this.openDialog();
        this.cadastro.reset();
      },
      error: (err) => {
        alert('Falha');
      },
    });
  }

  openDialog(): void {
    const tituloFilme = this.cadastro.value.titulo;
    const dialogRef = this.dialog.open(AlertaComponent, {
      width: '250px',
      data: {
        titulo: `Filme ${tituloFilme} cadastrado com sucesso`,
        descricao: `Os dados informados sobre o filme ${tituloFilme} foram salvos com sucesso`,
        possuiBotaoFechar: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog fechado com resultado', result);
    });
  }
}
