import { PriceAndSize } from './PriceAndSize';


export interface Product {
    id?: string;
    amount: number;
    description: string;
    image: string;
    name: string;
    priceAndSizes: PriceAndSize[];
    type: string;
}
