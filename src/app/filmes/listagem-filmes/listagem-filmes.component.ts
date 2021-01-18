import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, filter, map } from 'rxjs/operators';

import { FilmeService } from './../../core/filme.service';

import { ConfigParams } from './../../shared/model/config-params';
import { Filme } from './../../shared/model/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss'],
})
export class ListagemFilmesComponent implements OnInit {
  filmes: Filme[] = [];
  imgDefault = 'assets/images/angular-material-post.png';
  paginaAtual = 0;
  filtroListagem: FormGroup;
  configParams: ConfigParams = {
    pagina: this.paginaAtual,
    limite: 8,
  };
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
    private filmeService: FilmeService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.carregarFilmes();
    this.montarFormularioPesquisa();
    this.filtrar('genero');
    this.filtrar('pesquisa');
  }

  montarFormularioPesquisa() {
    this.filtroListagem = this.fb.group({
      pesquisa: [''],
      genero: [''],
    });
  }

  abrirDetalheFilme(id: number) {
    this.router.navigateByUrl(`/filmes/${id}`);
  }

  carregarFilmes() {
    this.configParams.pagina = ++this.paginaAtual;
    this.filmeService.listar(this.configParams).subscribe({
      next: (filmesResponse) => this.filmes.push(...filmesResponse),
    });
  }

  onScroll() {
    this.carregarFilmes();
  }

  resetarFilmes() {
    this.paginaAtual = 0;
    this.filmes = [];
    this.carregarFilmes();
  }

  filtrar(campo: string) {
    this.filtroListagem
      .get(campo)
      .valueChanges.pipe(
        map((value) => value.trim()),
        filter((value: string) => value.length !== 0 || value.length > 2),
        debounceTime(300),
      )
      .subscribe((valor) => {
        if (campo === 'pesquisa') {
          this.configParams.pesquisa = valor;
        }
        if (campo === 'genero') {
          this.configParams.campo = {
            tipo: 'genero',
            valor: valor,
          };
        }
        this.resetarFilmes();
      });
  }
}
