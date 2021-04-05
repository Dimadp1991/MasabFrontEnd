import { Component, OnInit, Input,Output, OnChanges,EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-bank-account-details',
  templateUrl: './bank-account-details.component.html',
  styleUrls: ['./bank-account-details.component.css']
})
export class BankAccountDetailsComponent implements OnInit, OnChanges {


  @Input() bank_acc;
  @Output() updateView=new EventEmitter();

  ViewBank_Acc_Form = new FormGroup({
    id: new FormControl(''),
    account_number: new FormControl(''),
    branch_number: new FormControl(''),
    account_type: new FormControl(''),
    bank_code: new FormControl(''),
  }, { updateOn: 'blur' });

  Update_Bank_Acc_Form = new FormGroup({
    id: new FormControl(''),
    account_number: new FormControl(''),
    branch_number: new FormControl(''),
    account_type: new FormControl(''),
    bank_code: new FormControl(''),
  }, { updateOn: 'blur' });


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    if (this.bank_acc != null) {

      this.put_values_in_form();
      console.log('uptading form');
    }

}

put_values_in_form() {
  this.ViewBank_Acc_Form.patchValue({
    id:this.bank_acc.id,
    account_number: this.bank_acc.account_number,
    branch_number: this.bank_acc.branch_number,
    account_type: this.bank_acc.account_type,
    bank_code:this.bank_acc.bank_code,

  });

}


UpdateBA_clicked() {

  this.Update_Bank_Acc_Form.patchValue({
    id:this.ViewBank_Acc_Form.get('id').value,
    account_number: this.ViewBank_Acc_Form.get('account_number').value,
    branch_number:this.ViewBank_Acc_Form.get('branch_number').value,
    account_type: this.ViewBank_Acc_Form.get('account_type').value,
    bank_code:this.ViewBank_Acc_Form.get('bank_code').value,
    
  });

  this.apiService.UpdateBankAccount(this.Update_Bank_Acc_Form).subscribe(
    result => {
      this.updateView.emit();
      console.log('Update Form: ', result);
    },
    error => console.log(error)
  );

  // console.log('IM FORM\n', this.orderForm.value);
  // window.location.reload();


}






}
