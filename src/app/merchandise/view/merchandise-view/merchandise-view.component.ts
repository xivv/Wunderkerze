import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/products/services/product.service';
import { ShoppingCartService } from 'src/app/shopping-cart/services/shopping-cart.service';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-merchandise-view',
  templateUrl: './merchandise-view.component.html',
  styleUrls: ['./merchandise-view.component.scss']
})
export class MerchandiseViewComponent implements OnInit {

  constructor(
    public productService: ProductService,
    private shoppingCartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.shoppingCartService.addProductToCart(product, product.priceAndSizes[0]);
  }
  ngOnInit() {
  }

}
