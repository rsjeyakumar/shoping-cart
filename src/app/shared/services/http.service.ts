import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = environment.apiUrl;
  userDetails = 'user';
  constructor(private http: HttpClient) {

  }

  httpHeaders = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };


  createData(url, body) {
    return this.http.post(url, body, this.httpHeaders);
  }

  readData(url) {
    return this.http.get(url);
  }
  updateData() {

  }

  delteData() { }



}
