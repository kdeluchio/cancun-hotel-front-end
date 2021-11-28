import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth } from '../interfaces/IAuth';
import { INewProfile } from '../interfaces/INewProfile';
import { IProfile } from '../interfaces/IProfile';
import { IToken } from '../interfaces/IToken';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  Create(profile : INewProfile) : Observable<IProfile>{
      
    return this.http.post<IProfile>(`${environment.url}/customer`, profile);
  }

  Authentication(auth : IAuth) : Observable<IToken>{
      
    return this.http.post<IToken>(`${environment.url}/customer/authentication`, auth);
  }

  Get() : Observable<IProfile>{
      
    return this.http.get<IProfile>(`${environment.url}/customer`);
  }

}
