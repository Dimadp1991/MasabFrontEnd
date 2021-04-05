import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ApiService } from '../../api.service';
import{BankAccountCheckerService} from '../bank-account-checker.service'
import { FormControl, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.css']
})
export class CustomersDetailsComponent implements OnInit, OnChanges {


  @Input() customer;
  @Input() bankAccounts;
  Update_bank_acc=false;
  @Output() updateView = new EventEmitter();
  submitted=false;
  updated_successfully=false;
  Bank_Validetion_Check;
  ViewCustomer_Form = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl('',[Validators.required, Validators.maxLength(8),Validators.pattern(/^([^0-9]*)$/)]),
    last_name: new FormControl('',[Validators.required, Validators.maxLength(8),Validators.pattern(/^([^0-9]*)$/)]),
    id_number: new FormControl('',[Validators.required, Validators.minLength(9),Validators.pattern(/^([0-9]*)$/)]),
    bank_account: new FormControl('')
  }, { updateOn: 'blur' });

  UpdateCustomer_Form = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    id_number: new FormControl(''),
    bank_account: new FormControl('')
  }, { updateOn: 'blur' });


  ViewBank_Acc_Form = new FormGroup({
    account_number: new FormControl('',[Validators.required, Validators.minLength(9),Validators.pattern(/^([0-9]*)$/)]),
    branch_number: new FormControl('',[Validators.required, Validators.minLength(3),Validators.pattern(/^([0-9]*)$/)]),
    account_type: new FormControl(''),
    bank_code: new FormControl('',[Validators.required, Validators.minLength(2),Validators.pattern(/^([0-9]*)$/)]),
  }, { updateOn: 'blur' });

  Update_Bank_Acc_Form = new FormGroup({
    id: new FormControl(''),
    account_number: new FormControl(''),
    branch_number: new FormControl(''),
    account_type: new FormControl(''),
    bank_code: new FormControl(''),
  }, { updateOn: 'blur' });

  constructor(private apiService: ApiService,private bankCheckerService:BankAccountCheckerService) { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    if (this.customer != null) {

      this.put_values_in_form();
      this.put_bank_values_in_form() 
      //console.log('uptading form');  
    }
    this.submitted=false;
    
  }


  put_values_in_form() {
    this.ViewCustomer_Form.patchValue({
      id: this.customer.id,
      first_name: this.customer.first_name,
      last_name: this.customer.last_name,
      id_number: this.customer.id_number,
      bank_account: this.customer.bank_account,
    });
    
  }

  put_bank_values_in_form() {
    this.ViewBank_Acc_Form.patchValue({
      account_number: this.get_value_by_id(this.bankAccounts,this.ViewCustomer_Form.get('bank_account').value).account_number,
      branch_number: this.get_value_by_id(this.bankAccounts,this.ViewCustomer_Form.get('bank_account').value).branch_number,
      account_type:this.get_value_by_id(this.bankAccounts,this.ViewCustomer_Form.get('bank_account').value).account_type,
      bank_code:this.get_value_by_id(this.bankAccounts,this.ViewCustomer_Form.get('bank_account').value).bank_code,
  
    });
  
  }

  UpdateCustomer_clicked(){


    this.submitted=true;
    if (this.ViewCustomer_Form.get('first_name').errors 
        || this.ViewCustomer_Form.get('last_name').errors
        || this.ViewCustomer_Form.get('id_number').errors) {
      return;
      
    }
    


      this.UpdateCustomer_Form.patchValue({
        id: this.ViewCustomer_Form.get('id').value,
        first_name: this.ViewCustomer_Form.get('first_name').value,
        last_name: this.ViewCustomer_Form.get('last_name').value,
        id_number: this.ViewCustomer_Form.get('id_number').value,
        bank_account: this.ViewCustomer_Form.get('bank_account').value,
      });

      this.apiService.UpdateCustomer(this.UpdateCustomer_Form).subscribe(
        result => {
          this.updateView.emit();
          console.log('Update Form: ', result);
        },
        error => console.log(error)
      );

    
  }

  get_value_by_id(list, search_val) {
    let found = null;
    for (let key in list) {
      if (list[key].id == search_val) {
        found = list[key];
          //console.log(found.institution_name);
        return found;
      }
    }

  }

  UpdateBankInsideCustomer_clicked(){

    this.submitted=true;
    if (this.ViewBank_Acc_Form.get('account_number').errors 
        || this.ViewBank_Acc_Form.get('branch_number').errors
        || this.ViewBank_Acc_Form.get('bank_code').errors) {
      return;
    }

    if(this.bankCheckerService.Redirect_to_Check_method(this.ViewBank_Acc_Form)){
     
      console.log('VALID ACC NUMBER');
    }
    else{
      this.Bank_Validetion_Check=true;
      console.log('INVALID ACC NUMBER!!!! PLEASE CHECK AGAIN');
      
      return;
    }



    this.Update_Bank_Acc_Form.patchValue({
      id: this.customer.bank_account,
      account_number: this.ViewBank_Acc_Form.get('account_number').value,
      branch_number:this.ViewBank_Acc_Form.get('branch_number').value,
      account_type: this.ViewBank_Acc_Form.get('account_type').value,
      bank_code:this.ViewBank_Acc_Form.get('bank_code').value,
      
    });

    

    this.apiService.UpdateBankAccount(this.Update_Bank_Acc_Form).subscribe(
      result => {
        this.updateView.emit();
        console.log('Update Form: ', result);
        this.Update_bank_acc=false;
        this.updated_successfully=true;
        this.Bank_Validetion_Check=false;
      },
      error => console.log(error)
    );
  }

  show_update_banck_acc_data(){
    this.updated_successfully=false;

    this.Update_bank_acc=true;

  }


  }


