import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required]
    })
    
  }
  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      },errorResponse=>{
        if(errorResponse.error.Errors != undefined){
          if(errorResponse.error.Errors.length > 0){
            for(let i=0;i<errorResponse.error.Errors.length;i++){
              this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage);
            }
          }
        }
      })

    }else{
      this.toastrService.error("Form bilgilerini kontrol ediniz","Başarısız");
    }
  }
}
