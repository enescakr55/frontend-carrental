import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDetailResponseModel } from '../models/cardetailresponsemodel';

@Injectable({
  providedIn: 'root'
})
export class CardetailsService {
  apiUrl = "https://localhost:44387/api/cars/getcardetails";

  constructor(private httpClient: HttpClient) { }
  getCarDetails():Observable<CarDetailResponseModel>{
    return this.httpClient.get<CarDetailResponseModel>(this.apiUrl);
  }
}
