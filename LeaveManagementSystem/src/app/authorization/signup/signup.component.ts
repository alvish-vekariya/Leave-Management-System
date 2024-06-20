import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private formBuilder: FormBuilder){

  }

  signupForm = this.formBuilder.group({
    username : ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    password : ['', [Validators.required, Validators.minLength(8)]],
    email : ['', [Validators.required, Validators.email]],
    role : ['', Validators.required]
  })

  submitSignup(){
    console.log(this.signupForm.controls.email)
    // console.log(this.signupForm.value);
  }

}
