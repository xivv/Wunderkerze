import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../statics/Product';
import { ShoppingCartService } from '../../shopping-cart/services/shopping-cart.service';
import { AddressService } from '../../statics/services/address.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private addressService: AddressService) { }

  addToCart(product: Product) {
    this.shoppingCartService.addProductToCart(product, product.priceAndSizes[0]);
  }

  ngOnInit() {
  }

}
