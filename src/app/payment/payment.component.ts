import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/services/shopping-cart.service';
import { OrdersService } from '../order/services/orders.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Order } from '../model/Order';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert.service';
import { Router } from '@angular/router';
import { AddressService } from '../user/address/services/address.service';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private router: Router,
    public addressService: AddressService,
    public alertService: AlertService,
    public shoppingCartService: ShoppingCartService,
    public ordersService: OrdersService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }

  paymentOptions = ['Nachnahme', 'Vorkasse'];
  paymentForm: FormGroup;
  additionalCosts = 590;


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
          this.additionalCosts = 590;
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

    if (this.shoppingCartService.getTotalCostAsNumber() >= 8000) {
      return 0;
    }
    if (this.paymentForm.get('paymentOption').value === 'Nachnahme') {
      return 100;
    }

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

}
