import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { BankAccountCheckerService} from '../bank-account-checker.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../modal';
import { BsDatepickerAbstractComponent } from 'ngx-bootstrap/datepicker/base/bs-datepicker-container';
import { StandingOrder } from 'src/app/Models/StandingOrder';
import { Customer_Bill } from 'src/app/Models/Customer_Bill';
import { BankAccount } from 'src/app/Models/BankAccount';
import { saveAs } from 'file-saver/dist/FileSaver';

@Component({
  selector: 'app-standing-orders-details',
  templateUrl: './standing-orders-details.component.html',
  styleUrls: ['./standing-orders-details.component.css']
})
export class StandingOrdersDetailsComponent implements OnInit, OnChanges {

  @Input() standingOrder: StandingOrder;
  @Input() institutions_list;
  @Input() bankAccounts_list;
  @Input() customers_list;
  @Input() customers_bills_list;
  @Input() picked_order = false;
  @Output() updateView = new EventEmitter();
  BankAdded = false;
  submitted = false;
  selected_Customer;
  selected_Bill;
  selected_institution;
  selected_bank_acc;
  view_customers = false;
  today: Date;
  maxDate: Date;
  minDate: Date;
  Bank_Validetion_Check;
  bill_to_delete;

  ViewOrderForm = new FormGroup({
    id: new FormControl(''),
    user: new FormControl(''),
    billing_date: new FormControl(''),
    billing_start_period: new FormControl(''),
    billing_end_period: new FormControl(''),
    date_created: new FormControl(''),
    currency: new FormControl(''),
    activity_type: new FormControl(''),
    institution: new FormControl(''),
    customer_bill: new FormControl('')
  }, { updateOn: 'blur' });

  UpdateOrderForm = new FormGroup({
    id: new FormControl(''),
    user: new FormControl(''),
    billing_date: new FormControl(''),
    billing_start_period: new FormControl(''),
    billing_end_period: new FormControl(''),
    date_created: new FormControl(''),
    currency: new FormControl(''),
    activity_type: new FormControl(''),
    institution: new FormControl(''),
    customer_bill: new FormControl('')
  }, { updateOn: 'blur' });

  Create_new_Bill_Form = new FormGroup({
    customer: new FormControl(''),
    institution: new FormControl(''),
    charged_amount: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^([0-9]*)$/)]),
  }, { updateOn: 'blur' });

  Create_Customer_Form = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.pattern(/^([^0-9]*)$/)]),
    last_name: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.pattern(/^([^0-9]*)$/)]),
    id_number: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^([0-9]*)$/)]),
    bank_account: new FormControl('')
  }, { updateOn: 'blur' });

  Create_Bank_Acc_Form = new FormGroup({
    account_number: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^([0-9]*)$/)]),
    branch_number: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^([0-9]*)$/)]),
    account_type: new FormControl('0000'),
    bank_code: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^([0-9]*)$/)]),
  }, { updateOn: 'blur' });

  Create_MasabFile_form=new FormGroup({
    masab_file_name: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/^([a-z A-Z]*)$/)])
  }, { updateOn: 'blur' });


  constructor(private apiService: ApiService,
    private modalService: ModalService,
    private bankCheckerService:BankAccountCheckerService) {



  }
  ngOnInit(): void {


  }

  ngOnChanges() {
    if (this.standingOrder != null) {

      this.put_values_in_form();
      console.log('uptading form');
    }

    this.view_customers = false;


  }


  openModal(id: string) {

    this.modalService.open(id);

  }

  closeModal(id: string) {
   // console.log(id);
    this.modalService.close(id);

  }

  my_formatdate(str: string) {

    return ((str.substr(8, 2)) + '-' + (str.substr(5, 2)) + '-' + (str.substr(0, 4)));

  }
  /*   public trackByFn(index: number, item: number) {
      return item;
    } */



  CreateBillForSO_clicked() {

    this.submitted = true;
    if (this.Create_new_Bill_Form.get('charged_amount').errors) {
      return;
    }





    var updated_list: any[];
    this.Create_new_Bill_Form.patchValue({ institution: this.standingOrder.institution });

    this.apiService.CreateCustomerBill(this.Create_new_Bill_Form).subscribe(
      (result: Customer_Bill) => {
        this.standingOrder.customer_bill.push(result.id)
        this.apiService.AddBillToStandingOrder(this.standingOrder.id, result.id).subscribe(
          result => {

            this.updateView.emit();
            this.submitted = false;

          },
          error => console.log(error)
        );

      },
      error => console.log(error)
    );


  }

  Add_Bank_to_customer(bank_acc_number) {
    this.Create_Customer_Form.patchValue({ bank_account: bank_acc_number });
    this.BankAdded = true;
  }


  CreateBankInsideCustomer_clicked() {

    this.submitted = true;
    if (this.bankCheckerService.Redirect_to_Check_method(this.Create_Bank_Acc_Form)) {

      console.log('VALID ACC NUMBER');
    }
    else {
      this.Bank_Validetion_Check = true;
      console.log('INVALID ACC NUMBER!!!! PLEASE CHECK AGAIN');
      return;
    }


    if (this.Create_Bank_Acc_Form.get('account_number').errors
      || this.Create_Bank_Acc_Form.get('branch_number').errors
      || this.Create_Bank_Acc_Form.get('bank_code').errors) {
      return;

    }
    else {

      this.closeModal('create_new_bank_acc_modal');
    }



    this.apiService.CreateBankAcc(this.Create_Bank_Acc_Form).subscribe(
      (result: BankAccount) => {
        this.updateView.emit();
        console.log('Create Form: ', result);
        this.Add_Bank_to_customer(result.id);
        this.Bank_Validetion_Check=false;
      },
      error => console.log(error.error)
    );

  }

  Set_Bill_to_delete(i) {
    //console.log(i);
    this.bill_to_delete = i;
  }

  DeleteBill_Clicked() {
    //this.standingOrder.customer_bill=this.standingOrder.customer_bill.filter(bill=>bill!==this.bill_to_delete);
    const so_b_index = this.standingOrder.customer_bill.indexOf(this.bill_to_delete, 0);
    const customer_bill_index = this.customers_bills_list.indexOf(this.bill_to_delete, 0);
    if (so_b_index > -1) {
      this.standingOrder.customer_bill.splice(so_b_index, 1);
    }
    if (customer_bill_index > -1) {
      this.customers_bills_list.splice(customer_bill_index, 1);
    }
    this.apiService.DeleteCustomerBill(this.bill_to_delete).subscribe(
      result => {
        this.updateView.emit();

      },
      error => console.log(error)
    );

    this.closeModal('delete_sure_form_details');
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


  put_values_in_form() {
    // this.update_form_vals=false;
    this.ViewOrderForm.patchValue({
      id: this.standingOrder.id,
      user: this.standingOrder.user,
      billing_date: this.my_formatdate(this.standingOrder.billing_date),
      billing_start_period: this.my_formatdate(this.standingOrder.billing_start_period),
      billing_end_period: this.my_formatdate(this.standingOrder.billing_end_period),
      date_created: this.my_formatdate(this.standingOrder.date_created),
      currency: this.standingOrder.currency,
      activity_type: this.standingOrder.activity_type,
      institution: this.standingOrder.institution,
      customer_bill: this.standingOrder.customer_bill

    });
    //console.log('IM FORM\n', this.orderForm.value);
    //this.apiService.CreateNewStandingOrder(this.orderForm.value);

  }




  UpdateSO_clicked() {

    this.UpdateOrderForm.patchValue({
      id: (this.ViewOrderForm.get('id').value),
      user: (this.ViewOrderForm.get('user').value),
      billing_date: this.original_Date_formatdate(this.ViewOrderForm.get('billing_date').value),
      billing_start_period: this.original_Date_formatdate(this.ViewOrderForm.get('billing_start_period').value),
      billing_end_period: this.original_Date_formatdate(this.ViewOrderForm.get('billing_end_period').value),
      date_created: this.original_Date_formatdate(this.ViewOrderForm.get('date_created').value),
      currency: (this.ViewOrderForm.get('currency').value),
      activity_type: (this.ViewOrderForm.get('activity_type').value),
      institution: (this.ViewOrderForm.get('institution').value),
      customer_bill: (this.ViewOrderForm.get('customer_bill').value)
    });


    this.apiService.UpdateStandingOrder(this.UpdateOrderForm).subscribe(
      (result: StandingOrder) => {
        console.log('Update Form: ', result);
        this.updateView.emit();
      },
      error => console.log(error)
    );

    // console.log('IM FORM\n', this.orderForm.value);
    // window.location.reload();


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

  CreateCustomer_clicked() {

    this.submitted = true;
    if (this.Create_Customer_Form.get('first_name').errors
      || this.Create_Customer_Form.get('last_name').errors
      || this.Create_Customer_Form.get('id_number').errors) {
      return;
    }
    else {

      this.closeModal('add_new_customer_from_so');
    }


    this.apiService.CreateCustomer(this.Create_Customer_Form).subscribe(
      result => {
        this.updateView.emit();
        console.log('Create Form: ', result);
        this.BankAdded = false;
      },
      error => console.log(error)
    );

  }


  CreateMASABFileClicked() {
    this.submitted=true;
    if (this.Create_MasabFile_form.get('masab_file_name').errors) {
      return;
    }

    this.apiService.CreateMasabFile(this.standingOrder.id).subscribe(
      result => {
        console.log(result['MasbFile_str']);
        
        var file_name = this.Create_MasabFile_form.get('masab_file_name').value;

        var blob = new Blob([result['MasbFile_str']], { type: "text/plain;charset=utf-8" });
        saveAs(blob, 'msv-' + file_name + '-' + this.standingOrder.date_created + '.001');

      },
      error => console.log(error)
    );

  }



}


