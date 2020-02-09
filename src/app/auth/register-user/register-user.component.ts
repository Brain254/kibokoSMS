import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  userReg:FormGroup;
  constructor(private authservice:AuthService) { }

  ngOnInit() {
    this.userReg=new FormGroup({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",Validators.required)
    });

  }

  onSubmit(userReg:FormGroup){
    this.authservice.SignUp(userReg.controls.email,userReg.controls.password);
  }

}
