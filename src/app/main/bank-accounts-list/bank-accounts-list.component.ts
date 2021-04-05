import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bank-accounts-list',
  templateUrl: './bank-accounts-list.component.html',
  styleUrls: ['./bank-accounts-list.component.css']
})
export class BankAccountsListComponent implements OnInit {

  @Input() BankAcc_list_compo=[];
  @Output()  selectBankAcc=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  Banck_accClicked(bank_acc){
    this.selectBankAcc.emit(bank_acc);
    //console.log(customer);

  }
  

}
