import { Injectable } from '@angular/core';
import { CartItem } from '../../model/CartItem';
import { Product } from '../../model/Product';
import { AlertService } from 'src/app/alert/alert.service';
import { PriceAndSize } from '../../model/PriceAndSize';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItems: CartItem[] = [];
  maximumItemsInCart = 10;

  constructor(
    private alertService: AlertService
  ) { }

  isEmpty() {
    return this.cartItems.length <= 0;
  }

  getTotalCostAsNumber() {
    let totalCost = 0;
    this.cartItems.forEach(element => {
      totalCost += element.amount * element.priceAndSize.price;
    });
    return totalCost;
  }

  getNumberOfCartItems() {
    let counter = 0;
    this.cartItems.forEach(function (element) {
      counter += element.amount;
    });
    return counter;
  }

  addProductToCart(product: Product, priceAndSize: PriceAndSize) {

    if (product.amount <= 0) {
      return;
    }

    let newProduct = true;

    this.cartItems.forEach(element => {
      if (element.product.id === product.id && element.priceAndSize.size === priceAndSize.size) {
        if (element.amount < this.maximumItemsInCart) {
          element.amount++;
        }
        newProduct = false;

      }
    });

    if (!newProduct) {
      return;
    }

    const cartItem: CartItem = {
      amount: 1,
      product: product,
      priceAndSize: priceAndSize
    };
    this.cartItems.push(cartItem);
    this.alertService.success('Produkt erfolgreich zum Warenkorb hinzugefügt: ' + cartItem.product.name);
  }

  removeProductFromCart(product: Product, size: string) {
    let indexToRemove = -1;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];

      if (element.product.id === product.id && element.priceAndSize.size === size) {

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
