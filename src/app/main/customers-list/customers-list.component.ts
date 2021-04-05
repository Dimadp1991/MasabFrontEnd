import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { BankAccountCheckerService } from '../bank-account-checker.service';
import { BankAccount } from 'src/app/Models/BankAccount';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  @Input() Cuastomer_list_compo = [];
  @Input() Bank_acc_list_compo = [];
  @Output() selectCustomer = new EventEmitter();
  @Output() updateView = new EventEmitter();
  customer_to_delete;
  Bank_Validetion_Check = false;
  submitted = false;
  BankAdded = false;
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


  constructor(private modalService: ModalService
    , private apiService: ApiService
    , private bankCheckerService: BankAccountCheckerService) { }

  ngOnInit(): void {
  }

  CustomerClicked(customer) {
    this.selectCustomer.emit(customer);
    //console.log(customer);

  }
  openModal(id: string) {

    this.modalService.open(id);

  }


  Set_to_delete(i) {
    //console.log(i);
    this.customer_to_delete = i;
  }
  closeModal(id: string) {
    this.modalService.close(id);
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

      this.closeModal('create_new_customer_modal');
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
        this.Bank_Validetion_Check = false;
      },
      error => console.log(error.error)
    );

  }

  DeleteCustomer_clicked(delete_customer) {
    var bank_acc_id = this.get_Object_by_id(this.Cuastomer_list_compo, delete_customer).bank_account;
    this.apiService.DeleteCustomer(delete_customer, bank_acc_id).subscribe(
      result => {
        this.updateView.emit();
        console.log('Deleted : ', result);
      },
      error => console.log(error)
    );

  }

  Add_Bank_to_customer(bank_acc_number) {
    this.Create_Customer_Form.patchValue({ bank_account: bank_acc_number });
    this.BankAdded = true;
  }

}
