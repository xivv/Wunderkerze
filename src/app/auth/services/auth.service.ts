import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertService } from 'src/app/alert/alert.service';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  role?: string;
  emailVerified?: boolean;
}

interface Role {
  uid: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  role: Observable<Role>;
  roleString: Role;

  constructor(
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user && user.emailVerified) {
          this.role = this.afAuth.authState.pipe(
            switchMap(role => {
              if (role) {
                return this.afs.collection<Role>('roles', ref => ref.where('uid', '==', this.getUserId())).valueChanges();
              } else {
                return of(null);
              }
            })
          );
          this.role.subscribe(val => {
            if (val) {
              this.roleString = val[0];
            }
          });
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {

          if (user && !user.emailVerified) {
            this.alertService.error('Die E-Mail zu dem zugehörigen Konto ist noch nicht bestätigt.');
          }
          return of(null);
        }
      })
    );
  }

  getUserRole() {
    if (this.roleString) {
      return this.roleString.role;
    } else {
      return 'user';
    }
  }

  getUserEmail() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.email;
    } else {
      return '';
    }
  }

  getUserId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    } else {
      return '';
    }
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('loggedIn');
      this.router.navigate(['/']);
    });
  }

  isVerified(): boolean {
    return this.afAuth.auth.currentUser.emailVerified;
  }

  async emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      credential => {
        this.router.navigate(['/login']);
        this.alertService.success('Erfolgreich registriert! Sie erhalten in Kürze eine Bestätigungsemail');
        this.afAuth.auth.currentUser.sendEmailVerification().then((success) =>
          console.log('email send XOXO')).catch(
            (err) => {
              this.handleError(err);
            }
          );
        return this.updateUserData(credential.user);
      }
    )
      .catch(error => this.handleError(error));
  }

  async emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {

        if (!this.isVerified()) {
          this.alertService.error('Die E-Mail zu dem zugehörigen Konto ist noch nicht bestätigt.');
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/products']);
        }
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  resendVerifiedEmail(email: string) {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    };
    return userRef.set(data);
  }

  private handleError(error: Error) {
    this.alertService.error(error.message);
  }
}
