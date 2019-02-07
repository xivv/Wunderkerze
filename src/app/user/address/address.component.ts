import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/alert/alert.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AddressService } from './services/address.service';
import { Address } from 'src/app/model/Address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public addressService: AddressService,
    private route: ActivatedRoute) { }

  address: Address = {
    street: '',
    streetNumber: '',
    city: '',
    postCode: undefined,
    country: 'Deutschland',
    userid: '',
    firstname: '',
    name: ''
  };
  mode: string;

  addressForm: FormGroup;

  get f() { return this.addressForm.controls; }

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('mode');

    this.addressForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      streetNumber: ['', [Validators.required, Validators.maxLength(20)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      postCode: ['', [Validators.required, Validators.min(10000), Validators.max(99999)]],
      country: ['', Validators.required]
    });
  }

  onSubmit(address: Address) {

    if (this.addressForm.invalid) {
      this.alertService.error('Bitte überprüfen Sie Ihre Angaben');
      return;
    }

    if (this.isEditMode()) {
      this.updateAddress(address);
    } else {
      this.insertAddress();
    }
  }

  isEditMode() {
    return this.mode === 'edit';
  }

  deleteAddress(address: Address) {
    this.addressService.deleteAddress(address);
    this.alertService.success('Adresse erfolgreich gelöscht');
  }

  insertAddress() {
    this.address.userid = this.authService.getUserId();
    this.addressService.insertAddress(this.address);
    this.alertService.success('Adresse erfolgreich erstellt');
  }

  updateAddress(address: Address) {

    if (address.firstname === '') {
      this.alertService.error('Adresse konnte nicht aktualisiert werden');
      return;
    }

    this.addressService.updateAddress(address);
    this.alertService.success('Adresse erfolgreich aktualisiert');
  }
}
