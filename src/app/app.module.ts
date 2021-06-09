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
import { IntroComponent } from './core/intro/intro.component';
// import { ServiceWorkerModule } from '@angular/service-worker';

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
    SharedModule
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents:[IntroComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
