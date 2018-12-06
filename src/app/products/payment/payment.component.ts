import { Component, OnInit } from '@angular/core';
import { AddressService } from '../statics/services/address.service';
import { ShoppingCartService } from '../shopping-cart/services/shopping-cart.service';
import { OrdersService } from '../order/services/orders.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Order } from '../statics/Order';
import { OrderStatus } from '../statics/OrderStatus';
import { PaymentOption } from '../statics/PaymentOption';
import { Address } from '../statics/Address';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/messages/alert.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private addressService: AddressService,
    private alertService: AlertService,
    private shoppingCartService: ShoppingCartService,
    private ordersService: OrdersService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  paymentOptions = ['Nachnahme'];
  selectedPaymentOption: PaymentOption;
  paymentForm: FormGroup;

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      selectedAddress: ['', [Validators.required]],
      paymentOption: ['Nachnahme', Validators.required],
    });
  }

  get f() { return this.paymentForm.controls; }

  order() {

    if (this.shoppingCartService.isEmpty()) {
      return;
    }

    const order: Order = {
      cartItems: this.shoppingCartService.cartItems,
      userid: this.authService.getUserId(),
      orderStatus: OrderStatus.BESTELLT,
      date: new Date(),
      address: this.f.selectedAddress.value,
      paymentOption: this.f.paymentOption.value
    };

    console.log(order);
    this.ordersService.insertOrder(order);
    this.shoppingCartService.cartItems = [];
  }

}
