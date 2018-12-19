import { Component, OnInit } from '@angular/core';
import { OrdersService } from './services/orders.service';
import { Order } from '../statics/Order';
import { ProductConverter } from '../statics/ProductConverter';
import { CartItem } from '../statics/CartItem';
import { Address } from '../statics/Address';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(
    private ordersService: OrdersService) {
  }

  ngOnInit() {

  }

  getFormatedAddress(address: Address) {
    return `${address.firstname} ${address.name},
            ${address.street} ${address.streetNumber},
            ${address.postCode} ${address.city},
            ${address.country}`;
  }

  getCartItemPrice(cartItem: CartItem): string {
    return ProductConverter.convertToPriceEURString(cartItem.product.price);
  }

  getTotal(order: Order) {
    let totalCost = 0;
    order.cartItems.forEach(element => {
      totalCost += element.amount * element.product.price;
    });
    return ProductConverter.convertToPriceEURString(totalCost);
  }

}
