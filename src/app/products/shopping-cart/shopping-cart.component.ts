import { Component, OnInit, Input } from '@angular/core';
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

  @Input() sendingCosts: number;
  @Input() additionalCosts: number;

  constructor(
    private addressService: AddressService,
    private shoppingCartService: ShoppingCartService,
    private ordersService: OrdersService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  decreaseProductAmount(cartItem: CartItem) {
    this.shoppingCartService.removeProductFromCart(cartItem.product, cartItem.priceAndSize.size);
  }

  increaseProductAmount(cartItem: CartItem) {
    this.shoppingCartService.addProductToCart(cartItem.product, cartItem.priceAndSize);
  }

  getPrice(cartItem: CartItem): string {
    return ProductConverter.convertToPriceEURString(cartItem.amount * cartItem.priceAndSize.price);
  }

  isNotEmpty() {
    return this.shoppingCartService.cartItems.length >= 1;
  }

  isInPayment() {
    const url = this.router.url;
    return url === '/payment';
  }

  convertToString(price: number) {
    return ProductConverter.convertToPriceEURString(price);
  }

  getTotal(withAdditions: boolean) {
    let totalCost = 0;
    this.shoppingCartService.cartItems.forEach(element => {
      totalCost += element.amount * element.priceAndSize.price;
    });

    if (totalCost === 0) {
      return '0';
    }
    if (withAdditions) {

      totalCost += this.sendingCosts + this.additionalCosts;
      return ProductConverter.convertToPriceEURString(totalCost);
    } else {
      return ProductConverter.convertToPriceEURString(totalCost);
    }

  }

}
