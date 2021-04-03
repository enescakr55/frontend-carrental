import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  brands:Brand[];
  colors:Color[];
  carAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private carService:CarService,private toastrService:ToastrService,private brandService:BrandService,private colorService:ColorService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.markaGetir();
    this.renkGetir();
  }
  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
    })
  }
  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);
      console.log(carModel);
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,'Başarılı')
      },responseError=>{
        console.log(responseError);
        if(responseError.error.Errors != undefined){
          if(responseError.error.Errors.length>0){
            for(let i=0;i<responseError.error.Errors.length;i++){
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
            }
          }
        }
      })
    }else{
      this.toastrService.error(environment.formnotvalidmessage,environment.formnotvalidtitle);
    }
  }
  markaGetir(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }
  renkGetir(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }
}
