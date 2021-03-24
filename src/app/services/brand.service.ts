import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<ListResponseModel<Brand>>{
    let apiLink = environment.apiUrl+"brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(apiLink);
  }
  getBrandbyId(brandId:number):Observable<SingleResponseModel<Brand>>{
    let apiLink = environment.apiUrl+"brands/getbyid?id="+brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(apiLink)
  }
  add(brand:Brand):Observable<ResponseModel>{
    let apiLink = environment.apiUrl+"brands/add";
    return this.httpClient.post<ResponseModel>(apiLink,brand);
  }

  }
