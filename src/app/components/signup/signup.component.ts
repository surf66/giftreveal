import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  user: User;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {

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
    this.signupService.signup(this.user);
}

}
