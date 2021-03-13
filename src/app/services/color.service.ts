import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponseModel } from '../models/colorresponsemodel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  ApiUrl ="https://localhost:44387/api/colors/getall";
  constructor(private httpClient:HttpClient) { }
  getColors():Observable<ColorResponseModel>{
    return this.httpClient.get<ColorResponseModel>(this.ApiUrl);
  }
}
