import { Component, OnInit } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {

  public apiGreeting = '';
  public data = '';
  public hora = '';
  public msg = '';
  public msgObjeto = {};
  public apiMsg = '';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getHello().pipe(
      catchError((err) => {
        this.apiGreeting = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.apiGreeting = response.mensagem;
      }
    });
    
    this.apiService.getDataHora().pipe(
      catchError((err) => {
        this.data = 'Falha na comunicação com o servidor.';
        this.hora = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.data = response.data;
        this.hora = response.hora;
      }
    });
  }

  public sendMsg() {
    this.msgObjeto = {
      mensagem: this.msg
    }

    this.apiService.sendToApi(this.msgObjeto).pipe(
      catchError((err) => {
        this.apiMsg = 'Falha na comunicação com o servidor.';
        return [];
      })
      ).subscribe((response) => {
        if (response) {
          this.apiMsg = response.mensagem;
        }
      });
  }

}
