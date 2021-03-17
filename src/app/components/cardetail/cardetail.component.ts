import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { CarImage } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private carimageService:CarimageService) { }
  mainLink = environment.mainLink;
  carId:number;
  cardetails:CarDetail[];
  carImages:CarImage[];
  activeItem =  "active";
  carImageInfos:any[] = [];

  ngOnInit(): void {
  this.activatedRoute.params.subscribe(params=>{
    this.carId = params["carId"];
  })
  this.getCarDetails();
  this.getCarImagesByCarId();
  }
  getCarDetails(){
    this.carService.getCarDetailById(this.carId).subscribe(response=>{
      this.cardetails = response.data;
    })
  }
  getCarImagesByCarId(){
    this.carimageService.getCarImagesByCarId(this.carId).subscribe(response=>{
      let x = 0;
      response.data.forEach(element => {
        if(x==0){
          this.carImageInfos[x] = {"active":"active",element};
          x+=1;
        }else{
          this.carImageInfos[x] = {"active":"",element};
          x+=1;
        }
      });
      console.log("carImage");
      console.log(this.carImageInfos);
    })
  }
}
