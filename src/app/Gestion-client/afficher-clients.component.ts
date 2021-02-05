import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/account';
import { Agency } from '../models/Agency';
import { Client } from '../models/Client';
import { ServiceClientService } from '../Services/service-Client.service';
import { NotificationService } from '../Services/service-notifications.service';

@Component({
  selector: 'app-afficher-clients',
  templateUrl: './afficher-clients.component.html',
  styleUrls: ['./afficher-clients.component.css']
})
export class AfficherClientsComponent implements OnInit {
  clients:Client[]=[];
  SelectDelete:Client=new Client();
  send: boolean = false;
  ClientCreate: Client = new Client();
  UpdateSelect:Client=new Client();
  accountCreate:Account=new Account();
  account1:Account=new Account();
  constructor(private notification:NotificationService,private ServiceClientService: ServiceClientService) {

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
  
  FormulaireCount = new FormGroup({
    amount2: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
   
  }
  );
  get amount2() {
    return this.FormulaireCount.get('amount2');
  }
  get id() {
    return this.FormulaireCount.get('id');
  }

  save() {
    this.UpdateSelect.firstName = this.FormulaireControl.get('firstName').value;
    this.UpdateSelect.lastName = this.FormulaireControl.get('lastName').value;
    this.UpdateSelect.address = this.FormulaireControl.get('address').value;
    this.UpdateSelect.cin = this.FormulaireControl.get('cin').value;


    this.UpdateSelect.email = this.FormulaireControl.get('email').value;
    this.UpdateSelect.tel = this.FormulaireControl.get('tel').value;

    this.accountCreate.amount = this.FormulaireControl.get('amount').value;
    //pas encore
    this.accountCreate.accountType = this.FormulaireControl.get('accountType').value;
    this.UpdateSelect.account = this.accountCreate;
    //this.agencyCreate.name = this.FormulaireControl.get('name').value;
    //pas encore
    //this.ClientCreate.agency = this.agencyCreate;
      console.log("clientttttttttttt ",  this.UpdateSelect);
     this.ServiceClientService.updateClient(this.UpdateSelect)
      .subscribe(
        (data) => {
          console.log("data ", data);
          if(data!=null){
          

          this.notification.showSuccess("la demande a été bien modifié", " le client est bien modifier");

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
  ngOnInit() {
    this.ServiceClientService.getClientList().subscribe(
      data => {
        console.log(data);
        this.clients=data;
      },
      error => console.log(error));
  }
  onSelectDelete(client: Client): void {
    this.SelectDelete = client;
  }
  onSelectUpdate(client: Client): void {
    this. UpdateSelect = client;
    this.FormulaireControl.get('firstName').setValue(this.UpdateSelect.firstName);
    this.FormulaireControl.get('lastName').setValue(this.UpdateSelect.lastName);
    this.FormulaireControl.get('address').setValue(this.UpdateSelect.address);
    this.FormulaireControl.get('cin').setValue(this.UpdateSelect.cin);
    this.FormulaireControl.get('email').setValue(this.UpdateSelect.email)
    this.FormulaireControl.get('tel').setValue(this.UpdateSelect.tel);
    this.FormulaireControl.get('amount').setValue(this.UpdateSelect.account.amount);
    this.FormulaireControl.get('accountType').setValue(this.UpdateSelect.account.accountType);

  }
  onSubmitDelete() {
    
    this.ServiceClientService.deleteClient(this.SelectDelete.id)
    .subscribe(
      data => {
      
        this.notification.showSuccess("le client est supprimer", "client bien supprimer");
       
       
      },
      error => console.log(error));
 

     /* this.delay(500).then(any => {
        this.ServiceClientService.getClientList().subscribe(
          data => {
            console.log(data);
            this.clients=data;
          },
          error => console.log(error));
      });  */  
  
  }
 /* async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("allow download"));
  }*/

  onSubmitPay(client :Client){

    this.FormulaireCount.get('amount2').setValue(client.account.amount);
    this.FormulaireCount.get('id').setValue(client.account.id);
  }
  pay(){
    this.account1.id=this.FormulaireCount.get('id').value;
    this.account1.amount=this.FormulaireCount.get('amount2').value;
    this.ServiceClientService.accountPay(this.account1)
    .subscribe(
      (data) => {
        console.log("data ", data);
        if(data!=null){
        

        this.notification.showSuccess("success", "bien");

      }


      },
      error => {      
        console.log("Error", error);
      }
    );
    this.FormulaireCount.get('id').setValue('');
    this.FormulaireCount.get('amount2').setValue('');
  }
}
