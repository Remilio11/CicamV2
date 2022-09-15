import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateAermap } from '../interfaces/ICreateAermap';

@Injectable({
  providedIn: 'root'
})
export class AermapService {

  constructor( private http: HttpClient) { }

  configUrl = 'http://localhost:3000/api';

  sendAermapData(body: ICreateAermap) {
    return this.http.post<Blob>(`${this.configUrl}/aermap`, body, {
        headers: new HttpHeaders({
            'Accept':'application/octet-stream'
         }),
         'responseType': 'blob' as 'json'
    })
  }
}
