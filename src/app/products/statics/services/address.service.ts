import { Injectable } from '@angular/core';
import { Address } from '../Address';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addressCollection: AngularFirestoreCollection<Address>;
  private userAddressCollection: AngularFirestoreCollection<Address>;

  addresses: Observable<Address[]>;
  userAddresses: Observable<Address[]>;
  address: any;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.getAllAddresses();

    if (this.authService.user) {
      this.getUserAddress();
    }
  }

  getAllAddresses() {
    this.addressCollection = this.db.collection<Address>('Addresses');
    this.addresses = this.addressCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Address;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getUserAddress() {
    this.userAddressCollection = this.db.collection<Address>('Addresses', ref => ref.where('userid', '==', this.authService.getUserId()));
    this.userAddresses = this.userAddressCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Address;
        const id = a.payload.doc.id;
        const dataObject = { id, ...data };
        return dataObject;
      }))
    );
  }

  updateAddress(address: Address) {
    this.addressCollection.doc(address.id).update(address);
  }

  insertAddress(address: Address) {
    this.addressCollection.add(address);
  }

  deleteAddress(address: Address) {
    this.addressCollection.doc(address.id).delete();
  }
}
