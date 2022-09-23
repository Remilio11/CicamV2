import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateAermap } from '../interfaces/ICreateAermap';

@Injectable({
  providedIn: 'root'
})
export class AermapService {

  constructor( private http: HttpClient) { }

  configUrl = 'http://localhost:3000/api';

  sendAermapData(body: ICreateAermap, file1: File, file2: File) {
    const formData = new FormData();
    formData.append('files', file1);
    formData.append('files', file2);
    formData.append("data", JSON.stringify(body));
    return this.http.post<Blob>(`${this.configUrl}/aermap`, formData, {
        headers: new HttpHeaders({
            'Accept':'application/octet-stream'
         }),
         'responseType': 'blob' as 'json'
    })
  }
}
