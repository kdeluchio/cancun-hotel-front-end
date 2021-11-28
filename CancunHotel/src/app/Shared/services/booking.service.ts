import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBooking } from '../interfaces/IBooking';
import { INewBooking } from '../interfaces/INewBooking';
import { IUnavailableDate } from '../interfaces/IUnavailableDate';
import { IUpdateBooking } from '../interfaces/IUpdateBooking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http : HttpClient) { }

  Create(booking : INewBooking) : Observable<IBooking>{
      
    return this.http.post<IBooking>(`${environment.url}/booking`, booking);
  }

  Update(booking : IUpdateBooking) : Observable<IBooking>{
      
    return this.http.put<IBooking>(`${environment.url}/booking`, booking);
  }

  Cancel(bookingId : string) : Observable<void>{

    const params: {[param: string]: string} = {};
    params.id = bookingId;

    return this.http.patch<void>(`${environment.url}/booking/cancel?id=${bookingId} `, { params}); 
  }

  GetMyBookings() : Observable<IBooking[]>{
      
    return this.http.get<IBooking[]>(`${environment.url}/booking/get-my-bookings`);
  }

  GetUnavailableDatesByRoomId(roomId : string) : Observable<IUnavailableDate[]>{
    const params: {[param: string]: string} = {};
    params.roomId = roomId;

    return this.http.get<IUnavailableDate[]>(`${environment.url}/booking/get-unavailable-dates-by-room-id`, { params});
  }

}
