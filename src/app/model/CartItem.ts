import { Product } from './Product';
import { PriceAndSize } from './PriceAndSize';

export interface CartItem {
    amount: number;
    product: Product;
    priceAndSize: PriceAndSize;
}
