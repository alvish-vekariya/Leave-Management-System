import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder){

  }

  loginForm = this.formBuilder.group({
    username : ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    password : ['', [Validators.required, Validators.minLength(8)]]
  })

  loginSubmit(){}
}
