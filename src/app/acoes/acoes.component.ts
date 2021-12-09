import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AcoesService } from './acoes.service';
import { Acoes } from './modelo/acoes';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  public acoesInput = new FormControl();
  public acoes$: Observable<Acoes> = this._acoesService.getAcoes();

  constructor(private _acoesService: AcoesService) {}
}
