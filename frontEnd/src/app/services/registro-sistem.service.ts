import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroPersona } from '../models/register_model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroSistemService {

  url='http://localhost:4000/api/registro/';

  constructor(private http: HttpClient) { }

  registrarPersona(persona : RegistroPersona) : Observable<any>{
    return this.http.post(this.url, persona);
  }
}
