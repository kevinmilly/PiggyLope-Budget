import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerModule } from './containers/container.module';
import { LoginComponent } from './login/login.component';


const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes), ContainerModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
