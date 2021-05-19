import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInfo } from '../../../shared/models/userInfo.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
  <div class="splash-container">
     <div class="splash-container__loggedOut">
          <div class="splash-container__loggedOut__image">
             <img src="../assets/piggybank.jpg" />
          </div>
          <ng-container *ngIf="!emailSent; else emailSentToUser">
              <div class="splash-container__loggedOut__form">
                <div class="splash-container__loggedOut__form__title">
                  Enter Your Email to Sign Up
                </div>
                <br/>
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
              </div>
          </ng-container>
          <ng-template #emailSentToUser>
            <div *ngIf="emailSent" class="email-sent" >
              Email Sent!  Please Check Your Email to Login!
              {{errorMessage}}
            </div>
          </ng-template>
    </div>
</div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Observable<any>;
  emailSent = false;
  errorMessage: string = '';
  emailEntered = '';
  loggedIn = false;

  apiUrl = environment.apiUrl;
  userInfo: UserInfo;
  userSub: any;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    const url = this.router.url;

    this.confirmSignIn(url);

    console.log("in login");
    this.userSub = this.afAuth.authState
      .subscribe(user => {
        console.dir(user);
        if(user) {
          this.userInfo = new UserInfo(user.displayName, user.email);
          this.auth.user = this.userInfo;
          console.dir(this.userInfo);
  
          this.router.navigate(['main']);
        }

      })

  }


  sendEmailLink() {
    this.auth.login(this.emailEntered);
    this.emailSent = true;
  }

  async confirmSignIn(url) {
    try {
      if (this.afAuth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');

        //if missing email, prompt use for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        const result = await this.afAuth.signInWithEmailLink(email, url);
        console.dir(result);
        window.localStorage.removeItem('emailForSignIn');
        this.router.navigate(['main']);

      }
    } catch (err) {
      this.errorMessage = err.message;
      console.dir(this.errorMessage);
    }
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
