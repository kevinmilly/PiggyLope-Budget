import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerModule } from './containers/container.module';
import { MainContainerComponent } from './containers/main-container/main-container.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'envelopes', component: MainContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ContainerModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
