import { Injectable } from '@angular/core';
import { CanActivate,
	 ActivatedRouteSnapshot,
	 Router,
	 RouterStateSnapshot,
	 UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import {AuthService} from "../services/auth.service";

/**
 * Authguard service is responsible for che
 **/
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
	public auth: AuthService, public router: Router
    ){}
    
	/*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {*/
    canActivate(): boolean | UrlTree {
      console.log("admin route guard")
      if(!this.auth.isAuthenticated()){
	  console.log("Not logged in");
	  return this.router.parseUrl("/login");
	  //this.router.navigate(["login"]);
	  //return false;
      }
      console.log("Logged in");
    return true;
  }
  
}
