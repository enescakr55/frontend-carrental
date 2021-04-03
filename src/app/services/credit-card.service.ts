import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private httpClient:HttpClient) { }
  getMyCreditCards(){
    let apiLink = environment.apiUrl+"loggeduser/getmycreditcards";
    return this.httpClient.get<ListResponseModel<CreditCard>>(apiLink);
  }
}
