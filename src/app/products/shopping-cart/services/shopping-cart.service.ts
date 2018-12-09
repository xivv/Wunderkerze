import { Injectable } from '@angular/core';
import { CartItem } from '../../statics/CartItem';
import { Product } from '../../statics/Product';
import { Observable, of } from 'rxjs';
import { AlertService } from 'src/app/messages/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItems: CartItem[] = [];

  constructor(
    private alertService: AlertService
  ) { }

  isEmpty() {
    return this.cartItems.length <= 0;
  }

  getNumberOfCartItems() {
    let counter = 0;
    this.cartItems.forEach(function (element) {
      counter += element.amount;
    });
    return counter;
  }

  addProductToCart(product: Product) {

    if (product.amount <= 0) {
      return;
    }

    let newProduct = true;

    this.cartItems.forEach(element => {
      if (element.product.id === product.id) {
        element.amount++;
        newProduct = false;
      }
    });

    if (!newProduct) {
      return;
    }

    const cartItem: CartItem = {
      amount: 1,
      product: product
    };
    this.cartItems.push(cartItem);
    this.alertService.success('Product added to cart!: ' + cartItem.product.name);
  }

  removeProductFromCart(product: Product) {
    let indexToRemove = -1;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];

      if (element.product.id === product.id) {

        if (element.amount > 1) {
          element.amount--;
        } else {
          indexToRemove = index;
        }
      }
    }

    if (indexToRemove >= 0) {
      this.cartItems.splice(indexToRemove, 1);
    }

  }
}
