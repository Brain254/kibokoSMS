import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'app/shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userInfo:FormGroup;
  constructor(public authservices:AuthService,private alert:AlertService) { }

  ngOnInit() {
    this.userInfo=new FormGroup({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",Validators.required)
      
    });
    
   // this.alert.showSuccess('Bingo');

  }

  doLogin(userInfo:FormGroup){
    //console.log("Email="+userInfo.controls.email.value,"Password="+userInfo.controls.password.value);
    this.authservices.SignIn(userInfo.controls.email.value,userInfo.controls.password.value);
  }

  doGoogleLogin(){
    this.authservices.GoogleAuth();
  }

}
