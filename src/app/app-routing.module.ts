import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login', loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: 'register', loadChildren: './modules/register/register.module#RegisterModule'
  },
  {
    path: 'admin', canActivateChild: [AuthGuard], loadChildren: './modules/administrator/administrator.module#AdministratorModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
