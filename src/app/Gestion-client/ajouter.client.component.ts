import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../Services/service-notifications.service';
import { Client } from '../models/Client';
import { ServiceClientService } from '../Services/service-Client.service';
import { Account } from '../models/account';
import { Agency } from '../models/Agency';
@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.css']
})
export class AjouterClientComponent implements OnInit {

  send: boolean = false;
  ClientCreate: Client = new Client();
  accountCreate: Account = new Account();
  agencyCreate: Agency = new Agency();
  constructor(private router: Router, private ServiceClientService: ServiceClientService, private notification: NotificationService) {

  }

  FormulaireControl = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    accountType: new FormControl('', Validators.required),

  }
  );
  
  get amount() {
    return this.FormulaireControl.get('amount');
  }
  get firstName() {
    return this.FormulaireControl.get('firstName');
  }
  get lastName() {
    return this.FormulaireControl.get('lastName');
  }
  get address() {
    return this.FormulaireControl.get('address');
  }
  get cin() {
    return this.FormulaireControl.get('cin');
  }
  get email() {
    return this.FormulaireControl.get('email');
  }
  get tel() {
    return this.FormulaireControl.get('tel');
  }
  get accountType() {
    return this.FormulaireControl.get('accountType');
  }
  


  ngOnInit() {


  }

  save() {
   this.ClientCreate = new Client();
    this.ClientCreate.firstName = this.FormulaireControl.get('firstName').value;
    this.ClientCreate.lastName = this.FormulaireControl.get('lastName').value;
    this.ClientCreate.address = this.FormulaireControl.get('address').value;
    this.ClientCreate.cin = this.FormulaireControl.get('cin').value;


    this.ClientCreate.email = this.FormulaireControl.get('email').value;
    this.ClientCreate.tel = this.FormulaireControl.get('tel').value;

    this.accountCreate.amount = this.FormulaireControl.get('amount').value;
    //pas encore
    this.accountCreate.accountType = this.FormulaireControl.get('accountType').value;
    this.ClientCreate.account = this.accountCreate;
    //this.agencyCreate.name = this.FormulaireControl.get('name').value;
    //pas encore
    //this.ClientCreate.agency = this.agencyCreate;
      console.log("clientttttttttttt ",  this.ClientCreate);
   this.ServiceClientService.demandeCreateClient(this.ClientCreate)
      .subscribe(
        (data) => {
          console.log("data ", data);
          if(data!=null){
          

          this.notification.showSuccess("la demande a été bien envoyee", "  Création du client");

        }


        },
        error => {      
          console.log("Error", error);
        }
      );
  }



  SendChange() {

    this.send = true;
    console.log(this.FormulaireControl);
  }

  onSubmit() {
    
    if (this.FormulaireControl.valid) {
      this.save();
      this.resetForm();

    } else if (this.send) {
      this.notification.showWarning("Veuillez remplir les champs du formulaire", "Attention!!!!!!!");
    }

  }


  resetForm() {

    this.FormulaireControl.reset({
      firstName: '',
      lastName: '',
      address: '',
      cin: '',
      email: '',
      tel: '',
      amount: '',
      accountType: '',
    }
    );
    this.send = false;

  }
}
