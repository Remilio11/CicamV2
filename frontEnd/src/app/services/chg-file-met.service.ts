import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChgFileMetService {

  constructor( private http: HttpClient) { }

  getPost (body: FormData) : Observable <any>{
    return this.http.get(`http://localhost:3000/upload`)
  }
}
