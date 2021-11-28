import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INewProfile } from 'src/app/Shared/interfaces/INewProfile';
import { CustomerService } from 'src/app/Shared/services/customer.service';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {

  newAccount : FormGroup
  showAlert : boolean = false;
  message : string = '';  
  typeAlert : string = ''; 
  loading  : boolean = false;

  constructor(private formBuilder: FormBuilder,
              private serviceCustomer : CustomerService) { }

  ngOnInit(): void {
      this.newAccount = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName:  ['', Validators.required],
        documentNumber:  [''],
        eMail:  ['', Validators.required],
        password:  ['', Validators.required]
    });
  }

  save(): void {

    let profile : INewProfile =
    {
      firstName : this.newAccount.get("firstName").value,
      lastName : this.newAccount.get("lastName").value,
      documentNumber : this.newAccount.get("documentNumber").value,
      eMail : this.newAccount.get("eMail").value,
      password : this.newAccount.get("password").value,
    }

    this.loading = true;
    this.showAlert = false;
    this.message = '';

    this.serviceCustomer.Create(profile).subscribe(data => {

      this.newAccount.get("firstName").setValue("");
      this.newAccount.get("lastName").setValue("");
      this.newAccount.get("documentNumber").setValue("");
      this.newAccount.get("eMail").setValue("");
      this.newAccount.get("password").setValue("");

      this.typeAlert = "success";
      this.showAlert = true;
      this.message = "The profile was created successfully";
      this.loading = false;

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