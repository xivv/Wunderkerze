import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../statics/Product';
import { AlertService } from 'src/app/messages/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceAndSize } from '../../statics/PriceAndSize';
import { ProductConverter } from '../../statics/ProductConverter';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit {

  productForm: FormGroup;
  newSize: string;

  constructor(private productService: ProductService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      shortDescription: ['', Validators.required],
      images: this.formBuilder.array([]),
      image: [''],
      priceAndSize: this.formBuilder.array([]),
      price: [''],
      size: [''],
      shipping: [''],
      type: ['Produkt', Validators.required]
    });
  }

  get f() { return this.productForm.controls; }

  convertToString(price: number) {
    return ProductConverter.convertToPriceEURString(price);
  }

  removeSize(index: number) {
    this.f.priceAndSize.value.splice(index, 1);
  }

  removeImage(index: number) {
    this.f.images.value.splice(index, 1);
  }

  addImage() {
    this.f.images.value.push(this.f.image.value);
  }

  addSize() {
    const newPriceAndSize: PriceAndSize = {
      price: this.f.price.value,
      size: this.f.size.value,
      shipping: this.f.shipping.value
    };

    this.f.priceAndSize.value.push(newPriceAndSize);
  }

  createProduct() {

    const product: Product = {
      name: this.f.name.value,
      amount: this.f.amount.value,
      description: this.f.description.value,
      shortDescription: this.f.shortDescription.value,
      images: this.f.images.value,
      priceAndSizes: this.f.priceAndSize.value,
      type: this.f.type.value,
      ratings: []
    };

    console.log(product);

    if (this.productForm.invalid) {
      this.alertService.error('Bitte alle Informationen angeben');
      return;
    }

    this.productService.insertProduct(product);
  }

}
