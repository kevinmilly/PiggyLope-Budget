import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/shared/models/userInfo.model';

import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserInfo>;

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if(user) {
            console.dir(user);
            return this.firestore.doc<UserInfo>(`user/${user.uid}`).valueChanges();
          } else {
              return of(null);
          }
        })
      )

  }

 async googleSignin() {
   const provider = new firebase.auth.GoogleAuthProvider();
   const credential = await this.afAuth.signInWithPopup(provider);
   return this.updateUserData(credential.user);
 }

 private updateUserData(user) {
   const userRef: AngularFirestoreDocument<UserInfo> = this.firestore.doc(`user/${user.uid}`);

   const data = {
     uid: user.uid,
     email: user.email,
     displayName: user.displayName,
     photoURL: user.photoURL
   }

   return userRef.set(data, {merge: true});
 }

 async signOut() {
   await this.afAuth.signOut();
   this.router.navigate(['/']);
 }



}