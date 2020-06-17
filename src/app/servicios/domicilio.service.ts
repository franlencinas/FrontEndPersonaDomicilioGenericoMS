import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Domicilio } from '../entidades/domicilio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  url : string = 'http://localhost:9000/api/v1/domicilio/';

  constructor( private http : HttpClient ) { }

  getAllDomicilios(): Observable<Domicilio[]> {
    return this.http.get<Domicilio[]>(this.url )
  }

  getOneDomicilio(id : number): Observable<Domicilio>{
    return this.http.get<Domicilio>(this.url + id);
  }

  postDomicilio(domicilio : Domicilio): Observable<Domicilio>{
    return this.http.post<Domicilio>(this.url, domicilio);
  }

  updateDomicilio(id : number, domicilio : Domicilio): Observable<Domicilio> {
    return this.http.put<Domicilio>(this.url + id, domicilio);
  }

  deleteDomicilio(id : number) : Observable<any>{
    return this.http.delete(this.url + id);
  }
}
