import { ResponseModel } from './../models/responseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/carimage';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarimageService {
  apiLink:string;
  constructor(private httpClient:HttpClient) { }
  add(addImageModel:FormData):Observable<ResponseModel>{
    this.apiLink = environment.apiUrl+"carimages/add";
    return this.httpClient.post<ListResponseModel<CarImage>>(this.apiLink,addImageModel);
  }
  getCarImages():Observable<ListResponseModel<CarImage>>{
    this.apiLink = environment.apiUrl+"carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiLink);
  }
  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    this.apiLink = environment.apiUrl+"carimages/getbycarid?carid="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiLink);
  }


}
