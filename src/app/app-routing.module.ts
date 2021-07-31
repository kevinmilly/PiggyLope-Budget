import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './core/containers/main-container/main-container.component';



const routes: Routes = [
  { path: '',  loadChildren:() => import('./core/core.module').then(m => m.CoreModule), pathMatch: 'full'},
  {path: 'main',  component:MainContainerComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
