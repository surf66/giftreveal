import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signup(user: User) {
    return this.http.post('/api/signup', user)
      .toPromise().then(() => { console.log('success'); })
      .catch(() => { console.log('error'); });
  }

  login(user: User) {
    return this.http.post('/api/login', user)
      .toPromise().then(() => { console.log('success'); })
      .catch(() => { console.log('error'); });
  }
}
