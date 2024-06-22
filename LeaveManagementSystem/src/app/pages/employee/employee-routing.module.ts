import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import { RejectedComponent } from './rejected/rejected.component';
import { ApprovedComponent } from './approved/approved.component';
import { PendingleaveComponent } from './pendingleave/pendingleave.component';

const routes: Routes = [
  {
    path: 'applyleave',
    component : ApplyleaveComponent
  },
  {
    path : 'rejected',
    component : RejectedComponent
  },
  {
    path : 'approved',
    component : ApprovedComponent
  },
  {
    path : 'pending',
    component : PendingleaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
