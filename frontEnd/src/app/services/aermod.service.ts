import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateAermod } from '../interfaces/ICreateAermod';

@Injectable({
  providedIn: 'root'
})
export class AermodService {

  constructor( private http: HttpClient) { }

  configUrl = 'http://localhost:3000/api';

  sendAermodData(body: ICreateAermod, file1: File, file2: File, file3: File) {
    const formData = new FormData();
    formData.append('files', file1);
    formData.append('files', file2);
    formData.append('files', file3);
    formData.append("data", JSON.stringify(body));
    return this.http.post<Blob>(`${this.configUrl}/aermod`, formData, {
        headers: new HttpHeaders({
            'Accept':'application/octet-stream'
         })
    })
  }

  getRNK() {
    return this.http.post<Blob>(`${this.configUrl}/aermod/getRNK`, {}, {
        headers: new HttpHeaders({
            'Accept':'application/octet-stream'
         }),
         'responseType': 'blob' as 'json'
    })
  }

  getOUT() {
    return this.http.post<Blob>(`${this.configUrl}/aermod/getOUT`, {}, {
        headers: new HttpHeaders({
            'Accept':'application/octet-stream'
         }),
         'responseType': 'blob' as 'json'
    })
  }

  getPLT() {
    return this.http.post<Blob>(`${this.configUrl}/aermod/getPLT`, {}, {
        headers: new HttpHeaders({
            'Accept':'application/octet-stream'
         }),
         'responseType': 'blob' as 'json'
    })
  }

  getSUM() {
    return this.http.post<Blob>(`${this.configUrl}/aermod/getSUM`, {}, {
        headers: new HttpHeaders({
            'Accept':'application/octet-stream'
         }),
         'responseType': 'blob' as 'json'
    })
  }
}
