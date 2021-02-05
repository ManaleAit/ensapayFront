import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthRequest } from '../models/AuthRequest';

@Injectable()
export class AuthenticationService   {
  private baseUrl ='https://ensaspay-zuul-gateway.herokuapp.com/oauth/token'; //'http://localhost:9090/oauth/token';
  token:any;
  isLoggedIn=false;

 constructor(private http: HttpClient,
             protected router: Router) {
 }
 connecxion(value: AuthRequest ){
  this.isLoggedIn=true;

  var config = {headers: {
   'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    /*'responseType': 'text' as 'json',
    'Access-Control-Allow-Origin':'*',*/
    'Authorization': `Basic ${btoa("client:secret")}`}
   
}
let params = new URLSearchParams();
params.append('username',value.username);
params.append('password',value.password);    
params.append('grant_type','password');
params.append('client_id','client');

return this.http.post(`${this.baseUrl}`, 
  params.toString(), config);
//{ responseType: 'text' as 'json' },
  //return this.http.post(`${this.baseUrl}`, value, config);

}
/*saveToken(token){
  var expireDate = new Date().getTime() + (1000 * token.expires_in);
  Cookie.set("access_token", token.access_token, expireDate);
  this.router.navigate(['/']);
}
checkCredentials(){
  if (!Cookie.check('access_token')){
      this.router.navigate(['/login']);
  }
} 

logout() {
  Cookie.delete('access_token');
  this.router.navigate(['/login']);
}



}
*/
logoutUser() {
  this.isLoggedIn=false;
  localStorage.removeItem('token');
 
  this.router.navigate(['/login'])
}

getToken() {
  return localStorage.getItem('token')
}

loggedIn() {
  return !!localStorage.getItem('token')    
}
}



