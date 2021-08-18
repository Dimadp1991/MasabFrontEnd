import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

enum Sample {

}

@Injectable({
  providedIn: 'root'
})

  

export class BankAccountCheckerService {

  constructor() { }



  Redirect_to_Check_method(bank_acc_form: FormGroup) {
    switch (Number(bank_acc_form.get('bank_code').value)) {
      case 10:
        return this.Check_Method_1_1(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 13:
        return this.Check_Method_1_1(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 34:
        return this.Check_Method_1_1(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 12:
        return this.Check_Method_1_2(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 4:
        return this.Check_Method_1_2_1(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 11:
        return this.Check_Method_1_3(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 17:
        return this.Check_Method_1_3(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 20:
        return this.Check_Method_1_4(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 31:
        return this.Check_Method_1_5(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 52:
        return this.Check_Method_1_5(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 9:
        return this.Check_Method_1_6(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 22:
        return this.Check_Method_1_7(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 46:
        return this.Check_Method_1_8(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 14:
        return this.Check_Method_1_9(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);
      case 22:
        return this.Check_Method_1_7(bank_acc_form.get('account_number').value, bank_acc_form.get('branch_number').value);

      default:
        return false;
    }
  }

  //------------------------------------------------------------------------------------------------------
  Check_Method_1_1(bank_acc, branch_num) {
    // BRANCH = S T U
    //         10 9 8
    // ACCOUNT =   B C D E F G H - X
    //             7 6 5 4 3 2 
    const mod_val = 100;
    const valid_mods_arr = [90, 72, 70, 60, 20];
    const mult_arr = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    bank_acc = bank_acc.substr(1, bank_acc.length);
    //bank Poalim
    var sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += mult_arr[i] * Number(branch_num[i]);
    }
    var j = 0;
    for (let i = 3; i < 9; i++) {
      sum += mult_arr[i] * Number(bank_acc[j++]);

    }
    var add_to = Number(bank_acc[bank_acc.length - 2] + bank_acc[bank_acc.length - 1]);
    /*   console.log('sum is ' + sum);
      console.log('mod is ' + sum % mod_val);
      console.log('endVAL is ' + (sum + add_to) % mod_val); */
    if (valid_mods_arr.includes((sum + add_to) % mod_val)) {
      return true;
    }

    return false;

  }

  //------------------------------------------------------------------------------------------------------
  Check_Method_1_2(bank_acc, branch_num) {

    // BRANCH = S T U
    //          9 8 7
    // ACCOUNT =   D E F G H - X
    //             6 5 4 3 2   1
    const mod_val = 11;
    const valid_mods_arr = [0, 2, 4, 6];
    const mult_arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];

    //bank Poalim
    var sum = 0;
    for (let i = 0; i < branch_num.length; i++) {

      sum += mult_arr[i] * Number(branch_num[i]);
    }

    for (let i = 3; i < bank_acc.length; i++) {
      sum += mult_arr[i] * Number(bank_acc[i]);

    }
    /*   console.log('sum is' + sum);
      console.log('mod is' + sum % mod_val); */
    if (valid_mods_arr.includes(sum % mod_val)) {
      return true;
    }

    return false;

  }
  //------------------------------------------------------------------------------------------------------
  Check_Method_1_2_1(bank_acc, branch_num) {
    // BRANCH = S T U
    //          9 8 7
    // ACCOUNT =   D E F G H - X
    //             6 5 4 3 2   1
    const mod_val = 11;
    const valid_mods_arr = [0, 2];
    const mult_arr = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    //bank YAHAV
    var sum = 0;
    for (let i = 0; i < branch_num.length; i++) {

      sum += mult_arr[i] * Number(branch_num[i]);
    }

    for (let i = 3; i < bank_acc.length; i++) {
      sum += mult_arr[i] * Number(bank_acc[i]);

    }
    /* console.log('sum is' + sum);
    console.log('mod is' + sum % mod_val); */
    if (valid_mods_arr.includes(sum % mod_val)) {
      return true;
    }

    return false;

  }

  //------------------------------------------------------------------------------------------------------
  Check_Method_1_3(bank_acc, branch_num) {
    // ACCOUNT =  A B C D E F G H - X
    //            9 8 7 6 5 4 3 2   1
    const mod_val = 11;
    const valid_mods_arr = [0, 2, 4];
    const mult_arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];


    //bank
    var sum = 0;

    for (let i = 0; i < bank_acc.length; i++) {
      sum += mult_arr[i] * Number(bank_acc[i]);

    }
    /*  console.log('sum is' + sum);
     console.log('mod is' + sum % mod_val); */
    if (valid_mods_arr.includes(sum % mod_val)) {
      return true;
    }

    return false;

  }

  //------------------------------------------------------------------------------------------------------
  Check_Method_1_4(bank_acc, branch_num) {
    // BRANCH = S T U
    //          9 8 7
    // ACCOUNT =   D E F G H - X
    //             6 5 4 3 2   1

    const mod_val = 11;
    const valid_mods_arr = [0, 2, 4];
    const mult_arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    //bank
    var new_branch_num: string;
    if (Number(branch_num) > 400) {
      if (Number(branch_num) - 400 < 10) {
        new_branch_num = '0' + '0' + String(Number(branch_num) - 400);
      }
      else if (Number(branch_num) - 400 < 100) {
        new_branch_num = '0' + String(Number(branch_num) - 400);
      }
      else {
        new_branch_num = String(Number(branch_num) - 400);
      }

    }
    else{
      new_branch_num = String(Number(branch_num));
    }

    //console.log('branch num is ' + new_branch_num);
    var sum = 0;
    for (let i = 0; i < new_branch_num.length; i++) {

      sum += mult_arr[i] * Number(new_branch_num[i]);
    }

    for (let i = 3; i < bank_acc.length; i++) {
      sum += mult_arr[i] * Number(bank_acc[i]);

    }
    /* console.log('sum is' + sum);
    console.log('mod is' + sum % mod_val); */
    if (valid_mods_arr.includes(sum % mod_val)) {
      return true;
    }

    return false;

  }
  //------------------------------------------------------------------------------------------------------
  Check_Method_1_5(bank_acc, branch_num) {
    // ACCOUNT =  A B C D E F G H - X
    //            9 8 7 6 5 4 3 2   1
    const mod_val = 11;
    const valid_mods_arr = [0, 6];
    const mult_arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    //bank
    var sum = 0;


    for (let i = 0; i < bank_acc.length; i++) {
      sum += mult_arr[i] * Number(bank_acc[i]);

    }
   /*   console.log('sum is' + sum);
     console.log('mod is' + sum % mod_val); */
    if (valid_mods_arr.includes(sum % mod_val)) {
      return true;
    }
    else {
      //CHECK PHASE B'
      // ACCOUNT =  D E F G H - X
      //            6 5 4 3 2   1
      var sum = 0;
      for (let i = 3; i < bank_acc.length; i++) {
        sum += mult_arr[i] * Number(bank_acc[i]);
        if (valid_mods_arr.includes(sum % mod_val)) {
          return true;
        }

      }
    }

    return false;

  }
  //------------------------------------------------------------------------------------------------------
  Check_Method_1_6(bank_acc, branch_num) {

    // ACCOUNT =  A B C D E F G H - X
    //            9 8 7 6 5 4 3 2   1
    const mod_val = 10;
    const valid_mods_arr = [0, 2];
    const mult_arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    //bank
    var sum = 0;

    for (let i = 0; i < bank_acc.length; i++) {
      sum += mult_arr[i] * Number(bank_acc[i]);

    }
   /*   console.log('sum is' + sum);
     console.log('mod is' + sum % mod_val); */
    if (valid_mods_arr.includes(sum % mod_val)) {
      return true;
    }

    return false;

  }
  //------------------------------------------------------------------------------------------------------
  Check_Method_1_7(bank_acc, branch_num) {
    // ACCOUNT =  A B C D E F G H - X
    //              3 2 7 6 5 4 3 2   
    const mod_val = 11;
    const mult_arr = [3, 2, 7, 6, 5, 4, 3, 2];
    //bank
    var sum = 0;

    for (let i = 0; i < bank_acc.length - 1; i++) {
      sum += mult_arr[i] * Number(bank_acc[i]);

    }
    var carry = sum % mod_val;
/*      console.log('sum is ' + sum);
     console.log('mod is ' + sum % mod_val);
     console.log('carry is ' + carry);
     console.log('last is ' + Number(bank_acc.charAt(bank_acc.length-1))); */
 
    if ((mod_val - carry) == Number(bank_acc.charAt(bank_acc.length-1))) {
      return true;
    }

    return false;
    //700241017

  }
  //------------------------------------------------------------------------------------------------------
  Check_Method_1_8(bank_acc, branch_num) {
    // BRANCH = S T U
    //          9 8 7
    // ACCOUNT =   D E F G H - X
    //             6 5 4 3 2   1
    const mod_val = 11;

    const mult_arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    const valid_branches = [154, 166, 178, 181, 183, 191, 192,
      503, 505, 507, 515, 516, 527, 539]

    //bank Poalim
    var sum = 0;
    for (let i = 0; i < branch_num.length; i++) {

      sum += mult_arr[i] * Number(branch_num[i]);
    }

    for (let i = 3; i < bank_acc.length; i++) {
      sum += mult_arr[i] * Number(bank_acc[i]);

    }

    //PHASE A
    /* console.log('sum is' + sum);
    console.log('mod is' + sum % mod_val); */
    if (valid_branches.includes(Number(branch_num))) {
      if ((sum % mod_val) == 2) {
        return true;
      }
    }

    if ((sum % mod_val) == 0) {
      return true;
    }
    else {
      //PHASE B
      // ACCOUNT =  A B C D E F G H - X
      //            9 8 7 6 5 4 3 2   1
      sum = 0;
      for (let i = 0; i < bank_acc.length; i++) {
        sum += mult_arr[i] * Number(bank_acc[i]);
      }
      if ((sum % mod_val) == 0) {
        return true;
      }
      else {
        //PHASE C
        // D E F G H - X
        // 6 5 4 3 2   1
        sum = 0;
        for (let i = 3; i < bank_acc.length; i++) {
          sum += mult_arr[i] * Number(bank_acc[i]);
        }
        if ((sum % mod_val) == 0) {
          return true;
        }

      }


    }

    return false;

  }
  //------------------------------------------------------------------------------------------------------
  Check_Method_1_9(bank_acc, branch_num) {
    // BRANCH = S T U
    //          9 8 7
    // ACCOUNT =   D E F G H - X
    //             6 5 4 3 2   1

    const mod_val = 11;
    const valid_branches_A = [347, 365, 384, 385];
    const valid_branches_B = [361, 362, 363];
    const mult_arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    //bank
    var sum = 0;
    for (let i = 0; i < branch_num.length; i++) {

      sum += mult_arr[i] * Number(branch_num[i]);
    }

    for (let i = 3; i < bank_acc.length; i++) {
      sum += mult_arr[i] * Number(bank_acc[i]);

    }
    /*  console.log('sum is' + sum);
     console.log('mod is' + sum % mod_val); */
    if (valid_branches_A.includes(Number(branch_num))) {
      if ((sum % mod_val) == 2 || (sum % mod_val) == 0) {
        return true;
      }
    }

    if (valid_branches_B.includes(Number(branch_num))) {
      if ((sum % mod_val) == 4 || (sum % mod_val) == 2 || (sum % mod_val) == 0) {
        return true;
      }
    }

    //PHASE B
    // ACCOUNT =  A B C D E F G H - X
    //            9 8 7 6 5 4 3 2   1
    sum = 0;
    for (let i = 0; i < bank_acc.length; i++) {
      sum += mult_arr[i] * Number(bank_acc[i]);
    }
    if ((sum % mod_val) == 0) {
      return true;
    }
    else {
      //PHASE C
      // D E F G H - X
      // 6 5 4 3 2   1
      sum = 0;
      for (let i = 3; i < bank_acc.length; i++) {
        sum += mult_arr[i] * Number(bank_acc[i]);
      }
      if ((sum % mod_val) == 0) {
        return true;
      }

    }

    return false;

  }
  //------------------------------------------------------------------------------------------------------




}
