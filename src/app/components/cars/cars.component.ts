import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { CarImage } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  dataLoaded = false;
  carDetails:CarDetail[] = [];
  cars:Car[]=[];
  ImageAddress = "https://localhost:44387";
  DefaultImagePath = "/CarImages/default.jpg";
  getCarImage:CarImage[];
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private carimageService:CarimageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
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
    })
  }
  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  getCarsByColorId(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }


}
