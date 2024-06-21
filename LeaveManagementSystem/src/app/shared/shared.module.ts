import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable/datatable.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ActionsComponent } from './actions/actions.component';


@NgModule({
  declarations: [
    DatatableComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    AgGridAngular
  ],
  exports:[
    DatatableComponent,
    ActionsComponent
  ]
})
export class SharedModule {}
