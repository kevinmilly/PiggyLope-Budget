import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInfo } from '../../../shared/models/userInfo.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { EnvelopeBudget } from 'src/app/shared/models/envelope-budget.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  apiUrl = environment.apiUrl;
  userInfo: UserInfo;
  userSub:Subscription;

  constructor(
  
    private router: Router,
    private auth: AuthService,
    private firestore:AngularFirestore
  ) { }

  ngOnInit(): void {
    let firstTime;
    this.userSub = this.auth.user$
      .subscribe(user => {
        if(user) this.router.navigate([`main`], { queryParams: {firstTime} });
      })
    

   }

  login() {
    const result = this.auth.googleSignin();


  }

  logout() {
    this.auth.signOut();
  }

  ngOnDestroy() {
    if(this.userSub) this.userSub.unsubscribe();
  }




}
