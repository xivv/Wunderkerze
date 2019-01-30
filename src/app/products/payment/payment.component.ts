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
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

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
  additionalCosts = 100;


  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      selectedAddress: ['', [Validators.required]],
      paymentOption: ['Nachnahme', Validators.required],
      recaptcha: [null, Validators.required],
      agb: [false, [Validators.required, Validators.requiredTrue]]
    });

    this.paymentForm.get('paymentOption').valueChanges.subscribe(
      val => {
        if (val === 'Nachnahme') {
          this.additionalCosts = 100;
        } else {
          this.additionalCosts = null;
        }
      }
    );


    if (this.shoppingCartService.isEmpty()) {
      this.router.navigate(['/shopping-cart']);
    }
  }

  get f() { return this.paymentForm.controls; }

  getShippingCosts() {

    let shippingCost = 0;
    this.shoppingCartService.cartItems.forEach(element => {

      if (element.priceAndSize.shipping > shippingCost) {
        shippingCost = element.priceAndSize.shipping;
      }
    });

    return shippingCost;
  }

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
      paymentOption: this.f.paymentOption.value,
      sendingCosts: 350,
      additionalCosts: this.additionalCosts
    };

    order.cartItems.forEach(element => {
      this.productService.reduceProductAmount(element.product, element.amount);
    });

    this.ordersService.insertOrder(order);
    this.shoppingCartService.cartItems = [];
    this.router.navigate(['/payed']);
  }

  hasAddress() {
    if (this.addressService.userAddresses) {
      return this.addressService.userAddresses.subscribe(
        val => {
          if (val && val.length > 0) {
            return true;
          } else {
            return false;
          }
        }
      );
    }
  }

}
