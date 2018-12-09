import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './services/shopping-cart.service';
import { CartItem } from '../statics/CartItem';
import { ProductConverter } from '../statics/ProductConverter';
import { OrdersService } from '../order/services/orders.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AddressService } from '../statics/services/address.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    private addressService: AddressService,
    private shoppingCartService: ShoppingCartService,
    private ordersService: OrdersService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  decreaseProductAmount(cartItem: CartItem) {
    this.shoppingCartService.removeProductFromCart(cartItem.product);
  }

  increaseProductAmount(cartItem: CartItem) {
    this.shoppingCartService.addProductToCart(cartItem.product);
  }

  getPrice(cartItem: CartItem): string {
    return ProductConverter.convertToPriceEURString(cartItem.amount * cartItem.product.price);
  }

  isNotEmpty() {
    return this.shoppingCartService.cartItems.length >= 1;
  }

  isInPayment() {
    const url = this.router.url;
    return url === '/payment';
  }

  getTotal() {
    let totalCost = 0;
    this.shoppingCartService.cartItems.forEach(element => {
      totalCost += element.amount * element.product.price;
    });

    if (totalCost === 0) {
      return '0';
    }
    return ProductConverter.convertToPriceEURString(totalCost);
  }

}
