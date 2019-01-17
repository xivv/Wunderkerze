import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/products/services/product.service';
import { ShoppingCartService } from 'src/app/products/shopping-cart/services/shopping-cart.service';
import { Product } from 'src/app/products/statics/Product';
import { PriceAndSize } from 'src/app/products/statics/PriceAndSize';

@Component({
  selector: 'app-merchandise-view',
  templateUrl: './merchandise-view.component.html',
  styleUrls: ['./merchandise-view.component.scss']
})
export class MerchandiseViewComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { }

  addToCart(product: Product, priceAndSize: PriceAndSize) {
    this.shoppingCartService.addProductToCart(product, priceAndSize);
  }
  ngOnInit() {
  }

}
