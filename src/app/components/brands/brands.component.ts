import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  public static currentBrand:Brand | null;
  brands:Brand[]=[];
  dataLoaded=false;
  selectedBrand:number;
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
      //this.selectedBrand = this.brands[0].brandId;
    })
  }
  getCurrentBrand(brand:Brand){
    if(brand == BrandsComponent.currentBrand){
      return "selected";
    }
    return "";
  }
  setCurrentBrand(brandId:number){
    this.brandService.getBrandbyId(brandId).subscribe(response=>{
      BrandsComponent.currentBrand = response.data;
    })
  }
  getAllCarsClass(){
    if(!BrandsComponent.currentBrand){
      return "list-group-item active";
    }
    return "list-group-item"
  }
  clearCurrentBrand(){
    BrandsComponent.currentBrand = null;
  }
}
