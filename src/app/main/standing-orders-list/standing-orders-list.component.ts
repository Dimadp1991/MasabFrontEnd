import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StandingOrder } from 'src/app/Models/StandingOrder';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { ApiService } from '../../api.service';
import { ModalService } from '../modal';
import { Institution } from 'src/app/Models/Institution';
import { BankAccount } from 'src/app/Models/BankAccount';
import { Customer } from 'src/app/Models/Customer';
import { Customer_Bill } from 'src/app/Models/Customer_Bill';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-standing-orders-list',
  templateUrl: './standing-orders-list.component.html',
  styleUrls: ['./standing-orders-list.component.css']
})
export class StandingOrdersListComponent implements OnInit {


  @Input() standingOrders_list_list: StandingOrder[];
  @Input() institutions_list_list: Institution[];
  @Input() bankAccounts_list_list: BankAccount[];
  @Input() customers_list_list: Customer[];
  @Input() customers_bills_list_list: Customer_Bill[];

  @Output() selectOrder = new EventEmitter();
  @Output() updateView = new EventEmitter();
  open_create_new_form = false;
  submitted=false;
  bodyText: string;
  order_to_delete;
  Create_New_OrderForm = new FormGroup({
    user: new FormControl(),
    billing_date: new FormControl(''),
    billing_start_period: new FormControl(''),
    billing_end_period: new FormControl(''),
    date_created: new FormControl(new Date()),
    currency: new FormControl(''),
    activity_type: new FormControl('504'),
    institution: new FormControl(''),
    customer_bill: new FormControl([])
  }, { updateOn: 'blur' });


  CreateInst_Form = new FormGroup({
    id: new FormControl(''),
    institution_name: new FormControl('', [Validators.required, Validators.maxLength(30),Validators.pattern(/^([^0-9]*)$/)]),
    institution_id: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, { updateOn: 'blur' });


  constructor(private modalService: ModalService,
    private apiService: ApiService,private cookieService: CookieService) { }

  ngOnInit() {

  }

  OrderClicked(Order) {
    this.selectOrder.emit(Order);

  }
  openModal(id: string) {

    this.modalService.open(id);
  }

  closeModal(id: string) {
  
    this.modalService.close(id);
  }


  Set_to_delete(i) {
    //console.log(i);
    this.order_to_delete = i;
  }

  DeleteOrder_clicked(order_to_delete) {
    this.apiService.DeleteStandingOrder(order_to_delete).subscribe(
      result => {
        this.updateView.emit();
        console.log('Deleted : ', result);
      },
      error => console.log(error)
    );

  }

  get_Object_by_id(list, search_val) {
    let found = null;
    for (let key in list) {
      if (list[key].id == search_val) {
        found = list[key];
        //console.log(found.institution_name);
        return found;
      }
    }

  }

  CreateNewSO_clicked() {
    this.Create_New_OrderForm.patchValue({
      user:Number(this.cookieService.get('masab-token-id')),
      billing_date: this.original_Date_formatdate(this.Create_New_OrderForm.get('billing_date').value),
      billing_start_period: this.original_Date_formatdate(this.Create_New_OrderForm.get('billing_start_period').value),
      billing_end_period: this.original_Date_formatdate(this.Create_New_OrderForm.get('billing_end_period').value),
      date_created: this.original_Date_formatdate(this.Create_New_OrderForm.get('date_created').value),
    });

    this.apiService.CreateStandingOrder(this.Create_New_OrderForm).subscribe(
      (result: StandingOrder) => {
        console.log('Update Form: ', result);
        this.updateView.emit();
        this.Create_New_OrderForm.reset();
      },
      error => console.log(error)
    );


  }


  CreateInst_clicked() {
    this.submitted=true;
    if (!this.CreateInst_Form.get('institution_name').errors && !this.CreateInst_Form.get('institution_id').errors) {
      this.closeModal('create_new_inst_in_so');
      
    }
    else{
      return;
    }


    this.apiService.CreateInstitution(this.CreateInst_Form).subscribe(
      result => {
        this.updateView.emit();
        console.log('Create Form: ', result);
      },
      error => console.log(error)
    );

  }


  original_Date_formatdate(date: any) {

    if (date instanceof Date) {
      let string = JSON.stringify(date);

      // After: JSON.stringify keeps date as-is!
      Date.prototype.toJSON = function () {
        const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
        this.setHours(hoursDiff);
        return this.toISOString();
      };
      var str = JSON.stringify(date);
      //console.log(str);
      //console.log(str.substr(1, 10));

      // let str = date.toJSON();


      return (str.substr(1, 10));
    }
    return ((date.substr(6, 4)) + '-' + (date.substr(3, 2)) + '-' + (date.substr(0, 2)));
  }





}

