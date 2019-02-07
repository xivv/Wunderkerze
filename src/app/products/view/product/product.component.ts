import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PriceAndSize } from 'src/app/model/PriceAndSize';
import { Product } from 'src/app/model/Product';
import { ShoppingCartService } from 'src/app/shopping-cart/services/shopping-cart.service';
import { Rating } from 'src/app/model/Rating';
import { ProductConverter } from 'src/app/model/ProductConverter';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  selectedPriceAndSize: PriceAndSize;
  product: Product;
  rating: number;

  ratingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService
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

  alreadyRated(): boolean {

    let alreadyRated = false;
    this.product.ratings.forEach(function (row) {
      if (row.uid === this.authService.getUserId()) {
        alreadyRated = true;
      }
    });
    return alreadyRated;
  }

  rate() {

    if (this.ratingForm.valid && !this.alreadyRated() && this.authService.getUserId()) {

      const rating: Rating = {
        uid: this.authService.getUserId(),
        rating: this.ratingForm.controls.rating.value,
        description: this.ratingForm.controls.description.value
      };
      this.product.ratings.push(rating);
      this.productService.updateProduct(this.product);
    }
  }

  ngOnInit() {
    this.ratingForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  getRatingAsArray(negative: boolean): number[] {

    let ratingArray = [];
    if (negative) {
      ratingArray = Array(5 - this.totalRating()).fill(0);
    } else {
      ratingArray = Array(this.totalRating()).fill(0);
    }
    return ratingArray;
  }

  totalRating() {
    let totalRating = 0;
    this.product.ratings.forEach(function (ratingElement) {
      totalRating += ratingElement.rating;
    });

    let rating = totalRating / this.product.ratings.length;
    if (isNaN(rating)) {
      rating = 5;
    }
    return Math.round(rating);
  }

  getPrice(): string {
    return ProductConverter.convertToPriceEUR(this.selectedPriceAndSize);
  }

  addToCart() {
    if (this.selectedPriceAndSize) {
      this.shoppingCartService.addProductToCart(this.product, this.selectedPriceAndSize);
    }
  }
}
