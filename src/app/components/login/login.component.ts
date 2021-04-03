import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private authService:AuthService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }
  loginForm:FormGroup;
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel:LoginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success(response.message,"Giriş yapıldı");
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("expire",response.data.expiration);
        window.location.href = "/";
      },responseError=>{
        this.toastrService.error(responseError.error,"Giriş Başarısız");
      })
    }else{
      this.toastrService.error(environment.formnotvalidmessage,environment.formnotvalidtitle);
    }
  }
  gotoRegisterPage(){
    window.location.href="/register";
  }

}
