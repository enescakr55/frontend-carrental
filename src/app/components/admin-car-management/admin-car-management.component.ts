import { Brand } from './../../models/brand';
import { CarImage } from './../../models/carimage';
import { environment } from './../../../environments/environment';
import { Car } from './../../models/car';
import { ToastrService } from 'ngx-toastr';
import { CarimageService } from './../../services/carimage.service';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/cardetail';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-admin-car-management',
  templateUrl: './admin-car-management.component.html',
  styleUrls: ['./admin-car-management.component.css']
})
export class AdminCarManagementComponent implements OnInit {

  dataLoaded = false;
  vip = true;
  carDetails:CarDetail[] = [];
  cars :Car[]=[];
  ImageAddress = environment.mainLink;
  DefaultImagePath = "/carimages/default.jpg";
  getCarImage:CarImage[] = [];
  pipeColor:Color |null = null;
  pipeBrand:Brand | null = null;
  pipeCarName:string | null = null;
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private carimageService:CarimageService,private toastrService:ToastrService) { }

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
  deleteCar(carId:number){
    console.log(carId)
    this.carService.delete(carId).subscribe(response=>{
      this.toastrService.success(response.message);
    },error=>{
      this.toastrService.error("İşlem başarısız");
    })
  }
}
