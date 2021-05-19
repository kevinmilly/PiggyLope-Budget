import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/shared/models/userInfo.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  errorMessage: string;

  userInfo: UserInfo;

  apiUrl = environment.apiUrl;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
  ) {


  }

  async login(emailEntered: string) {
    const actionCodeSettings = {
      url: `${this.apiUrl}/main`,
      handleCodeInApp: true
    };

    try {
      await this.afAuth.sendSignInLinkToEmail(
        emailEntered,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', emailEntered);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }


  set user(user: UserInfo) {
    this.userInfo = user;
  }

  get user() {
    return this.userInfo;
  }

  async logout() {
    await this.afAuth.signOut();
    return this.router.navigate(['']);
  }



}