import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  defaultCarId:number | null = null;
  rentalAddForm:FormGroup;
  constructor(private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private toastrService:ToastrService,private rentalservice:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.defaultCarId = params["carId"];
      }else{
        this.defaultCarId = null;
      }
    })
    this.createRentalAddForm();
  }
  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      carId:["",Validators.required],
      customerId:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required],
    })
  }
  add(){
    if(this.rentalAddForm.valid){
      let rentalModel = Object.assign({},this.rentalAddForm.value);
      this.rentalservice.add(rentalModel).subscribe(response=>{
        console.log(response);
        this.toastrService.success(response.message,"Başarılı");
      },errorResponse=>{
        if(errorResponse.error.success == false){
          this.toastrService.error(errorResponse.error.message,"Başarısız");
        }
        if(errorResponse.error.Errors != undefined){
          if(errorResponse.error.Errors.length > 0){
            for(let i=0;i<errorResponse.error.Errors.lenght;i++){
              this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage);
            }
          }
        }
      })
    }else{
      this.toastrService.error("Formdaki bilgileri kontrol ediniz","Başarısız");
    }
  }
}
