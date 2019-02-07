import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) { }

  resetForm: FormGroup;


  reset() {

    if (this.resetForm.valid) {

      this.authService.resetPassword(this.resetForm.controls.emailAddress.value);
      this.router.navigate(['/login']);
      this.alertService.success('Wir haben Ihnen eine Bestätigungmail gesendet');
    }
  }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      recaptcha: [null, Validators.required]
    });
  }

}
