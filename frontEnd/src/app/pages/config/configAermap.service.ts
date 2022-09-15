import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:3000/api/aermap';

  getROU() {
    return this.http.post<Blob>(`${this.configUrl}/getROU`, {}, {
        headers: new HttpHeaders({
            'Accept':'application/octet-stream'
         }),
         'responseType': 'blob' as 'json'
    })
  }

  uploadFiles(file1: File, file2: File) {
    const formData = new FormData();
    formData.append('files', file1);
    formData.append('files', file2);
    return this.http.post<any>(`${this.configUrl}`, formData)
  }
}