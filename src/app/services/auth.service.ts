import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

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
	//const token = localStorage.getItem('token')||"";
	const refresh_token = localStorage.getItem("refresh_token")||"";
	//const token_exp = !this.jwtHelper.isTokenExpired(token);
	const rtoken_exp = !this.jwtHelper.isTokenExpired(refresh_token);
	return rtoken_exp;
    }    

    public getToken() : string{
	const token = localStorage.getItem('token')||"";
	return token;
    }

    public getRefreshToken() : string{
	const token = localStorage.getItem('refresh_token')||"";
	return token;
    }

    public authenticate(authData : any){
	localStorage.setItem("token", authData.access_token);
	localStorage.setItem("refresh_token", authData.refresh_token);
    }

    /**
     * Clears authentication data. Call to logout, 
     * then go back to main page after that.
     **/
    public clear(){
	localStorage.clear();
    }

    public refresh_token():Observable<unknown>{
	const refresh_token = this.getRefreshToken();	
	return this.http.post("api/login/refresh", {
	    refresh_token
	});
    }

    public getTokenTime(){
	try{
	    const meta = this.getToken().split(".")[1];
	    const m = JSON.parse(atob(meta)).exp;
	    return m - Math.floor((new Date()).getTime()/1000);
	}catch(err){
	    return "";
	}
    }

    public login(login_id : string, password : string){
	return this.http.post("api/login", {
	    login_id,
	    password
	});
    }
    
}
