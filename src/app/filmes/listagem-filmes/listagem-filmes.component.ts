import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FilmeService } from './../../core/filme.service';

import { Filme } from './../../shared/model/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss'],
})
export class ListagemFilmesComponent implements OnInit {
  filmes: Observable<Filme[]>;
  imgDefault = 'assets/images/angular-material-post.png';

  constructor(private filmeService: FilmeService) {}

  ngOnInit() {
    this.carregarFilmes();
  }

  open() {}

  carregarFilmes() {
    this.filmes = this.filmeService.listar();
  }
}
