import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductConverter } from '../../statics/ProductConverter';
import { ShoppingCartService } from '../../shopping-cart/services/shopping-cart.service';
import { PriceAndSize } from '../../statics/PriceAndSize';
import { Product } from '../../statics/Product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/messages/alert.service';
import { Rating } from '../../statics/Rating';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  selectedPriceAndSize: PriceAndSize;
  product: Product;

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

  totalRating() {

    let totalRating = 0;
    this.product.ratings.forEach(function (ratingElement) {
      totalRating += ratingElement.rating;
    });

    let rating = totalRating / this.product.ratings.length;
    if (isNaN(rating)) {
      rating = 0;
    }
    return rating;
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
