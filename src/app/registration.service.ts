import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _url = 'http://localhost:3000/enroll';

  constructor(private http: HttpClient) { }

  register(userData) {
    return this.http.post<any>(this._url, userData);
  }
}
