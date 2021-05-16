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
      <mat-card class="splash-container__card">

        <ng-container *ngIf="user | async; else login">
          You are Logged In. <br/> <br/>
          <button mat-raised (click)="logout()"></button>
        </ng-container>
        <ng-template #login>
            <div class="spash-container__card__form">
              <mat-form-field>
                <mat-label>Enter your Email to Login</mat-label>
                <input 
                  type="string" 
                  matInput 
                  name="email" 
                  formControlName="email" 
                  />
              </mat-form-field> 
              <button mat-raised [disabled]="emailSent" (click)="sendEmailLink(email.value)"></button>
            </div>
            <div class="splash-container__card__image">
              <img src="../assets/piggybank.jpg" />
            </div>
          </ng-template>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Observable<any>;
  emailSent = false;
  errorMessage:string = '';
  email = new FormControl('', Validators.email);

  apiUrl = environment.apiUrl;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.user = this.afAuth.authState;

    const url = this.router.url;

    this.confirmSignIn(url);
  }


  async sendEmailLink() {
    const actionCodeSettings = {
      url: this.apiUrl,
      handleCodeInApp:true
    };

    try {
      await this.afAuth.sendSignInLinkToEmail(
        this.email.value, 
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.email.value);
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

}
