import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private authService : AuthenticationService){
  }

  ngOnInit(){
    this.getuser()
  }

  role: string= '';
  sidebarComponents: any;

  getuser(){
    const username = JSON.parse(localStorage.getItem('username') as string);
    this.authService.getUser(username).subscribe((data: any)=>{
      this.role = data.data.role;
      if(data.data.role == 'admin'){
        this.sidebarComponents = [{ urlname : 'Dashboard',
                                    url: "/admin/dashboard"
                                  }, 
                                  {
                                    urlname : 'Rejected',
                                    url:  "/admin/rejected"
                                  }, 
                                  {
                                    urlname:'Approved',
                                    url : "/admin/approved"
                                  }]
      }else{
        this.sidebarComponents = [{urlname : 'Dashboard',
                                   url : '/employee/dashboard'
                                  }, 
                                  {
                                    urlname : 'Rejected',
                                    url :  '/employee/rejected'
                                  }, {
                                    urlname : 'Approved',
                                    url : '/employee/approved'
                                  }, {
                                    urlname :'Apply',
                                    url : '/employee/applyleave'
                                  },{
                                    urlname :'Pending',
                                    url : '/employee/pending'
                                  }]
      }
    })
  }
}
