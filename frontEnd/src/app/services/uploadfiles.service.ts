import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadfilesService {

  constructor( private http: HttpClient) { }

  sendPost(body: FormData) : Observable <any>{
    return this.http.post(`http://localhost:3000/upload`, body)
  }
}
