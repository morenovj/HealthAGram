import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { auth } from "firebase/app";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  async signIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      gym: '',
      age: null,
      weight: null,
      height: null
    }

    return userRef.set(data, { merge: true })
  }

  updateUser(newData) {
    this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).update(newData);
  }

  signOut() {
    this.afAuth.auth.signOut();
    console.log('signed out')
  }




}
