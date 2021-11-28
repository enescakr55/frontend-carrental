import { AddImageToCarComponent } from './components/add-image-to-car/add-image-to-car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCarManagementComponent } from './components/admin-car-management/admin-car-management.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarsComponent } from './components/cars/cars.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { UserRentComponent } from './components/user-rent/user-rent.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarsComponent},
  {path:"customers",component:CustomersComponent,canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId",component:CarsComponent},
  {path:"cars/color/:colorId",component:CarsComponent},
  {path:"cars/filter/:colorId/:brandId",component:CarsComponent},
  {path:"cars/getCarDetails/:carId",component:CardetailComponent},
  {path:"rentals",component:RentalsComponent},
  {path:"car/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"brand/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"rental/add",component:RentalAddComponent,canActivate:[LoginGuard]},
  {path:"color/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"rental/add/:carId",component:RentalAddComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"user/rent/:carId",component:UserRentComponent,canActivate:[LoginGuard]},
  {path:"user/logout",component:LogoutComponent,canActivate:[LoginGuard]},
  {path:"user/update",component:ProfileUpdateComponent,canActivate:[LoginGuard]},
  {path:"admincarmanagement",component:AdminCarManagementComponent},
  {path:"addimagetocar/:carId",component:AddImageToCarComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
