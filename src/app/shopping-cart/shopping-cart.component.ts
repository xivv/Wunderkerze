import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from './services/shopping-cart.service';
import { CartItem } from '../model/CartItem';
import { ProductConverter } from '../model/ProductConverter';
import { OrdersService } from '../order/services/orders.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { AddressService } from '../user/address/services/address.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @Input() sendingCosts: number;
  @Input() additionalCosts: number;

  constructor(
    public addressService: AddressService,
    public shoppingCartService: ShoppingCartService,
    public ordersService: OrdersService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (!this.isNotEmpty()) {
      this.router.navigate(['/products']);
    }
  }

  decreaseProductAmount(cartItem: CartItem) {
    this.shoppingCartService.removeProductFromCart(cartItem.product, cartItem.priceAndSize.size);
    if (!this.isNotEmpty()) {
      this.router.navigate(['/products']);
    }
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

  isNan() {
    return this.getTotal(true) === 'N,aN';
  }
  getTotal(withAdditions: boolean) {
    let totalCost = this.shoppingCartService.getTotalCostAsNumber();
    if (withAdditions) {
      totalCost += this.sendingCosts + this.additionalCosts;
    }
    return ProductConverter.convertToPriceEURString(totalCost);
  }

}
