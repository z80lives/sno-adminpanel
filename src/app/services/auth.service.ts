import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {    
    //constructor(public jwtHelper: JwtHelperService) { }
    
    constructor(public http: HttpClient,
		public jwtHelper : JwtHelperService){
    }
    
    public isAuthenticated() : boolean{
	//const helper = new JwtHelperService();
	const token = localStorage.getItem('token')||"";
	return !this.jwtHelper.isTokenExpired(token);
    }

    public authenticate(authData : any){
	localStorage.setItem("token", authData.access_token);
    }

    /**
     * Clears authentication data. Call to logout, 
     * then go back to main page after that.
     **/
    public clear(){
	localStorage.clear();
    }

    public login(login_id : string, password : string){
	return this.http.post("api/login", {
	    login_id,
	    password
	});
    }
    
}
