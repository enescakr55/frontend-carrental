import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
