import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Services/authentication.service';
import { ServiceUserService } from '../Services/service-user.service';
import { NotificationService } from '../Services/service-notifications.service';
import { Role } from '../models/Role';
import { AuthRequest } from '../models/AuthRequest';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  send: boolean = false;
  roles: Role[];
  rolesString = [''];
  role: Role = new Role();
  aut: AuthRequest = new AuthRequest();
  constructor(protected router: Router, private notification: NotificationService, private AuthenticationService: AuthenticationService, private ServiceUserService: ServiceUserService) {

  }

  ngOnInit() {


  }

  Formulaire = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),



  }
  );


  get username() {
    return this.Formulaire.get('username');
  }

  get password() {
    return this.Formulaire.get('password');
  }

  SendChange() {
    this.send = true;
  }
  onSubmit() {
    if (this.Formulaire.valid) {
      this.aut.grant_type = 'password';
      this.aut.username = this.Formulaire.get('username').value;
      this.aut.password = this.Formulaire.get('password').value;
      this.AuthenticationService.connecxion(this.aut)
        .subscribe(
          (data) => {

            localStorage.setItem('tel',this.Formulaire.get('username').value );
            localStorage.setItem('token', data["access_token"]);
            console.log("tttttooken"+data["access_token"])
            this.router.navigate(['/clients'])


          },
          error => {
            //alert("Le mot de passe incorrect");
            this.notification.showError("Le mot de passe incorrect", "connection échouer ");
            console.log("erreur"+error);
           
          });


    } else {
      this.notification.showWarning("Veuillez remplir les champs du formulaire", "Attention!!!!!!!");

    }


  }
}