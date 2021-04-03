
import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class StorageTokenServiceService {
  
  constructor() { }
  addToken(tokenInfo:TokenModel){
    localStorage.setItem("token",tokenInfo.token);
    localStorage.setItem("expire",tokenInfo.expiration);
  }
  removeToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("expire");
  }
  getToken(){
    let token:string | null =localStorage.getItem("token");
    let expiration:string | null = localStorage.getItem("expire");
    var tokenModel:TokenModel = {token: "",expiration:""};
    if(token != null && expiration != null){
      tokenModel.expiration = expiration;
      tokenModel.token = token;
    }
    return tokenModel;
  }
}
