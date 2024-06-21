import { Component } from '@angular/core';
import { IsignupData } from 'src/app/core/interfaces/authentication.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private authService: AuthenticationService){}

  userdata: IsignupData = {};
  rowData =[];
  ngOnInit(){
    const username = JSON.parse(localStorage.getItem('username') as string) as string;
    this.authService.getUser(username).subscribe((data: any)=>{
      this.userdata = data.data;
      // console.log(this.userdata)
      this.getLeaveData(this.userdata._id as string);
    })
  }

  getLeaveData(userId: string){
    this.authService.userLeaves(userId).subscribe((data:any)=>{
      this.rowData = data.data;
    })
    // this.authService.userLeaves(userId);
  }

  colDefs: ColDef[] = [
    {field : "leaveType"},
    {field : "startDate"},
    {field : "endDate"},
    {field : "reason"},
    {field : "totalDays"},
    {field : "status"}
  ];
}
