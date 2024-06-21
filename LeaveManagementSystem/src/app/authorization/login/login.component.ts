import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IloginData } from 'src/app/core/interfaces/authentication.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private authService : AuthenticationService, private route : Router){

  }

  loginForm = this.formBuilder.group({
    username : ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    password : ['', [Validators.required, Validators.minLength(8)]]
  })

  loginSubmit(){
    const loginCredentials = this.loginForm.value as IloginData;
    this.authService.login(loginCredentials).subscribe((data: any)=>{
      if(data.status == true){
        alert(data.message);
        localStorage.setItem('token', data.token);
        localStorage.setItem('islogged', 'true');
        localStorage.setItem('username', JSON.stringify(this.loginForm.controls.username.value));
        this.route.navigateByUrl(`/${data.role}/dashboard`);
      }else{
        alert(data.message);
      }
    })
  }
}
