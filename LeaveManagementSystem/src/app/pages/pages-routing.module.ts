import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: 'employee/dashboard',
    component : DashboardComponent
  },
  {
    path : 'employee',
    loadChildren: ()=>import('./employee/employee.module').then(m=>m.EmployeeModule)
  },
  {
    path: 'admin/dashboard',
    component : AdminDashboardComponent
  },
  {
    path : 'admin',
    loadChildren : ()=>import('./admin/admin.module').then(m=>m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
