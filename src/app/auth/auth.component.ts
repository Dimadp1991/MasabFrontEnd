import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import {ApiService} from '../api.service'
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router'


interface TokenObj{
    token:string;
    id:number;
}


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  submitted;

  Login_Form=new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  }, { updateOn: 'submit' });


  constructor(private apiService:ApiService,
              private cookieService:CookieService,
              private router:Router) { }

  ngOnInit(): void {
    const masab_token=this.cookieService.get('masab-token');
    if(masab_token){
      this.router.navigate(['/main']);
    }

  }



  Login_clicked(){
    this.submitted=true;
    if(this.Login_Form.get('username').errors || this.Login_Form.get('password').errors){
      return;
    }


    this.apiService.loginUser(this.Login_Form).subscribe(
      (result:TokenObj)=>{
        this.cookieService.set('masab-token',result.token);
        this.cookieService.set('masab-token-id',String(result.id));
         this.router.navigate(['/main']);
      },
      error=>console.log(error)
    );
  }



}
