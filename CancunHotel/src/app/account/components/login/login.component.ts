import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/Shared/helpers/token';
import { IAuth } from 'src/app/Shared/interfaces/IAuth';
import { CustomerService } from 'src/app/Shared/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  session : Token = new Token();
  loginAccount : FormGroup;
  showAlert : boolean = false;
  message : string = '';  
  typeAlert : string = ''; 
  loading  : boolean = false;

  constructor(private formBuilder: FormBuilder,
              private serviceCustomer : CustomerService,
              private router : Router) { }

  ngOnInit(): void {
    this.loginAccount = this.formBuilder.group({
      eMail:  ['', Validators.required],
      password:  ['', Validators.required]
    });
  }

  entry(): void {

    let auth : IAuth =
    {
      eMail : this.loginAccount.get("eMail").value,
      password : this.loginAccount.get("password").value,
    }

    this.loading = true;
    this.showAlert = false;
    this.message = '';

    if (!this.loginAccount.valid){
      this.typeAlert = "danger";
      this.loading = false;
      return;
    }

    this.serviceCustomer.Authentication(auth).subscribe(data => {

      this.loginAccount.get("eMail").setValue("");
      this.loginAccount.get("password").setValue("");

      this.session.saveToken(data.token);
      
      this.typeAlert = "success";
      this.showAlert = true;
      this.message = "Authenticated";
      this.loading = false;
      this.router.navigate(['/new-booking']).then();

    }, exception => {
      this.typeAlert = "danger";
      this.showAlert = true;
      this.message = exception.error;
      this.loading = false;

      if(exception.error.errors){
        this.message = exception.error.errors[Object.keys(exception.error.errors)[0]];
      }
    });
    
  }

  closeMsg(){
    this.message='';
  }

}
