import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../statics/Product';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  createProduct() {

    const product: Product = {
      amount: 100,
      description: 'Dies ist ein Apfel',
      image: 'https://www.fitbook.de/data/uploads/2017/11/gettyimages-168324344_1512042152-1040x690.jpg',
      label: ['frucht', 'rot'],
      name: 'Apfel',
      price: 2999,
      size: '1kg'
    };

    this.productService.insertProduct(product);
  }

}
