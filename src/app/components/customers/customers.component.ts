import { Component, OnInit } from '@angular/core';
import { CustomerDetails } from 'src/app/models/customerdetails';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customerDetails:CustomerDetails[]=[];
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomerDetails();
  }
  getCustomerDetails(){
    this.customerService.getCustomerDetails().subscribe(response=>{
      this.customerDetails = response.data;
    });
  }

}
