import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/cardetail';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiLink:string;
  constructor(private httpClient: HttpClient) { }
  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    this.apiLink = environment.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiLink);
  }
  getCars():Observable<ListResponseModel<Car>>{
    this.apiLink = environment.apiUrl+"cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(this.apiLink);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    this.apiLink = environment.apiUrl+"cars/getbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(this.apiLink);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    this.apiLink = environment.apiUrl+"cars/getbycolor?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(this.apiLink);
  }
  getCarDetailById(carId:number):Observable<ListResponseModel<CarDetail>>{
    this.apiLink = environment.apiUrl+"cars/getcardetailbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiLink);
  }
  getCarsBrandAndColor(colorId:number,brandId:number):Observable<ListResponseModel<Car>>{
    this.apiLink = environment.apiUrl+"cars/getcarscolorandbrand?colorId="+colorId+"&brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(this.apiLink);
  }
}
