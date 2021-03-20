import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rentals';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }
    getRentals():Observable<ListResponseModel<Rental>>{
      let apiLink = environment.apiUrl+"rentals/getall";
      return this.httpClient.get<ListResponseModel<Rental>>(apiLink);
    }
}
