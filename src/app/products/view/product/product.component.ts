import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductConverter } from '../../statics/ProductConverter';
import { ShoppingCartService } from '../../shopping-cart/services/shopping-cart.service';
import { PriceAndSize } from '../../statics/PriceAndSize';
import { Product } from '../../statics/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  selectedPriceAndSize: PriceAndSize;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(val => {
      if (val) {
        this.product = val;
        this.selectedPriceAndSize = val.priceAndSizes[0];
        this.product.id = id;
      }
    });
  }

  ngOnInit() {

  }

  getPrice(): string {
    return ProductConverter.convertToPriceEUR(this.selectedPriceAndSize);
  }

  getRemainingAmount(amount: number) {
    if (amount > 10) {
      return 10;
    } else {
      return amount;
    }
  }

  addToCart() {
    if (this.selectedPriceAndSize) {
      this.shoppingCartService.addProductToCart(this.product, this.selectedPriceAndSize);
    }
  }
}
