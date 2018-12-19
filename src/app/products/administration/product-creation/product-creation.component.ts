import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../statics/Product';
import { AlertService } from 'src/app/messages/alert.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit {

  productForm: FormGroup;

  constructor(private productService: ProductService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      size: ['', Validators.required],
      label: ['']
    });
  }

  get f() { return this.productForm.controls; }

  createProduct() {

    console.log(this.f.label.value);

    if (this.productForm.invalid) {
      this.alertService.error('Bitte alle Informationen angeben');
      return;
    }

    const product: Product = {
      amount: this.f.amount.value,
      description: this.f.description.value,
      image: this.f.image.value,
      label: [this.f.label.value],
      name: this.f.name.value,
      price: this.f.price.value,
      size: this.f.size.value
    };

    this.productService.insertProduct(product);
  }

}
