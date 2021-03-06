import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Token } from '../helpers/token';

@Injectable({
    providedIn: 'root'
  })
  export class HttpConfigInterceptor implements HttpInterceptor  {

    constructor(private router: Router){

    } 

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('DataUser');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request)
        .pipe(
            catchError((error: HttpErrorResponse) => {

                       if (error.status == 401 ) {

                        this.router.navigate(['/login']).then();
                        let session = new Token();
                        session.removeToken();
                      } 
                      
              return throwError(error);
            })
          )
    }
}
