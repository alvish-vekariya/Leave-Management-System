import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IsignupData } from 'src/app/core/interfaces/authentication.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private formBuilder: FormBuilder, private authService:AuthenticationService, private route: Router){

  }

  signupForm = this.formBuilder.group({
    username : ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    password : ['', [Validators.required, Validators.minLength(8)]],
    email : ['', [Validators.required, Validators.email]],
    role : ['', Validators.required],
    gender : ['', Validators.required],
    dob : ['', Validators.required],
    fullname : ['', Validators.required]
  })

  submitSignup(){
    const signupData = this.signupForm.value as IsignupData;
    this.authService.signup(signupData).subscribe((data: any)=>{
      if(data.status == true){
        this.route.navigateByUrl('/auth/login');
        alert(data.message);
      }else{
        alert(data.message);
      }
    },err=>{alert(err.message)})
  }

}
