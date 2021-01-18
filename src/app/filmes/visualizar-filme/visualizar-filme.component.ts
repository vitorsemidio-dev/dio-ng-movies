import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { FilmeService } from './../../core/filme.service';

import { Filme } from './../../shared/model/filme';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss'],
})
export class VisualizarFilmeComponent implements OnInit {
  filme$: Observable<Filme>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private filmeService: FilmeService,
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.carregarDadosFilme(id);
  }

  private carregarDadosFilme(id: number) {
    this.filme$ = this.filmeService.buscarDetalhe(id);
  }
}
