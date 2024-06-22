import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import { DatatableComponent } from 'src/app/shared/datatable/datatable.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PendingleaveComponent } from './pendingleave/pendingleave.component';
import { RejectedComponent } from './rejected/rejected.component';
import { ApprovedComponent } from './approved/approved.component';


@NgModule({
  declarations: [
    ApplyleaveComponent,
    PendingleaveComponent,
    RejectedComponent,
    ApprovedComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
