import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { CarImage } from 'src/app/models/carimage';
import { Color } from 'src/app/models/color';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { ColorService } from 'src/app/services/color.service';
import { BrandsComponent } from '../brands/brands.component';
import { ColorsComponent } from '../colors/colors.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  dataLoaded = false;
  vip = true;
  carDetails:CarDetail[] = [];
  cars :Car[]=[];
  ImageAddress = "https://localhost:44387";
  DefaultImagePath = "/CarImages/default.jpg";
  getCarImage:CarImage[] = [];
  pipeColor:Color |null = null;
  pipeBrand:Brand | null = null;
  pipeCarName:string | null = null;
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private carimageService:CarimageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsColorAndBrand(params["colorId"],params["brandId"]);
      }else if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"]);
      }else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"]);
      }else{
        this.getCars();
      }
    })

    
  }
  getCarDetails(){
    this.carService.getCarDetails().subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
    })
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
        this.cars = response.data;
        this.dataLoaded = true;
        this.fillCarImages();
        console.log(this.getCarImage);
    })
  }
  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
      this.fillCarImages();
    })
  }
  getCarsByColorId(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
      this.fillCarImages();
    })
  }
  getCarsColorAndBrand(colorId:number,brandId:number){
    this.carService.getCarsBrandAndColor(colorId,brandId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
      this.fillCarImages();
    })
  }
  findCarAlert(){
    if(this.cars.length > 0){
      return this.cars.length+" tane araç bulundu";
    }else{
      return "Hiç araç bulunamadı";
    }
  }
  getCurrentBrand(){
    return this.pipeBrand;
  }
  getCurrentColor(){
    return this.pipeColor;
  }
  getCarImageByCarId(carId:number){
    this.carimageService.getCarImagesByCarId(carId).subscribe(response=>{
    this.getCarImage.push(response.data[0]);
    })
    
  }
  fillCarImages(){
    this.cars.forEach(car => {
      this.getCarImageByCarId(car.id);
    });
  }
  writeCarImageUrl(carId:number){
    let carImagePath = this.getCarImage.find(p=>p.carId==carId);
    return this.ImageAddress+carImagePath?.imagePath;
  }


}
