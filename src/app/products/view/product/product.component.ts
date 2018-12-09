import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductConverter } from '../../statics/ProductConverter';
import { ShoppingCartService } from '../../shopping-cart/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id);
  }

  getPrice(): string {
    return ProductConverter.convertToPriceEUR(this.productService.product);
  }

  addToCart() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.product.id = id;
    this.shoppingCartService.addProductToCart(this.productService.product);
  }
}
