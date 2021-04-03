import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { RequiredScore } from '../models/requiredScore';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RequiredScoreService {

  constructor(private httpClient:HttpClient) { }
  getRequiredScoreByCarId(carId:number):Observable<SingleResponseModel<RequiredScore>>{
    let apiLink=environment.apiUrl+"requiredscore/getrequiredscore?carId="+carId;
    return this.httpClient.get<SingleResponseModel<RequiredScore>>(apiLink);
  }
}
