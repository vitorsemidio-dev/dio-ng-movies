import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private readonly url = environment.apiBaseUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  salvar(): Observable<any> {
    return this.httpClient.post<any>(`${this.url}`, {});
  }

  editar(id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/${id}`, {});
  }

  deletar(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }

  listar(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}`);
  }
}
