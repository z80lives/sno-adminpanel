import { Component, OnInit} from '@angular/core';

import {NgForm} from "@angular/forms";
import {User} from "../models/user";
import { Router} from '@angular/router';

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
    errorMsg : string = "";

    constructor(public auth: AuthService,
		public router: Router
	       ){
    }

    ngOnInit() : void{
	this.onAuthenticate();
    }

    onAuthenticate(){
	if(this.auth.isAuthenticated()){
	    this.router.navigate(["dashboard"]);
	}
    }

    onSubmitLogin(){
	const user = this.user;	
	this.auth.login(user.name, user.password)
	    .subscribe(
		//login success
		(data:any)  => {
		    const b = JSON.parse('{"abc":1}');
		    this.auth.authenticate(data);
		    this.onAuthenticate();
		},
		
		//login failed			
		error => {
		    var msg = "Unable to login: ";
		    if(error.error){
			if(error.error.message){
			    msg += error.error.message;
			}else{
			    msg += "Server did not return error";
			}
		    }else{
			msg += "Reason unknown";		
		    }

		    this.errorMsg = msg;
		});
    }
}
