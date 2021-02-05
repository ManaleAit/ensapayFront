import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './Services/service-notifications.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,private notification:NotificationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError( (error) => {

            const errorConst = error.error.message || error.statusText;
            let errorMessage = '';
 
            if(error.error.hasOwnProperty('message')){    
              // client-side error
    
               errorMessage = `Error: ${error.error.message}`;
    
            } else {
    
              // server-side error
    
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    
            }
          
    
            this.notification.showError(errorMessage, "Erreur!!!!!");
            return throwError(errorConst);
        }))
    }
}