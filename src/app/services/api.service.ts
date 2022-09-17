import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getHello(): Observable<any> {
    return this.http.get(environment.apiHost + '/hello');
  }

  public getDataHora(): Observable<any> {
    return this.http.get(environment.apiHost + '/dataHora');
  }

  public sendToApi(msgObjeto): Observable<any> {
    return this.http.post(environment.apiHost + '/post', msgObjeto);
  }

}
