import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthenticationService, private routes: Router){
  }
  @Input() title : any;
  @Input() userId: any;

  ngOnInit(){
      
  }

  logout(){
    this.authService.logout(this.userId).subscribe((data: any)=>{
      if(data.status ==true){
        // alert(data.message)

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "You will logout!!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, signout",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.routes.navigateByUrl('/auth/login');
            localStorage.clear();
          }
        });

      }else{
        alert(data.message);
      }
    })
  }

}
