import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInfo } from '../../../shared/models/userInfo.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { BackendService } from 'src/app/shared/services/backend.service';
import { Subscription } from 'rxjs';


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
  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.user$
      .subscribe(user => {
        console.dir(user);
        const firstTime = this.auth.firstTimeUser ? true : false;
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
