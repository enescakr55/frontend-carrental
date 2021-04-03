import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoggedUserService } from 'src/app/services/logged-user.service';
import { StorageTokenServiceService } from 'src/app/services/storage-token-service.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private loggedUserService:LoggedUserService,private tokenService:StorageTokenServiceService) { }
  adsoyad:string;
  ad:string;
  showNav:boolean;
  expiremin:number;
  ngOnInit(): void {
    this.tokenBitisSuresi();
    this.getName();
    setInterval(()=>{
      this.tokenBitisSuresi();
    },10000);
  }
  getName(){
    this.loggedUserService.getName().subscribe(response=>{
      console.log(response.message);
      this.adsoyad = response.data;
      this.ad = this.adsoyad.split(" ")[0];
    });

  }
  renewToken(){
    this.loggedUserService.renewToken().subscribe(response=>{
      if(response.success){
        console.log(response);  
        this.tokenService.addToken(response.data);
        this.tokenBitisSuresi();
      }
    })
  }
  tokenBitisSuresi(){
    let currentDate = Date.now();
    let expireDate = new Date(this.tokenService.getToken().expiration);
    this.expiremin =  Math.round((expireDate.getTime()-currentDate)/1000/60);
    if(this.expiremin < 3 && this.expiremin > 0){
      this.renewToken();
    }

  }

}
