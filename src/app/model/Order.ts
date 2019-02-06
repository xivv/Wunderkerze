import { CartItem } from './CartItem';
import { Address } from './Address';

export interface Order {
    id?: string;
    cartItems: CartItem[];
    userid: string;
    orderStatus: string;
    date: Date;
    address: Address;
    paymentOption: string;
    sendingCosts: number;
    additionalCosts: number;
}
