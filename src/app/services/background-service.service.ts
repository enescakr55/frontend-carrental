import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class BackgroundServiceService {

  constructor(private httpClient:HttpClient) { }
  renewToken(){
    let apiLink = environment.apiUrl+"loggeduser/renewtoken";
    return this.httpClient.get<SingleResponseModel<TokenModel>>(apiLink);
  }
}
