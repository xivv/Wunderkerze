import { Product } from './Product';

export class ProductConverter {
    static convertToPriceEUR(product: Product): string {
        const price: string = product.price.toString();
        const position: number = price.length - 2;
        return [price.slice(0, position), ',', price.slice(position)].join('');
    }

    static convertToPriceEURString(priceNumber: number): string {
        const price: string = priceNumber.toString();
        const position: number = price.length - 2;
        return [price.slice(0, position), ',', price.slice(position)].join('');
    }
}
