import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { Filme } from './../shared/model/filme';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private readonly url = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  salvar(filme: Filme): Observable<Filme> {
    if (filme.id) {
      return this.editar(filme);
    }

    return this.criar(filme);
  }

  deletar(id: number): Observable<Filme> {
    return this.httpClient.delete<Filme>(`${this.url}/${id}`);
  }

  listar(pagina = 0, qtdPagina = 5): Observable<Filme[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams
      .set('_page', pagina.toString())
      .set('_limit', qtdPagina.toString());

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
