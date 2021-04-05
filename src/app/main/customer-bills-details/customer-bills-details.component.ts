import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { BankAccount } from 'src/app/Models/BankAccount';
import { Customer } from 'src/app/Models/Customer';
import { Customer_Bill } from 'src/app/Models/Customer_Bill';
import { Institution } from 'src/app/Models/Institution';
import { StandingOrder } from 'src/app/Models/StandingOrder';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../modal';

export class Show_Bill {
  bill_: Customer_Bill;
  customer_: Customer;
  amount_: number;
  inst_: Institution;
  so_:StandingOrder;
}


@Component({
  selector: 'app-customer-bills-details',
  templateUrl: './customer-bills-details.component.html',
  styleUrls: ['./customer-bills-details.component.css']
})
export class CustomerBillsDetailsComponent implements OnInit, OnChanges {


  filter_by_single_date = false;
  filter_by_range_date = false;
  filter_by_institution = false;
  filter_by_customer = false;
  submitted;
  fillter_result = null;
  bills_arr;
  @Input() standingOrders_in_bills: StandingOrder[];
  @Input() institutions_list_in_bills: Institution[];
  @Input() bankAccounts_list_in_bills: BankAccount[];
  @Input() customers_list_in_bills: Customer[];
  @Input() customers_bills_list_in_bills: Customer_Bill[];


  Filtered_standingOrders: StandingOrder[];
  Filtered_institutions: Institution[];
  Filtered_customers: Customer[];




  Bill_Filter_Form = new FormGroup({
    filter_date: new FormControl('',Validators.required),
    filter_range_date: new FormControl('',Validators.required),
    filter_inst: new FormControl('',Validators.required),
    filter_customer: new FormControl('',Validators.required),
  }, { updateOn: 'blur' });

  constructor(private modalService: ModalService) { }

  ngOnInit(): void { }




  get_Object_by_id(list, search_val) {
    let found = null;
    for (let key in list) {
      if (list[key].id == search_val) {
        found = list[key];
        //console.log(found.first_name);
        return found;
      }
    }

  }


  Is_Exist_In_Show(search_val) {
    for (let key in this.bills_arr) {
      if (this.bills_arr[key].bill_.id == search_val) {
        return true;
      }
    }
    return false;

  }

  openModal(id: string) {

    this.modalService.open(id);

  }

  closeModal(id: string) {
    // console.log(id);
    this.modalService.close(id);

  }

  ngOnChanges() {
    this.Bill_Filter_Form.reset();

  }

  format_date_for_me(date: Date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()))
    var result = JSON.stringify(utcDate);
    // return result;
    return ((result.substr(1, 4)) + '-' + (result.substr(6, 2)) + '-' + (result.substr(9, 2)));


  }


  format_range_for_me(date_arr) {
    var fixed_date = new Array<String>();
    fixed_date.push(this.format_date_for_me(date_arr[0]));
    fixed_date.push(this.format_date_for_me(date_arr[1]));
    return fixed_date;

  }

  show_filtered_bills() {

    this.submitted=true;
/*     if(this.Bill_Filter_Form.get('filter_date').errors||
    this.Bill_Filter_Form.get('filter_range_dat').errors ||
    this.Bill_Filter_Form.get('filter_inst').errors||
    this.Bill_Filter_Form.get('filter_customer').errors){
      return;
    } */


    this.bills_arr = new Array<Show_Bill>();
    
//console.log(this.filter_by_single_date, this.filter_by_range_date,this.filter_by_institution, this.filter_by_customer);

    if (this.filter_by_single_date) {
      if(this.Bill_Filter_Form.get('filter_date').errors){
        return;
      }
      var my_date_check;
      my_date_check = this.format_date_for_me(this.Bill_Filter_Form.get('filter_date').value);
      this.Filtered_standingOrders = this.standingOrders_in_bills.filter(so => so.billing_date == my_date_check);
    }
    else if (this.filter_by_range_date) {
      if(this.Bill_Filter_Form.get('filter_range_date').errors){
        return;
      }
      var my_range_check;
      my_range_check = this.format_range_for_me(this.Bill_Filter_Form.get('filter_range_date').value);
      this.Filtered_standingOrders = this.standingOrders_in_bills.filter(
            so => so.billing_date >= my_range_check[0] && so.billing_date <= my_range_check[1]);
        
    }
    else{
      this.Filtered_standingOrders = this.standingOrders_in_bills;
    }

      if (this.filter_by_institution) {
        if(this.Bill_Filter_Form.get('filter_inst').errors){
          return;
        }
        var my_inst_check;
        my_inst_check = (this.Bill_Filter_Form.get('filter_inst').value);
        this.Filtered_standingOrders = this.Filtered_standingOrders.filter(so => so.institution == my_inst_check.id);
      }

      if (this.filter_by_customer) {
        if(this.Bill_Filter_Form.get('filter_customer').errors){
          return;
        }
        var my_customer_check: Customer;
        my_customer_check = (this.Bill_Filter_Form.get('filter_customer').value);
      }


     // console.log( this.Filtered_standingOrders);

      for (var so of this.Filtered_standingOrders) {

        var temp_bill_arr: Customer_Bill[];
        temp_bill_arr = so.customer_bill;
   
        for (var bill of temp_bill_arr) {
          var customer_temp: Customer;
          customer_temp = (this.get_Object_by_id(this.customers_list_in_bills, this.get_Object_by_id(this.customers_bills_list_in_bills, bill).customer));
          if (this.filter_by_customer) {
            if (my_customer_check.id != customer_temp.id){
              continue;
            }
          }
        
          this.bills_arr.push({
            bill_: this.get_Object_by_id(this.customers_bills_list_in_bills, bill),
            customer_: customer_temp,
            inst_: this.get_Object_by_id(this.institutions_list_in_bills, so.institution),
            so_:so,
          });
        }

      }
    


    this.openModal('Filtered_bills_Modal');
    this.submitted=false;
  }

  change_to_number(str) {
    return Number(str);
  }


}
