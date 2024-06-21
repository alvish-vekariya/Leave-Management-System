import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ColDef } from 'ag-grid-community';

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
    {field : "status"}
  ] 
}
