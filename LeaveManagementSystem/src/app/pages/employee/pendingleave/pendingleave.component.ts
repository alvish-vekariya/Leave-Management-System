import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-pendingleave',
  templateUrl: './pendingleave.component.html',
  styleUrls: ['./pendingleave.component.scss']
})
export class PendingleaveComponent {
  constructor(private authService: AuthenticationService){}

  ngOnInit(){
    const username = JSON.parse(localStorage.getItem('username') as string) as string;
    this.authService.getUser(username).subscribe((data: any)=>{
      const userdata = data.data;
      this.getRejectedLeave(userdata._id as string, 'pending');
    })
  }

  getRejectedLeave(userId: string, status: string){
    this.authService.getCustomLeave({userId: userId, status: status}).subscribe((data: any)=>{
      this.rowData = data.data;
    })
  }

  colDefs : ColDef[] = [
    {field : "startDate", flex:1},
    {field: "endDate", flex:1},
    {field: "reason", flex:2},
    {field : "leaveType", flex:1},
    {field : "status", flex:1}
  ]

  rowData : any =[];
}
