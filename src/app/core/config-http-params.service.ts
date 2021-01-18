import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ConfigParams } from './../shared/model/config-params';

@Injectable({
  providedIn: 'root',
})
export class ConfigHttpParamsService {
  constructor() {}

  configurarHttpParams(configParams: ConfigParams): HttpParams {
    let httpParams = new HttpParams();

    if (configParams.pesquisa) {
      httpParams = httpParams.set('q', configParams.pesquisa);
    }

    if (configParams.campo) {
      httpParams = httpParams.set(
        configParams.campo.tipo,
        configParams.campo.valor.toString(),
      );
    }

    httpParams = httpParams
      .set('_page', configParams.pagina.toString())
      .set('_limit', configParams.limite.toString());

    httpParams = httpParams.set('_sort', 'id').set('_order', 'desc');
    return httpParams;
  }
}
