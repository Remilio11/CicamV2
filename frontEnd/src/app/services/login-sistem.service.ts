import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSistemService {

  url='http://localhost:4000/api/registro/';

  constructor( private http: HttpClient) { }

  getPersonas(): Observable <any>{
    return this.http.get(this.url);
  }
}
