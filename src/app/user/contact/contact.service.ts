import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from 'src/app/model/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactCollection: AngularFirestoreCollection<Contact>;
  contacts: Observable<Contact[]>;

  private userContactCollection: AngularFirestoreCollection<Contact>;
  userContacts: Observable<Contact[]>;

  constructor(private db: AngularFirestore,
    public authService: AuthService) {
    this.getAllContacts();

    this.authService.user.subscribe(
      val => { this.getAllUserContacts(); }
    );
  }

  getAllContacts() {
    this.contactCollection = this.db.collection<Contact>('Contact', ref => ref.orderBy('date', 'desc'));
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAllUserContacts() {
    this.userContactCollection = this.db.collection<Contact>('Contact', ref => ref.where('userid', '==', this.authService.getUserId())
      .orderBy('date', 'desc'));
    this.userContacts = this.userContactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  insertContact(contact: Contact) {
    this.contactCollection.add(contact);
  }
}
