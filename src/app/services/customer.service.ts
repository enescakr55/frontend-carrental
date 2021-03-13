import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from '../models/customerdetailsresponsemodel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  ApiUrl="https://localhost:44387/api/customers/getcustomerdetails";
  constructor(private httpClient:HttpClient) { }

  getCustomerDetails():Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>(this.ApiUrl)
  }
}
