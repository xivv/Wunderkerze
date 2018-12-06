import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { ProductConverter } from '../../statics/ProductConverter';
import { CartItem } from '../../statics/CartItem';
import { Order } from '../../statics/Order';
import { OrderStatus } from '../../statics/OrderStatus';
import { Address } from '../../statics/Address';

@Component({
  selector: 'app-order-administration',
  templateUrl: './order-administration.component.html',
  styleUrls: ['./order-administration.component.scss']
})
export class OrderAdministrationComponent implements OnInit {

  statuses = [0, 1, 2, 3, 4];

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

  updateOrder(order: Order) {
    this.ordersService.updateOrder(order);
  }

  getOrderStatusString(index: number) {
    return OrderStatus[index];
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

