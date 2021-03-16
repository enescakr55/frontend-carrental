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
  getCarImages():Observable<ListResponseModel<CarImage>>{
    this.apiLink = environment.apiUrl+"carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiLink);
  }
  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    this.apiLink = environment.apiUrl+"carimages/getbycarid?carid="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiLink);
  }

  
}
