import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stringify } from '@angular/compiler/src/util';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/cardetail';

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
}
