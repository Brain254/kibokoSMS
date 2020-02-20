import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'app/shared/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formReset:FormGroup;
  constructor(private authservice:AuthService,router:Router,private alert:AlertService) { }

  ngOnInit() {
    this.formReset=new FormGroup({
      email:new FormControl("",[Validators.required,Validators.email]),
    });
  }

  doReset(formReset:FormGroup){
     this.authservice.ForgotPassword(formReset.controls.email.value)
     .then((response)=>{
       this.alert.showSuccess(response);
     })
     .catch((error)=>{
      this.alert.showError(error);
     });
  }

}
