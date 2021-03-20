import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { Color } from '../models/color';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Car[], colorFilter:Color | null,brandFilter:Brand | null,carName:string|null): Car[] {
    let filtered;
    filtered = value;
    if(colorFilter){
      filtered = filtered.filter(p=>p.colorId === colorFilter.colorId);
    }
    if(brandFilter){
      filtered = filtered.filter(p=>p.brandId === brandFilter.brandId);
    }
    if(carName){
      filtered = filtered.filter(p=>p.carName.toLocaleLowerCase().indexOf(carName.toLocaleLowerCase()) !== -1);
    }
    return filtered;
  }

}
