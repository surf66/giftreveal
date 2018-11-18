import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authenticationService: AuthenticationService, public router: Router) {}

  canActivate(): boolean {
    console.log(!this.authenticationService.isAuthenticated());
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    console.log('are logged in');
    return true;
  }

}