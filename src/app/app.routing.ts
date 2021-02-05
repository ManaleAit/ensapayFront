import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AfficherClientsComponent } from './Gestion-client/afficher-clients.component';
import { AjouterClientComponent } from './Gestion-client/ajouter.client.component';
import { AuthGuard } from './Services/AuthGuard';
const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
    ,
 
  {
    path: 'login',
     component: LoginComponent
  }
  ,{
    path:'clients',//canActivate: [AuthGuard],
    component:AfficherClientsComponent
  }
  ,{
    path:'ajoutClient',//canActivate: [AuthGuard],
    component:AjouterClientComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
