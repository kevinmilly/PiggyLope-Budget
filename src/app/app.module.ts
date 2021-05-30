import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import {SlideshowModule} from 'ng-simple-slideshow';
import { IntroComponent } from './core/intro/intro.component';

@NgModule({
declarations: [
    AppComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    LayoutModule,
    SharedModule,
    SlideshowModule
  ],
  entryComponents:[IntroComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
