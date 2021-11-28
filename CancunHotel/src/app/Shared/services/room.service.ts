import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRoom } from '../interfaces/IRoom';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http : HttpClient) { }
  
  GetAll() : Observable<IRoom[]>{
      
    return this.http.get<IRoom[]>(`${environment.url}/room/get-all`);
  }  
  
}
