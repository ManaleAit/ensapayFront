import { Client } from './Client';
import { Role } from './Role';

export class User{
    id:any;
	userName:string;
    password:string;
	email:string;
    roles:Role[];
    client:Client;
    sexe:string;
}