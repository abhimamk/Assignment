import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./component/register/register.module').then(m => m.RegisterModule) },
  { path: 'home', loadChildren: () => import('./Menu/home/home.module').then(m => m.HomeModule)}


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
