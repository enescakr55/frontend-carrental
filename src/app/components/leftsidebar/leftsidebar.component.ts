import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandsComponent } from '../brands/brands.component';
import { ColorsComponent } from '../colors/colors.component';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit {
  clearedFilterClass:string;
  showAll:boolean = false;
  currentBrand:Brand | null = BrandsComponent.currentBrand;
  currentColor:Color | null = ColorsComponent.currentColor;
  constructor(private router:Router) {}

  ngOnInit(): void {
    
    this.router.events.subscribe(e=>{
      if(e instanceof NavigationEnd){
        if(this.router.url == "/"){
          this.showAll = true;
        }else{
          this.showAll = false;
        }
      }
    })

  }
  clearedFilter(){
        if(this.showAll == true){
          return "list-group-item active";
        }else{
          return "list-group-item";
        }
  }
  setParams(){
    BrandsComponent.currentBrand = null;
    ColorsComponent.currentColor = null;
    this.showAll = true;
  }
  getColorAndBrand(){
    this.currentBrand = BrandsComponent.currentBrand;
    this.currentColor = ColorsComponent.currentColor;
    console.log(this.currentBrand);
    console.log(this.currentColor);
    window.location.href = "/cars/filter/"+this.currentColor?.colorId+"/"+this.currentBrand?.brandId;
  }
}
