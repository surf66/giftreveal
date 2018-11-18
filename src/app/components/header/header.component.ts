import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  isLoggedIn: boolean;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isAuthenticated();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.isLoggedIn = this.authenticationService.isAuthenticated();
  }

}
