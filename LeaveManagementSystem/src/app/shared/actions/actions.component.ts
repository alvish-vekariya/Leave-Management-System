import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements ICellRendererAngularComp {

  params: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;  
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

  approve(){  
    this.params.acceptfunction(this.params.data._id);
  }

  reject(){
    console.log(this.params._id);
  }

}
