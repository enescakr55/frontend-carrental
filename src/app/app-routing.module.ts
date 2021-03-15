import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './components/brands/brands.component';
import { CarsComponent } from './components/cars/cars.component';
import { CustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarsComponent},
  {path:"musteriler",component:CustomersComponent},
  {path:"arabalar/markalar/:markaId",component:CarsComponent},
  {path:"arabalar/renkler/:renkId",component:CarsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
