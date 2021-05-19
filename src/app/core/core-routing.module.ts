import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { MainContainerComponent } from './containers/main-container/main-container.component';


const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'main', component:MainContainerComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
