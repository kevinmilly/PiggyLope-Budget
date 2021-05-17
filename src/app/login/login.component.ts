import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  template: `
  <div class="splash-container">
  <ng-container *ngIf="user | async; else login">
      <mat-card class="splash-container__loggedout">
          <app-main-container></app-main-container>
          <button mat-raised (click)="logout()"></button>
      </mat-card>
  </ng-container>
  <ng-template #login>
     <div class="splash-container__loggedin">
          <div class="splash-container__loggedin__image">
             <img src="../assets/piggybank.jpg" />
          </div>
          <div class="splash-container__loggedin__form">
            <div class="splash-container__loggedin__form__title">
              Enter Your Email to Sign Up
            </div>
              <mat-form-field>
                  <mat-label>Email</mat-label>
                  <input 
                    type="email" 
                    matInput 
                    name="email" 
                    [(ngModel)]="emailEntered" 
                    />
              </mat-form-field> 
              <app-shared-button 
                class="" 
                [type]="'regular'" 
                [content]="'Send Login'"
                [size]="'big'"
                (clicked)="sendEmailLink()"
        ></app-shared-button>
        <span *ngIf="emailSent" [style.color]="'blue'" >Email Sent!  Please Check Your Email to Login!</span>
          </div>
    </div>
    </ng-template>
</div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Observable<any>;
  emailSent = false;
  errorMessage:string = '';
  emailEntered = '';

  apiUrl = environment.apiUrl;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.user = this.afAuth.authState;
    console.dir(this.user);
    const url = this.router.url;

    this.confirmSignIn(url);
  }


  async sendEmailLink() {
    const actionCodeSettings = {
      url: `${this.apiUrl}/envelopes`,
      handleCodeInApp:true
    };

    try {
      await this.afAuth.sendSignInLinkToEmail(
        this.emailEntered, 
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.emailEntered);
      this.emailSent = true;
    } catch (error) {
        this.errorMessage = error.message;
    }

  }

  async confirmSignIn(url) {
    try {
      if(this.afAuth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');

        if(!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        const result = await this.afAuth.signInWithEmailLink(email, url);
        window.localStorage.removeItem('emailForSignIn');

      }
    } catch (error) {
        this.errorMessage = error.message;  
    }
  }

  async logout() {
    await this.afAuth.signOut();
  }

}
