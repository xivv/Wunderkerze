import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/messages/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  loginForm: FormGroup;
  submitted = false;
  loading = false;

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.alertService.error('Please enter an email aswell as a password.');
      return;
    }
    this.authService.emailLogin(this.f.email.value, this.f.password.value);
  }
}
