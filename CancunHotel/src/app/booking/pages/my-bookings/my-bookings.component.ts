import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBooking } from 'src/app/Shared/interfaces/IBooking';
import { IUpdateBooking } from 'src/app/Shared/interfaces/IUpdateBooking';
import { BookingService } from 'src/app/Shared/services/booking.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  myBookingList : IBooking[]
  updateBooking : FormGroup
  showAlert : boolean = false;
  message : string = '';  
  typeAlert : string = ''; 
  loading  : boolean = false;
  updateMode : boolean = false; 

  constructor(private formBuilder: FormBuilder,
              private bookingService : BookingService) { }

  ngOnInit(): void {
    
    this.updateBooking = this.formBuilder.group({
      id:  ['', Validators.required],
      checkIn:  ['', Validators.required],
      checkOut:  ['', Validators.required]
    });

    this.readMyBookings();
  }

  editMode(item : IBooking){

    this.updateMode = true;
    this.updateBooking.get("id").setValue(item.id);
    this.updateBooking.get("checkIn").setValue(item.checkIn);
    this.updateBooking.get("checkOut").setValue(item.checkOut);

  }

  edit(){
 
    let booking : IUpdateBooking =
    {
      id : this.updateBooking.get("id").value,
      checkIn : this.updateBooking.get("checkIn").value,
      checkOut : this.updateBooking.get("checkOut").value,
    }

    this.loading = true;
    this.showAlert = false;
    this.message = '';

    this.bookingService.Update(booking).subscribe(data => {

      this.updateBooking.get("id").setValue("");
      this.updateBooking.get("checkIn").setValue("");
      this.updateBooking.get("checkOut").setValue("");
      
      this.typeAlert = "success";
      this.showAlert = true;
      this.message = "Booking was updated";
      this.loading = false;
      this.updateMode=false;
      this.readMyBookings();
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
  
  cancel(id : string){
    this.loading = true;
    this.showAlert = false;
    this.message = '';

    this.bookingService.Cancel(id).subscribe(data =>{
      this.typeAlert = "success";
      this.showAlert = true;
      this.message = "Booking was Cancelled";
      this.loading = false;

      this.readMyBookings();
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

  readMyBookings(){
    this.bookingService.GetMyBookings().subscribe(data=> {
      this.myBookingList = data
    });
  }

  closeMsg(){
    this.message='';
  }

}
