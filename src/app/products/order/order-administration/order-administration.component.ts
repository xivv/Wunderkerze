import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { ProductConverter } from '../../statics/ProductConverter';
import { CartItem } from '../../statics/CartItem';
import { Order } from '../../statics/Order';
import { Address } from '../../statics/Address';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-administration',
  templateUrl: './order-administration.component.html',
  styleUrls: ['./order-administration.component.scss']
})
export class OrderAdministrationComponent implements OnInit {

  statuses = ['Bestellt', 'In Bearbeitung', 'Erwarte Zahlung', 'Zahlung erhalten', 'In Zustellung'];
  filter: string;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.filter = this.route.snapshot.paramMap.get('filter');
    this.ordersService.getFilteredOrders(this.filter);
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

