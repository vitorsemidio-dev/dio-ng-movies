import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { FilmeService } from './../../core/filme.service';

import { AlertaComponent } from './../../shared/components/alerta/alerta.component';

import { Alerta } from './../../shared/model/alerta';
import { Filme } from './../../shared/model/filme';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss'],
})
export class VisualizarFilmeComponent implements OnInit {
  filme$: Observable<Filme>;
  imgDefault = 'assets/images/angular-material-post.png';
  id: number;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private filmeService: FilmeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.carregarDadosFilme(this.id);
  }

  onDeletar() {
    this.openDialog();
  }

  onEditar() {
    this.router.navigateByUrl(`/filmes/cadastro/${this.id}`);
  }

  deletar(id: number) {
    this.filmeService.deletar(id).subscribe(() => {
      this.router.navigateByUrl('/filmes');
    });
  }

  openDialog() {
    const config = {
      data: {
        titulo: 'Deseja realmente excluir?',
        descricao:
          'Caso tenha certeza que deseja excluir, clique no botão "Excluir"',
        btnSuccessText: 'Excluir',
        btnSuccessColor: 'warn',
        possuiBtnFechar: true,
        btnCancelText: 'Cancelar',
        btnCancelColor: 'primary',
      } as Alerta,
    };
    const dialog = this.dialog.open(AlertaComponent, config);

    dialog.afterClosed().subscribe((confirmacaoExclusao) => {
      if (confirmacaoExclusao) {
        this.deletar(this.id);
      }
    });
  }

  private carregarDadosFilme(id: number) {
    this.filme$ = this.filmeService.buscarDetalhe(id);
  }
}
