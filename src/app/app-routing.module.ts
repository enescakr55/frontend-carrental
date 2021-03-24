import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarsComponent } from './components/cars/cars.component';
import { CustomersComponent } from './components/customers/customers.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalsComponent } from './components/rentals/rentals.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarsComponent},
  {path:"customers",component:CustomersComponent},
  {path:"cars/brand/:brandId",component:CarsComponent},
  {path:"cars/color/:colorId",component:CarsComponent},
  {path:"cars/filter/:colorId/:brandId",component:CarsComponent},
  {path:"cars/getCarDetails/:carId",component:CardetailComponent},
  {path:"rentals",component:RentalsComponent},
  {path:"car/add",component:CarAddComponent},
  {path:"brand/add",component:BrandAddComponent},
  {path:"rental/add",component:RentalAddComponent},
  {path:"rental/add/:carId",component:RentalAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
