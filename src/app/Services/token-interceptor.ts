import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {
  }
 
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenPromise= this.auth.getToken();
    const tokenObservable: Observable<string> = from(tokenPromise);

    return tokenObservable.pipe(
      map(authToken => {
        req = req.clone({setHeaders: {'Authorization': 'Bearer ' + authToken}});
      }),
      concatMap(request => {
        return next.handle(req);
      }));
  }
}