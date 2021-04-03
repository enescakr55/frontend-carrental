import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarsComponent } from './components/cars/cars.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ColorsComponent } from './components/colors/colors.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { LeftsidebarComponent } from './components/leftsidebar/leftsidebar.component';
import { FormsModule, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserRentComponent } from './components/user-rent/user-rent.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CarsComponent,
    RentalsComponent,
    BrandsComponent,
    ColorsComponent,
    CustomersComponent,
    CardetailComponent,
    LeftsidebarComponent,
    FilterPipe,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    RentalAddComponent,
    LoginComponent,
    RegisterComponent,
    UserRentComponent,
    LogoutComponent,
    ProfileUpdateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right",
    })

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
