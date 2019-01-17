import { PriceAndSize } from './PriceAndSize';
import { Rating } from './Rating';


export interface Product {
    id?: string;
    amount: number;
    description: string;
    image: string;
    name: string;
    priceAndSizes: PriceAndSize[];
    type: string;
    ratings: Rating[];
}
