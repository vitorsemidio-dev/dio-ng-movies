import { Component, OnInit } from '@angular/core';

import { FilmeService } from './../../core/filme.service';

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

  constructor(private filmeService: FilmeService) {}

  ngOnInit() {
    this.carregarFilmes();
  }

  open() {}

  carregarFilmes() {
    this.filmeService.listar(this.paginaAtual, 8).subscribe({
      next: (filmesResponse) => this.filmes.push(...filmesResponse),
    });
    this.paginaAtual++;
  }

  onScroll() {
    this.carregarFilmes();
  }
}
