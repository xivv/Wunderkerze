import { Component, OnInit } from '@angular/core';
import { AddressService } from '../statics/services/address.service';
import { ShoppingCartService } from '../shopping-cart/services/shopping-cart.service';
import { OrdersService } from '../order/services/orders.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Order } from '../statics/Order';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/messages/alert.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private router: Router,
    private addressService: AddressService,
    private alertService: AlertService,
    private shoppingCartService: ShoppingCartService,
    private ordersService: OrdersService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }

  paymentOptions = ['Nachnahme', 'Vorkasse'];
  paymentForm: FormGroup;

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      selectedAddress: ['', [Validators.required]],
      paymentOption: ['Nachnahme', Validators.required],
      recaptcha: [null, Validators.required]
    });

    if (this.shoppingCartService.isEmpty()) {
      this.router.navigate(['/shopping-cart']);
    }
  }

  get f() { return this.paymentForm.controls; }

  order() {

    if (this.shoppingCartService.isEmpty() || this.paymentForm.invalid) {
      return;
    }

    const order: Order = {
      cartItems: this.shoppingCartService.cartItems,
      userid: this.authService.getUserId(),
      orderStatus: 'Bestellt',
      date: new Date(),
      address: this.f.selectedAddress.value,
      paymentOption: this.f.paymentOption.value
    };

    order.cartItems.forEach(element => {
      this.productService.reduceProductAmount(element.product, element.amount);
    });

    this.ordersService.insertOrder(order);
    this.shoppingCartService.cartItems = [];
    this.router.navigate(['/payed']);
  }

}
