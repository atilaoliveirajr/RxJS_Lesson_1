import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { AcoesService } from './acoes.service';
import { Acoes } from './modelo/acoes';

const ESPERA_DIGITACAO = 300;

@Component({
	selector: 'app-acoes',
	templateUrl: './acoes.component.html',
	styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
	public acoesInput = new FormControl();
	public todaAcoes$ = this._acoesService.getAcoes();

  public filtroPeloInput = this.acoesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    filter((valorDigitado: string) => {
      return valorDigitado.length >= 3 || !valorDigitado.length;
    }),
    distinctUntilChanged(),
		switchMap((valorDigitado) => {
			return this._acoesService.getAcoes(valorDigitado);
		}),
	);

	public acoes$ = merge(this.todaAcoes$, this.filtroPeloInput)

	constructor(private _acoesService: AcoesService) {}
}
function debauceTime(): import("rxjs").OperatorFunction<any, string> {
  throw new Error('Function not implemented.');
}

