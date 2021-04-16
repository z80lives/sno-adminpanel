import { Injectable } from '@angular/core';
import { CanActivate,
	 ActivatedRouteSnapshot,
	 Router,
	 RouterStateSnapshot,
	 UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import {AuthService} from "../services/auth.service";

/**
 * Authguard service is responsible for checking if the 
 * user is authenticated for the router. Actual code that
 * checks if user is authentication is in AuthService.
 **/
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
	public auth: AuthService, public router: Router
    ){}
    
    canActivate(): boolean | UrlTree {
      if(!this.auth.isAuthenticated()){
	  return this.router.parseUrl("/login");
      }
    return true;
  }
  
}
