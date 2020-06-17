import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona    } from '../entidades/persona';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url : string = 'http://localhost:9000/api/v1/persona/';

  constructor( private http : HttpClient) { }

  getAllPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.url)
  }

  getOnePersona(id:number): Observable<Persona>{
    return this.http.get<Persona>(this.url + id);
  }

  postPersona(persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(this.url, persona);
  }

  updatePersona(id:number, persona:Persona): Observable<Persona> {
    return this.http.put<Persona>(this.url + id, persona);
  }

  deletePersona(id : number) : Observable<any>{
    return this.http.delete(this.url + id);
  }
}
