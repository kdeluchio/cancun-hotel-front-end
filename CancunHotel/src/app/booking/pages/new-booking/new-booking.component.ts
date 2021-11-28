import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INewBooking } from 'src/app/Shared/interfaces/INewBooking';
import { IRoom } from 'src/app/Shared/interfaces/IRoom';
import { BookingService } from 'src/app/Shared/services/booking.service';
import { RoomService } from 'src/app/Shared/services/room.service';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {

  rooms : IRoom[];
  newBooking : FormGroup
  showAlert : boolean = false;
  message : string = '';  
  typeAlert : string = ''; 
  loading  : boolean = false;

  constructor(private formBuilder: FormBuilder,
              private bookingService : BookingService,
              private roomService : RoomService  ) { }

  ngOnInit(): void {

    this.newBooking = this.formBuilder.group({
      roomId:  ['', Validators.required],
      checkIn:  ['', Validators.required],
      checkOut:  ['', Validators.required]
    });

    this.roomService.GetAll().subscribe(data=> {
      this.rooms = data
    });

  }

  booking(){
    
    let booking : INewBooking =
    {
      roomId : this.newBooking.get("roomId").value,
      checkIn : this.newBooking.get("checkIn").value,
      checkOut : this.newBooking.get("checkOut").value,
    }

    this.loading = true;
    this.showAlert = false;
    this.message = '';

    this.bookingService.Create(booking).subscribe(data => {

      this.newBooking.get("roomId").setValue("");
      this.newBooking.get("checkIn").setValue("");
      this.newBooking.get("checkOut").setValue("");
      
      this.typeAlert = "success";
      this.showAlert = true;
      this.message = "Booking was created";
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
