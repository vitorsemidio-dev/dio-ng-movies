import { ConfigHttpParamsService } from './config-http-params.service';
import { ConfigParams } from './../shared/model/config-params';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { Filme } from './../shared/model/filme';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private readonly url = environment.apiBaseUrl;

  constructor(
    private httpClient: HttpClient,
    private configHttpParamsService: ConfigHttpParamsService,
  ) {}

  salvar(filme: Filme): Observable<Filme> {
    if (filme.id) {
      return this.editar(filme);
    }

    return this.criar(filme);
  }

  deletar(id: number): Observable<Filme> {
    return this.httpClient.delete<Filme>(`${this.url}/${id}`);
  }

  listar({
    pagina = 0,
    limite = 5,
    pesquisa,
    campo,
  }: ConfigParams): Observable<Filme[]> {
    let httpParams = this.configHttpParamsService.configurarHttpParams({
      pagina,
      limite,
      pesquisa,
      campo,
    });

    return this.httpClient.get<Filme[]>(`${this.url}`, {
      params: httpParams,
    });
  }

  private criar(filme: Filme): Observable<Filme> {
    return this.httpClient.post<Filme>(`${this.url}`, filme);
  }

  private editar(filme: Filme): Observable<Filme> {
    return this.httpClient.post<Filme>(`${this.url}/${filme.id}`, filme);
  }
}
