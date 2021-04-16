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
		    if(error.error.message){
			console.log("Error: ", error.error.message);
		    }else{
			console.log("Unkown error");
		    }
		});
    }
}
