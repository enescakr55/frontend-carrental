import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetails } from '../models/customerdetails';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  ApiUrl="https://localhost:44387/api/customers/getcustomerdetails";
  constructor(private httpClient:HttpClient) { }

  getCustomerDetails():Observable<ListResponseModel<CustomerDetails>>{
    return this.httpClient.get<ListResponseModel<CustomerDetails>>(this.ApiUrl)
  }
}
