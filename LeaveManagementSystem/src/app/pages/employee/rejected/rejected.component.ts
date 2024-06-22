import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss']
})
export class RejectedComponent {
  constructor(private authService: AuthenticationService){}

  ngOnInit(){
    const username = JSON.parse(localStorage.getItem('username') as string) as string;
    this.authService.getUser(username).subscribe((data: any)=>{
      const userdata = data.data;
      this.getRejectedLeave(userdata._id as string, 'rejected');
    })
  }

  getRejectedLeave(userId: string, status: string){
    this.authService.getCustomLeave({userId: userId, status: status}).subscribe((data: any)=>{
      this.rowData = data.data;
      console.log(this.rowData)
    })
  }

  colDefs : ColDef[] = [
    {field : "startDate", flex: 1},
    {field: "endDate", flex : 1},
    {field: "reason", flex: 2},
    {field : "leaveType", flex:1},
    {field : "status", flex:1}
  ]

  rowData : any =[];
}
