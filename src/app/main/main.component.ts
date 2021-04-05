import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { StandingOrder } from '../Models/StandingOrder';
import { Customer } from '../Models/Customer';
import { Customer_Bill } from '../Models/Customer_Bill';
import { Institution } from '../Models/Institution';
import { BankAccount } from '../Models/BankAccount';
import { fakeAsync } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'





@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  standingOs_main: StandingOrder[];
  selectedOrder = null;
  Customers_list_main: Customer[];
  selected_Customer = null;
  CustomerBills_list_main: Customer_Bill[];
  selected_Bill = null;
  Institutions_list_main: Institution[];
  selected_institution = null;
  BankAccounts_list_main: BankAccount[];
  selected_bank_acc = null;
  what_link_pressed;

  open_new_window = false;



  constructor(private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router) { }


  ngOnInit(): void {
    const masab_token = this.cookieService.get('masab-token');
    if (!masab_token) {
      this.router.navigate(['/auth']);
    }
    else {


      this.apiService.getStandingOrders().subscribe(
        (data: StandingOrder[]) => {
          this.standingOs_main = data;
        },
        error => console.log(error)
      );
      this.apiService.getCustomers().subscribe(
        (data: Customer[]) => {
          this.Customers_list_main = data;
        },
        error => console.log(error)
      );

      this.apiService.getBankAccounts().subscribe(
        (data: BankAccount[]) => {
          this.BankAccounts_list_main = data;
        },
        error => console.log(error)
      );

      this.apiService.getInstitutions().subscribe(
        (data: Institution[]) => {
          this.Institutions_list_main = data;
        },
        error => console.log(error)
      );

      this.apiService.getCustomerBills().subscribe(
        (data: Customer_Bill[]) => {
          this.CustomerBills_list_main = data;

        },
        error => console.log(error)
      );
    }

   
    this.selectedOrder = null;

    this.selected_Customer = null;

    this.selected_Bill = null;
  
    this.selected_institution = null;

    this.selected_bank_acc = null;
  
  }



  selectedTheOrder(order) {
    this.selectedOrder = order;
    // console.log('Selected Order'+  this.selectedOrder);
  }


  selectedCustomer(cust) {
    this.selected_Customer = cust;
    // console.log('Selected Order'+  this.selectedOrder);
  }

  selectedBankAcc(bankAcc) {
    this.selected_bank_acc = bankAcc;
    // console.log('Selected Order'+  this.selectedOrder);
  }
  selectedInstitution(inst) {
    this.selected_institution = inst;
    // console.log('Selected Order'+  this.selectedOrder);
  }

  UpdateDataAfterUpdate() {
    this.ngOnInit();
  }


  selectedLink(link) {
    this.what_link_pressed = link.target.attributes[1].value;
    //console.log(this.what_link_pressed);
  }



}
