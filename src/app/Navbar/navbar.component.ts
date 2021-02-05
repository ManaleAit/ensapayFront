import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { ServiceUserService } from '../Services/service-user.service';
import { NotificationService } from '../Services/service-notifications.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(protected router: Router,private AuthenticationService: AuthenticationService, private ServiceUserService: ServiceUserService) {

  }

  ngOnInit() {


  }

  logout(){
    this.AuthenticationService.logoutUser();
  }

}