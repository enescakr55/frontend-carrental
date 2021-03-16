import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './components/brands/brands.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarsComponent } from './components/cars/cars.component';
import { CustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarsComponent},
  {path:"customers",component:CustomersComponent},
  {path:"cars/brand/:brandId",component:CarsComponent},
  {path:"cars/color/:colorId",component:CarsComponent},
  {path:"cars/getCarDetails/:carId",component:CardetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
