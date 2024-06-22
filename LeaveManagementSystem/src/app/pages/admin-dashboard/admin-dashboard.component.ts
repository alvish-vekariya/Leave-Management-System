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
    this.getLeavesData();
  }

  getLeavesData(){
    this.authServices.getLeaves().subscribe((data: any)=>{
      // console.log(data.data);
      this.rowData = data.data
    })
  }

  colDefs : ColDef[] = [
    {field : "username", flex: 1.5},
    {field : "leaveType", flex: 1},
    {field : "startDate", flex: 1},
    {field : "endDate", flex: 1},
    {field : "reason", flex: 2},
    {field : "totalDays", flex: 1},
    {field : "status", flex: 1},
    {field : "actions", 
      flex : 2,
      cellRenderer : ActionsComponent, 
      cellRendererParams : {
        acceptfunction : (id: string)=>{ this.accept(id)},
        rejectfunction : (id: string)=>{ this.reject(id)}
      }}
  ] 

  accept(id: string){
    this.authServices.leaveApprove(id, "approved").subscribe((data:any)=>{
      if(data.status == true){
        alert(data.message);
        this.getLeavesData();
      }else{
        alert(data.message);
      }
    })
  }

  reject(id: string){
    this.authServices.leaveApprove(id, "rejected").subscribe((data:any)=>{
      if(data.status == true){
        alert(data.message);
        this.getLeavesData();
      }else{
        alert(data.message);
      }
    })
  }

}
