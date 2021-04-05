import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BaseUrl = environment.apiUrl;
  StandingOrdersUrl = `${this.BaseUrl}api/standingorders/`;
  CustomersUrl = `${this.BaseUrl}api/customers/`;
  CustomerBillsUrl = `${this.BaseUrl}api/customer_bill/`;
  InstitutionsUrl = `${this.BaseUrl}api/institutions/`;
  BankAccountsUrl = `${this.BaseUrl}api/bankaccounts/`;
  LoginUrl = `${this.BaseUrl}api/authenticate/`;




  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }


  getStandingOrders() {
    return this.httpClient.get(this.StandingOrdersUrl, { headers: this.getAuthHeaders() });
  }
  getCustomers() {
    return this.httpClient.get(this.CustomersUrl, { headers: this.getAuthHeaders() });
  }
  getCustomerBills() {
    return this.httpClient.get(this.CustomerBillsUrl, { headers: this.getAuthHeaders() });
  }
  getInstitutions() {
    return this.httpClient.get(this.InstitutionsUrl, { headers: this.getAuthHeaders() });
  }
  getBankAccounts() {
    return this.httpClient.get(this.BankAccountsUrl, { headers: this.getAuthHeaders() });
  }

  UpdateStandingOrder(order_form: FormGroup) {
    const body = (order_form.value);
    console.log(body);
    return this.httpClient.post(`${this.StandingOrdersUrl}${order_form.get('id').value}/update_standingorder/`, body, { headers: this.getAuthHeaders() });
  }

  CreateStandingOrder(order_form: FormGroup) {
    const body = (order_form.value);
    console.log(body);
    return this.httpClient.post(`${this.StandingOrdersUrl}`, body, { headers: this.getAuthHeaders() });

  }

  DeleteStandingOrder(order_id) {

    return this.httpClient.delete(`${this.StandingOrdersUrl}${order_id}/`, { headers: this.getAuthHeaders() });

  }

  UpdateCustomer(customer_form: FormGroup) {
    const body = (customer_form.value);
    console.log(body);
    return this.httpClient.post(`${this.CustomersUrl}${customer_form.get('id').value}/update_customer/`, body, { headers: this.getAuthHeaders() });
  }

  CreateCustomer(customer_form: FormGroup) {
    const body = (customer_form.value);
    console.log(body);
    return this.httpClient.post(`${this.CustomersUrl}`, body, { headers: this.getAuthHeaders() });
  }
  DeleteCustomer(customer_id, bank_acc_id) {
    this.httpClient.delete(`${this.BankAccountsUrl}${bank_acc_id}/`, { headers: this.getAuthHeaders() });
    return this.httpClient.delete(`${this.CustomersUrl}${customer_id}/`, { headers: this.getAuthHeaders() });
  }


  UpdateInstitution(inst_form: FormGroup) {
    const body = (inst_form.value);
    return this.httpClient.post(`${this.InstitutionsUrl}${inst_form.get('id').value}/update_institution/`, body, { headers: this.getAuthHeaders() });
  }

  CreateInstitution(inst_form: FormGroup) {
    const body = (inst_form.value);
    return this.httpClient.post(`${this.InstitutionsUrl}`, body, { headers: this.getAuthHeaders() });

  }
  DeleteInstitution(id) {
    return this.httpClient.delete(`${this.InstitutionsUrl}${id}/`, { headers: this.getAuthHeaders() });
  }
  UpdateBankAccount(banc_acc__form: FormGroup) {
   
    const body = (banc_acc__form.value);
    //console.log(body);
    return this.httpClient.post(`${this.BankAccountsUrl}${banc_acc__form.get('id').value}/update_bank_account/`, body, { headers: this.getAuthHeaders() });
  }

  CreateBankAcc(banc_acc__form: FormGroup) {
    const body = (banc_acc__form.value);
    console.log(body);
    return this.httpClient.post(`${this.BankAccountsUrl}`, body, { headers: this.getAuthHeaders() });

  }

  CreateCustomerBill(bill_form: FormGroup) {
    const body = (bill_form.value);
    console.log(body);
    return this.httpClient.post(`${this.CustomerBillsUrl}`, body, { headers: this.getAuthHeaders() });
  }

  DeleteCustomerBill(bill_id) {
    return this.httpClient.delete(`${this.CustomerBillsUrl}${bill_id}/`, { headers: this.getAuthHeaders() });
  }

  AddBillToStandingOrder(so_id, bill_id) {
    const body = JSON.stringify({ 'bill_id': bill_id });
    return this.httpClient.post(`${this.StandingOrdersUrl}${so_id}/add_bill/`, body, { headers: this.getAuthHeaders() });
  }

  CreateMasabFile(so_id) {
  
    return this.httpClient.post(`${this.StandingOrdersUrl}${so_id}/create_masab_file/`, {}, { headers: this.getAuthHeaders() });
  }

  loginUser(auth_form: FormGroup) {
    const body = (auth_form.value);
    return this.httpClient.post(`${this.LoginUrl}`, body, { headers: this.getAuthHeaders() });

  }

  getAuthHeaders() {
    const token = this.cookieService.get('masab-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });

  }

}
