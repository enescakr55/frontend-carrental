import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rentals';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }
    getRentals():Observable<ListResponseModel<Rental>>{
      let apiLink = environment.apiUrl+"rentals/getall";
      return this.httpClient.get<ListResponseModel<Rental>>(apiLink);
    }
    add(rental:Rental):Observable<ResponseModel>{
      let apiLink = environment.apiUrl+"rentals/add";
      return this.httpClient.post<ResponseModel>(apiLink,rental);
    }
}
