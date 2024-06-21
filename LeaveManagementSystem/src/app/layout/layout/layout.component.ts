import { Component, OnInit } from '@angular/core';
import { IsignupData } from 'src/app/core/interfaces/authentication.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private authService : AuthenticationService){
  }
  
  userData : IsignupData = {}
  
  ngOnInit(): void {
    const username = JSON.parse(localStorage.getItem('username') as string | '');
    this.authService.getUser(username).subscribe((data: any)=>{
      this.userData = data.data;
    })  
  }
  ngOnDestroy(){
    this.userData = {};
  }
}
