import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.scss']
})
export class ApplyleaveComponent {
  constructor(private formBuilder: FormBuilder, private authservice: AuthenticationService){

  }
  
  leaveform = this.formBuilder.group({
    reason : ['', Validators.required],
    startDate : ['', Validators.required],
    endDate : ['', Validators.required],
    leaveType : ['', Validators.required]
  })

  applyleave(){
    this.authservice.applyleave(this.leaveform.value).subscribe((data: any)=>{
      if(data.status == true){
        // alert(data.message);
        Swal.fire({
          icon: "success",
          title: "Leave Applied!!",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          this.leaveform.reset();
        });
        
      }else{
        alert(data.message);
      }
    })
  }
}
