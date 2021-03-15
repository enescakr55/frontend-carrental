import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ImageAddress = "https://localhost:44387";
  DefaultImagePath = "/CarImages/default.jpg";
  constructor(private cardetailsService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCarDetails();

    
  }
  getCarDetails(){
    this.cardetailsService.getCarDetails().subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByBrand(brandId:number){

  }

}
