import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carImageResponseModel } from '../models/carimageresponsemodel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {
  apiUrl = "https://localhost:44387/api/carimages/getall";
  constructor(private httpClient:HttpClient) { }
  getCarImages():Observable<carImageResponseModel>{
    return this.httpClient.get<carImageResponseModel>(this.apiUrl);
  }
  
}
