import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarimageService } from './../../services/carimage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-image-to-car',
  templateUrl: './add-image-to-car.component.html',
  styleUrls: ['./add-image-to-car.component.css']
})
export class AddImageToCarComponent implements OnInit {
  carImageAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private carImageService:CarimageService,private toastrService:ToastrService,private activatedRoute:ActivatedRoute) { }
  formData:FormData = new FormData();
  fileName = '';
  paramsActive:boolean = false;
  currentId:number = 0;
  forceId:number = 0;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.paramsActive = true;
        this.formData.append("carId",params["carId"]);
        this.currentId = params["carId"];
        this.forceId = params["carId"];
      }
    })
  }

  processFile(event: any) {
    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;
        this.formData.append("resim", file);
    }
  }
  addCarId(event:any){
    if(this.paramsActive){
      this.toastrService.error("Id güncellenemez");
    }else{
      this.formData.append("carId",event.target.value);
    }

  }
  addImagePath(event:any){
    this.formData.append("imagePath",event.target.value);
  }
  add(){
    this.carImageService.add(this.formData).subscribe(response=>{
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
    }
    )
  }


}
