import { CartItem } from './CartItem';
import { OrderStatus } from './OrderStatus';
import { Address } from './Address';
import { PaymentOption } from './PaymentOption';

export interface Order {
    id?: string;
    cartItems: CartItem[];
    userid: string;
    orderStatus: OrderStatus;
    date: Date;
    address: Address;
    paymentOption: PaymentOption;
}
