import { Injectable } from '@angular/core';
import { Product } from '../statics/Product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertService } from 'src/app/messages/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  private productDoc: AngularFirestoreDocument<Product>;
  product: Observable<Product>;

  private merchandiseCollection: AngularFirestoreCollection<Product>;
  merchandise: Observable<Product[]>;

  constructor(
    private alertService: AlertService,
    private db: AngularFirestore) {

    this.merchandiseCollection = this.db.collection<Product>('Produkte', ref => ref.where('type', '==', 'Merchandise'));
    this.merchandise = this.merchandiseCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.productsCollection = this.db.collection<Product>('Produkte', ref => ref.where('type', '==', 'Produkt'));
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  reduceProductAmount(product: Product, amount: number) {
    product.amount = product.amount - amount;
    this.productsCollection.doc(product.id).update(product);
  }

  getProduct(productId: string) {
    this.productDoc = this.db.doc<Product>('Produkte/' + productId);
    this.product = this.productDoc.valueChanges();
    return this.product;
  }

  insertProduct(product: Product) {
    this.productsCollection.add(product);
    this.alertService.success('Produkt erfolgreich hinzugefügt: ' + product.name);
  }

  updateProduct(product: Product) {
    this.productsCollection.doc(product.id).update(product);
  }
}
