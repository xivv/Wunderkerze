import { Component, OnInit } from '@angular/core';
import { OrdersService } from './services/orders.service';
import { Order } from '../model/Order';
import { ProductConverter } from '../model/ProductConverter';
import { CartItem } from '../model/CartItem';
import { Address } from '../model/Address';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(
    public ordersService: OrdersService) {
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
    return ProductConverter.convertToPriceEURString(cartItem.priceAndSize.price);
  }

  getTotal(order: Order) {
    let totalCost = 0;
    order.cartItems.forEach(element => {
      totalCost += element.amount * element.priceAndSize.price;
    });
    totalCost += order.additionalCosts + order.sendingCosts;
    return ProductConverter.convertToPriceEURString(totalCost);
  }

}
