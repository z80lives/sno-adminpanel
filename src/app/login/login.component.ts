import { Component, OnInit} from '@angular/core';

import {NgForm} from "@angular/forms";
import {User} from "../models/user";

import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    user: User =  {
	id: "",
	name: "",
	password: "" 
    };

    constructor(public auth: AuthService){
    }

    ngOnInit() : void{

    }

    onSubmitLogin(){
	const user = this.user;	
	console.log("Submit login");
    }
}
