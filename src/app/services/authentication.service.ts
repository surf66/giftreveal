import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import * as moment from 'moment';
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  signup(user: User) {
    return this.http.post('/api/signup', user)
      .toPromise().then(() => { console.log('success'); })
      .catch(() => { console.log('error'); });
  }

  login(user: User) {
    return this.http.post('/api/login', user).toPromise()
      .then((res) => {
        this.setSession(res);
        this.router.navigate(['/dashboard']);
      });
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isAuthenticated() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isAuthenticated();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
