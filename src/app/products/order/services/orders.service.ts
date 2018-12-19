import { Injectable } from '@angular/core';
import { Order } from '../../statics/Order';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersCollection: AngularFirestoreCollection<Order>;
  private userOrdersCollection: AngularFirestoreCollection<Order>;
  private filteredOrdersCollection: AngularFirestoreCollection<Order>;

  orders: Observable<Order[]>;
  userOrders: Observable<Order[]>;
  filteredOrders: Observable<Order[]>;
  order: any;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.getAllOrders();
    this.authService.user.subscribe(
      val => { this.getUserOrders(); }
    );
  }

  getFilteredOrders(filter: string) {
    this.filteredOrdersCollection = this.db.collection<Order>('Order', ref => ref.where('orderStatus', '==', filter));
    this.filteredOrders = this.filteredOrdersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAllOrders() {
    this.ordersCollection = this.db.collection<Order>('Order', ref => ref.orderBy('date', 'desc'));
    this.orders = this.ordersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getUserOrders() {
    this.userOrdersCollection = this.db.collection<Order>('Order',
      ref => ref.where('userid', '==', this.authService.getUserId())
        .orderBy('date', 'desc'));
    this.userOrders = this.userOrdersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getOrder(id: string) {
    return this.ordersCollection.doc(id).ref.get().then((doc) => {
      this.order = doc.data();
    });
  }

  updateOrder(order: Order) {
    this.ordersCollection.doc(order.id).update(order);
  }

  insertOrder(order: Order) {
    this.ordersCollection.add(order);
  }
}
