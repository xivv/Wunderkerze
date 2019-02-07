import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert.service';
import { ContactService } from './contact.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductService } from 'src/app/products/services/product.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/order/services/orders.service';
import { Contact } from 'src/app/model/Contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public contactService: ContactService,
    public productService: ProductService,
    public orderService: OrdersService,
    private router: Router
  ) { }

  contactForm: FormGroup;

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefonNumber: ['', [Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      relatedElement: ['', Validators.maxLength(100)],
      recaptcha: [null, Validators.required],
      reason: ['Produkt', Validators.required]
    });

    this.authService.user.subscribe(
      val => {
        this.f.emailAddress.setValue(this.authService.getUserEmail());
        if (val) {
          this.f.emailAddress.disable();
        }
      }
    );
  }

  get f() { return this.contactForm.controls; }

  hasRelatedElement() {
    return this.f.reason.value === 'Bestellung' || this.f.reason.value === 'Produkt';
  }

  isOrder() {
    return this.f.reason.value === 'Bestellung';
  }

  contact() {

    if (this.contactForm.invalid) {
      this.alertService.error('Das Formular wurde nicht korrekt ausgefüllt');
      return;
    }

    const contact: Contact = {
      userid: this.authService.getUserId() || '',
      email: this.f.emailAddress.value,
      name: this.f.name.value,
      relatedElement: this.f.relatedElement.value,
      description: this.f.description.value,
      date: new Date(),
      telefonNumber: this.f.telefonNumber.value,
      reason: this.f.reason.value
    };

    this.alertService.success('Kontaktformular erfolgreich eingereicht');
    this.contactService.insertContact(contact);
    this.router.navigate(['/user/contact']);
  }

}
