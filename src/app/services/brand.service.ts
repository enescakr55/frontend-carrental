import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel } from '../models/brandresponsemodel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  ApiUrl = "https://localhost:44387/api/brands/getall";
  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<BrandResponseModel>{
    return this.httpClient.get<BrandResponseModel>(this.ApiUrl);
  }

  }
