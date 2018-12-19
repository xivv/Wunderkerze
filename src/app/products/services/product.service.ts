import { Injectable } from '@angular/core';
import { Product } from '../statics/Product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from 'src/app/messages/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  product: any;

  constructor(
    private alertService: AlertService,
    private db: AngularFirestore) {
    this.productsCollection = this.db.collection<Product>('Produkte');
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

  getProduct(id: string) {
    return this.productsCollection.doc(id).ref.get().then((doc) => {
      this.product = doc.data();
    });
  }

  insertProduct(product: Product) {
    this.productsCollection.add(product);
    this.alertService.success('Produkt erfolgreich hinzugefügt: ' + product.name);
  }
}
