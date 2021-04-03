import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserProfileInfo } from 'src/app/models/userProfileInfo';
import { LoggedUserService } from 'src/app/services/logged-user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  userInfo:UserProfileInfo
  profileUpdateForm:FormGroup;
  ad:string = "";
  soyad:string = "";
  mail:string = "";
  constructor(private loggedUserService:LoggedUserService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createProfileUpdateForm();
    this.loggedUserService.getProfileInfo().subscribe(response=>{
      this.userInfo = response.data
      this.ad = this.userInfo.firstName;
      this.soyad=this.userInfo.lastName;
      this.mail=this.userInfo.email;
      console.log(this.userInfo);
    })
  }
  createProfileUpdateForm(){
    this.profileUpdateForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
    })
  }
  update(){
    if(this.profileUpdateForm.valid){
      let userInfoModel:UserProfileInfo;
      userInfoModel = Object.assign({},this.profileUpdateForm.value);
      this.loggedUserService.updateProfile(userInfoModel).subscribe(response=>{
        this.toastrService.success(response.message);
      })
    }else{
      this.toastrService.error(environment.formnotvalidmessage,environment.formnotvalidtitle);
    }

  }

}
