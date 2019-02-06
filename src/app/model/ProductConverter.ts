
import { PriceAndSize } from './PriceAndSize';

export class ProductConverter {
    static convertToPriceEUR(priceAndSize: PriceAndSize): string {

        if (priceAndSize) {
            const price: string = priceAndSize.price.toString();
            const position: number = price.length - 2;
            return [price.slice(0, position), ',', price.slice(position)].join('');
        } {
            return '0';
        }
    }

    static convertToPriceEURString(priceNumber: number): string {
        const price: string = priceNumber.toString();
        const position: number = price.length - 2;
        return [price.slice(0, position), ',', price.slice(position)].join('');
    }
}
