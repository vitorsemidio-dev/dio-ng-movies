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

  listar(): Observable<Filme[]> {
    return this.httpClient.get<Filme[]>(`${this.url}`);
  }

  private criar(filme: Filme): Observable<Filme> {
    return this.httpClient.post<Filme>(`${this.url}`, filme);
  }

  private editar(filme: Filme): Observable<Filme> {
    return this.httpClient.post<Filme>(`${this.url}/${filme.id}`, filme);
  }
}
