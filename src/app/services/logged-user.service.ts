import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarRentAndPayDto } from '../models/carRentAndPayDto';
import { CreditCard } from '../models/creditCard';
import { FindexScore } from '../models/findexScore';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserProfileInfo } from '../models/userProfileInfo';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  constructor(private httpClient:HttpClient) { }
  getName():Observable<SingleResponseModel<string>>{
    let apiLink = environment.apiUrl+"loggeduser/adsoyad";
    return this.httpClient.get<SingleResponseModel<string>>(apiLink);
  }
  rentCar(carandpaydto:CarRentAndPayDto):Observable<ResponseModel>{
    let apiLink = environment.apiUrl+"loggeduser/rent";
    return this.httpClient.post<ResponseModel>(apiLink,carandpaydto);
  }
  updateProfile(userInfo:UserProfileInfo){
    let apiLink = environment.apiUrl+"loggeduser/updateprofile";
    return this.httpClient.post<ResponseModel>(apiLink,userInfo);
  }
  getProfileInfo():Observable<SingleResponseModel<UserProfileInfo>>{
    let apiLink = environment.apiUrl+"loggeduser/getprofileinfo";
    return this.httpClient.get<SingleResponseModel<UserProfileInfo>>(apiLink);
  }
  renewToken():Observable<SingleResponseModel<TokenModel>>{
    let apiLink = environment.apiUrl+"loggeduser/renewtoken";
    return this.httpClient.get<SingleResponseModel<TokenModel>>(apiLink);
  }
  saveCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    let apiLink = environment.apiUrl+"loggeduser/savecreditcard";
    return this.httpClient.post<ResponseModel>(apiLink,creditCard);
  }
  getFindexScore(){
    let apiLink = environment.apiUrl+"loggeduser/getfindexscore";
    return this.httpClient.get<SingleResponseModel<FindexScore>>(apiLink);
  }

}
