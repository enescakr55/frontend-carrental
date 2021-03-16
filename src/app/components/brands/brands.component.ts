import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  currentBrand:Brand | null;
  brands:Brand[]=[];
  dataLoaded=false;
  constructor(private brandService:BrandService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe(val=>{
      if(val instanceof NavigationStart){
        if(val instanceof NavigationStart){
          this.clearCurrentBrand();
        }
      }
    })
    this.getBrands();
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }
  getCurrentBrand(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item active";
    }
    return "list-group-item";
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }
  getAllCarsClass(){
    if(!this.currentBrand){
      return "list-group-item active";
    }
    return "list-group-item"
  }
  clearCurrentBrand(){
    this.currentBrand = null;
  }
}
