import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { FilmeService } from './../../core/filme.service';

import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';

import { Alerta } from './../../shared/model/alerta';
import { Filme } from './../../shared/model/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss'],
})
export class CadastroFilmesComponent implements OnInit {
  idFilme: number;
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.idFilme = this.activatedRoute.snapshot.params['id'];
    this.criarFormulario();

    this.popularDados(this.idFilme);
  }

  criarFormulario() {
    this.cadastro = this.fb.group({
      id: [null],
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

  popularDados(id: number) {
    if (!id) return;

    this.filmeService.buscarDetalhe(id).subscribe((filmeResponse) => {
      this.cadastro.setValue({
        ...filmeResponse,
      });
    });
  }

  validarCampo(control: AbstractControl, errorName: string) {
    return this.validarCamposService.hasErrorValidation(control, errorName);
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
        this.openSuccessDialog();
      },
      error: (err) => {
        this.openErrorDialog();
      },
    });
  }

  private openSuccessDialog(): void {
    const tituloFilme = this.cadastro.value.titulo;
    const alertaSuccessConfig = {
      data: {
        titulo: `Filme ${tituloFilme} registrado com sucesso`,
        descricao: `Os dados informados sobre o filme ${tituloFilme} foram salvos.`,
        possuiBtnFechar: true,
        btnSuccessText: 'Ir para listagem',
        btnCancelText: 'Cadastrar um novo filme',
        btnCancelColor: 'primary',
      } as Alerta,
    };

    const dialogRef = this.dialog.open(AlertaComponent, alertaSuccessConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/filmes']);
      } else {
        this.reiniciarForm();
        this.router.navigateByUrl(`/filmes/cadastro`);
      }
    });
  }

  private openErrorDialog(): void {
    const alertaErrorConfig = {
      data: {
        titulo: `Erro ao salvar o registro`,
        descricao: `Não conseguimos salvar o seu registro. Tente novamente mais tarde`,
        btnSuccessText: 'Fechar',
        btnSuccessColor: 'warn',
      } as Alerta,
    };

    this.dialog.open(AlertaComponent, alertaErrorConfig);
  }
}
