import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  currentBrand?:Brand;
  brands:Brand[]=[];
  dataLoaded=false;
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
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
    console.log(brand.brandName);
    this.currentBrand = brand;
  }
  getAllCarsClass(){
    if(!this.currentBrand){
      return "list-group-item active";
    }
    return "list-group-item"
  }
  clearCurrentBrand(){
    this.currentBrand = undefined;
  }
}
