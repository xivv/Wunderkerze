import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/messages/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  registerForm: FormGroup;
  submitted = false;
  loading = false;

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      recaptcha: [null, Validators.required]
    });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  onSubmit() {
    this.submitted = true;


    if (this.registerForm.invalid) {
      this.alertService.error('Please enter valid information');
      return;
    }

    if (this.f.password.value !== this.f.repeatPassword.value) {
      this.alertService.error('The password is wrong');
      return;
    }
    this.authService.emailSignUp(this.f.email.value, this.f.password.value);
  }

}