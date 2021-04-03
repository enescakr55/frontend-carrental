import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { logging } from 'selenium-webdriver';
import { CarDetail } from 'src/app/models/cardetail';
import { CarRentAndPayDto } from 'src/app/models/carRentAndPayDto';
import { CreditCard } from 'src/app/models/creditCard';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LoggedUserService } from 'src/app/services/logged-user.service';
import { RequiredScoreService } from 'src/app/services/required-score.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-rent',
  templateUrl: './user-rent.component.html',
  styleUrls: ['./user-rent.component.css']
})
export class UserRentComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private toastrService:ToastrService,private loggedUserService:LoggedUserService,private creditCardService:CreditCardService,private carService:CarService,private requiredScoreService:RequiredScoreService) { }
  rentalAddForm:FormGroup;
  carId:number;
  carInfo:CarDetail;
  OdenecekUcret?:number=undefined;
  savedCardsNumber:number = 0;
  savedCardMessage:string;
  savedCards:CreditCard[];
  creditCard:CreditCard;
  requiredScore:number;
  userFindexScore:number;
  modalStyle="display:none;";
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.carId = parseInt(params["carId"]);
    })
    this.createRentalAddForm();
    this.getMyCreditCards();
    this.getCarInfo();
    this.getUserFindexScore();
  }
  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      carId:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required],
      cardNo:["",Validators.required],
      cvv:["",Validators.required],
      sonKullanim:["",Validators.required],
    })
  }
  add(){
    if(this.gunFarkiBul() < 1){
      this.toastrService.error("Kiralama ve Geri alma tarihi arasında minimum 1 gün fark olmalıdır.");
      return;
    }
    if(this.OdenecekUcret == undefined || this.OdenecekUcret < 0){
      this.toastrService.error("Seçtiğiniz gün aralığını kontrol ediniz");
      return;
    }
    if(this.userFindexScore < this.requiredScore){
      this.toastrService.error("Findeks puanınız yetersiz olduğu için araba kiralanamıyor.");
      return;
    }
    if(this.rentalAddForm.valid){
      let rentalAddModel:CarRentAndPayDto = Object.assign({},this.rentalAddForm.value);
      console.log(rentalAddModel);
      this.loggedUserService.rentCar(rentalAddModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
        this.creditCard = {id:0,cardName:"",userId:0,cardNo:rentalAddModel.cardNo,sonKullanim:rentalAddModel.sonKullanim,cvv:rentalAddModel.cvv};
        this.showCardSaveModal();
      },responseError=>{
        console.log(responseError);
        if(responseError.error.message != undefined){
          this.toastrService.error(responseError.error.message);
        }
        if(responseError.error.Errors.length > 0){
            for(let i=0;i<responseError.error.Errors.length;i++){
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Hata oluştu");
            }
        }
      })
    }else{
      this.toastrService.error(environment.formnotvalidmessage,environment.formnotvalidtitle);
    }
  }
  saveCard(){
    if(this.rentalAddForm.valid){
      this.creditCard.cardName = (<HTMLInputElement>document.getElementById("kartAdi")).value.toString();
      console.log(this.creditCard.cardName);
      if(this.creditCard.cardName == "" ||this.creditCard.cardName == undefined){
        this.toastrService.error("Kart adını boş bırakmayınız");
      }else{
        this.loggedUserService.saveCreditCard(this.creditCard).subscribe(response=>{
          if(response.success){
            this.toastrService.success(response.message,"Başarılı");
          }
          
        },responseError=>{
          console.log(responseError);
          if(responseError.error.message != undefined){
            this.toastrService.error(responseError.error.message);
          }
          if(responseError.error.Errors.length > 0){
              for(let i=0;i<responseError.error.Errors.length;i++){
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Hata oluştu");
              }
          }
        })
      }
    }else{
      this.toastrService.error(environment.formnotvalidmessage,environment.formnotvalidtitle);
    }
  }
  getMyCreditCards(){
    this.creditCardService.getMyCreditCards().subscribe(response=>{
      if(response.success){
        if(response.data.length > 0){
          this.savedCardsNumber = response.data.length;
          this.savedCardMessage = "Ödeme yapmak için "+this.savedCardsNumber+" adet kayıtlı kartınız bulunmaktadır.";
          this.savedCards = response.data;
          console.log(this.savedCards[0].cardName);
          console.log(this.savedCards);
        }else{
          this.savedCardMessage = "Ödeme için kayıtlı kartınız bulunmamaktadır.";
        }
      }
    });
  }
  showCardSaveModal(){
    this.modalStyle = "display:block;";
  }
  closeModal(){
    this.modalStyle = "display:none;";
  }
  useCard(cardId:number){
    
    let selectedCard = this.savedCards.find(p=>p.id == cardId);
    let cardNoInput = (<HTMLInputElement>document.getElementById("cardNo"));
    let cvvInput = (<HTMLInputElement>document.getElementById("cvv"));
    let sonkullanimInput = (<HTMLInputElement>document.getElementById("sonKullanim"));
    if(cardNoInput != undefined && selectedCard != undefined && cvvInput != undefined && sonkullanimInput != undefined ){
      cardNoInput.value = selectedCard.cardNo;
      cardNoInput.dispatchEvent(new Event('input'));
      cvvInput.value = selectedCard.cvv;
      cvvInput.dispatchEvent(new Event('input'));
      sonkullanimInput.value = selectedCard.sonKullanim;
      sonkullanimInput.dispatchEvent(new Event('input'));
    }
  }
  gunFarkiBul(){
    let fark =new Date((<HTMLInputElement>document.getElementById('returnDate')).value).getTime() - new Date(((<HTMLInputElement>document.getElementById('rentDate')).value)).getTime();
    let gunfarki = ((fark / 1000) / 86400);
    this.OdenecekUcret = gunfarki*this.carInfo.dailyPrice;
    console.log(this.OdenecekUcret);
    return gunfarki;
  }
  getCarInfo(){
    this.carService.getCarDetailById(this.carId).subscribe(response=>{
      this.carInfo =response.data[0];
      this.requiredScoreService.getRequiredScoreByCarId(this.carInfo.id).subscribe(result=>{
        console.log(result);
        this.requiredScore = result.data == null ? 0 : result.data.minimumScore;
      });
    })

  }
  getUserFindexScore(){
    this.loggedUserService.getFindexScore().subscribe(response=>{
      this.userFindexScore = response.data == null ? 0 : response.data.score;
    })
  }


}
