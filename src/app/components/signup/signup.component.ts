import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  user: User;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    if(this.authenticationService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    
    this.user = new User(
      this.signupForm.value.name,
      this.signupForm.value.username,
      this.signupForm.value.email,
      this.signupForm.value.password
    );
    this.authenticationService.signup(this.user);
}

}
