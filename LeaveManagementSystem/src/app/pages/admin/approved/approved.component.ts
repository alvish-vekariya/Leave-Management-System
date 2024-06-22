import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss']
})
export class ApprovedComponent {
  constructor(private authService: AuthenticationService){}

  rowData : any;
  ngOnInit(){

  }

  colDefs: ColDef[] = [
    {field : "username"},
    {field : "leaveType"},
    {field :"startDate"},
    {field : "endDate"},
    {field : "reason"},
    {field : "totalDays"},
    {field : "status"}
  ]
  
}
