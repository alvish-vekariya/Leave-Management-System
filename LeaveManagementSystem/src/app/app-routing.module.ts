import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { authguardGuard } from './core/guards/authguard.guard';

const routes: Routes = [
  {
    path : 'auth',
    loadChildren : ()=>import('./authorization/authorization.module').then(m=>m.AuthorizationModule)
  },
  {
    path : '',
    component: LayoutComponent,
    loadChildren : ()=>import('./pages/pages.module').then(m=>m.PagesModule),
    canActivate : [authguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
