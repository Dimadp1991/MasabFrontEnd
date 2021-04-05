import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {Routes,RouterModule} from '@angular/router'
import { StandingOrdersListComponent } from './standing-orders-list/standing-orders-list.component';
import { StandingOrdersDetailsComponent } from './standing-orders-details/standing-orders-details.component';
import {NavigatorComponent} from './navigator/navigator.component';
import {ApiService} from '../api.service';
import {InstitutionListComponent} from './institution-list/institution-list.component'
import { InstitutionDetailsComponent } from './institution-details/institution-details.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersDetailsComponent } from './customers-details/customers-details.component';
import { BankAccountsListComponent } from './bank-accounts-list/bank-accounts-list.component';
import { BankAccountDetailsComponent } from './bank-account-details/bank-account-details.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CustomerBillsListComponent } from './customer-bills-list/customer-bills-list.component';
import { CustomerBillsDetailsComponent } from './customer-bills-details/customer-bills-details.component';
import {MatIconModule} from '@angular/material/icon';
import { ModalModule } from './modal';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { FileSaverModule } from 'ngx-filesaver';
import { NgxPrettyCheckboxModule } from 'ngx-pretty-checkbox';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
const routes: Routes=[
  {path:'main',component:MainComponent}
];


@NgModule({
  declarations: [MainComponent,
    StandingOrdersListComponent,
    StandingOrdersDetailsComponent,
    NavigatorComponent,
    InstitutionListComponent,
    InstitutionDetailsComponent,
    CustomersListComponent,
    CustomersDetailsComponent,
    BankAccountsListComponent,
    BankAccountDetailsComponent,
    CustomerBillsListComponent,
    CustomerBillsDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    MatIconModule,
    RouterModule.forChild(routes),
    ModalModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    FileSaverModule,
    NgxPrettyCheckboxModule,
    PerfectScrollbarModule,

    
  ],
  exports:[RouterModule,CommonModule],
  providers:[ApiService],

  
})
export class MainModule { }
