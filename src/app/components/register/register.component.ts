import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService) { }
  registerForm:FormGroup;
  ngOnInit(): void {
    this.createRegisterModel();
  }
  createRegisterModel(){
    this.registerForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
    })
    

  }
  register(){
    if(this.registerForm.valid){
      let registerModel:RegisterModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success(response.message,"Kayıt Başarılı");
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("expire",response.data.expiration);
        window.location.href = "/";
      },responseError=>{
        this.toastrService.error(responseError.error,"Kayıt başarısız");
      })
    }else{
      this.toastrService.error(environment.formnotvalidmessage,environment.formnotvalidtitle);
    }
  }
  gotoLoginPage(){
    window.location.href="/login";
  }

}
