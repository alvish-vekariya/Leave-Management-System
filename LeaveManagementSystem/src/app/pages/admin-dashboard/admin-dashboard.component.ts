import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ColDef } from 'ag-grid-community';
import { ActionsComponent } from 'src/app/shared/actions/actions.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(private authServices: AuthenticationService){

  }

  rowData = [];

  ngOnInit(){
    this.authServices.getLeaves().subscribe((data: any)=>{
      // console.log(data.data);
      this.rowData = data.data
    })
  }

  colDefs : ColDef[] = [
    {field : "username"},
    {field : "leaveType"},
    {field : "startDate"},
    {field : "endDate"},
    {field : "reason"},
    {field : "totalDays"},
    {field : "status"},
    {field : "actions", cellRenderer : ActionsComponent, cellRendererParams : {acceptfunction : (id: string)=>{ this.accept(id)}}}
  ] 

  accept(id: string){
    console.log(id)
  }
}
