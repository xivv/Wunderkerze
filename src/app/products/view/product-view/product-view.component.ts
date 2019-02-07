import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from 'src/app/shopping-cart/services/shopping-cart.service';
import { AddressService } from 'src/app/user/address/services/address.service';
import { Product } from 'src/app/model/Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private addressService: AddressService) {

    this.products = this.productService.products;
  }

  addToCart(product: Product) {
    this.shoppingCartService.addProductToCart(product, product.priceAndSizes[0]);
  }

  ngOnInit() {
  }

}
