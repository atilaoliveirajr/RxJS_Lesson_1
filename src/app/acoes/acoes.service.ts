import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
	providedIn: 'root',
})
export class AcoesService {
	constructor(private _httpClinet: HttpClient) {}

	getAcoes() {
		return this._httpClinet.get<AcoesAPI>('http://localhost:3000/acoes').pipe(
      pluck('payload'),
			map((acoes) => {
				return acoes.sort((acaoA, acaoB )=>  this._ordenaPorCodigo(acaoA, acaoB));
			})
		);
	}

  private _ordenaPorCodigo(achaA: Acao, achaB: Acao) {
    if(achaA.codigo > achaB.codigo) {
      return 1
    }
    if (achaA.codigo < achaB.codigo) {
      return -1
    }
    return 0
  }
}
