import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  ApiUrl ="https://localhost:44387/api/";
  constructor(private httpClient:HttpClient) { }
  getColors():Observable<ListResponseModel<Color>>{
    let apiLink = environment.apiUrl+"colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(apiLink);
  }
  getColorById(colorId:number):Observable<SingleResponseModel<Color>>{
    let apiLink = environment.apiUrl+"colors/getbyid?id="+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(apiLink);
  }
  add(color:Color):Observable<ResponseModel>{
    let apiLink = environment.apiUrl+"colors/add";
    return this.httpClient.post<ResponseModel>(apiLink,color);
  }
}
