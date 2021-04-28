import { Injectable } from '@angular/core';
import { AuthService } from "./services/auth.service";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, flatMap } from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptorInterceptor implements HttpInterceptor {

    constructor(public authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      
      if(this.authService.isAuthenticated()){
	  const current_token = this.authService.getToken();
	  request = request.clone({
              setHeaders: {
		  Authorization: `Bearer ${current_token}`
              }
          });        
      }      

      const exp_time = this.authService.getTokenTime();
	  /*
	  this.authService.refresh_token()
	      .subscribe( (results:any) => {
		  console.log("Refreshed", results);
	      });*/
	  /*const req = request.clone({

	  });*/
      return next.handle(request).pipe(	  
	  catchError( (err:any) => {
	      const token = this.authService.getToken();
	      //got a token but cannot authenticate, therefore token is considered expired.
	      if(err.status === 401 &&
		  this.authService.isAuthenticated()
		){

		  
		  return this.authService.refresh_token().pipe( flatMap ((results:any) => {
		      this.authService.authenticate(results); 
		      if(results.type === "Bearer"){
			  const current_token = this.authService.getToken();

		      }

			  const current_token = this.authService.getToken();			  

		request = request.clone({
		    setHeaders: {
			Authorization: `Bearer ${current_token}`
		    }
		});        
	        return next.handle(request);
		  }));		  
		  
	      }else{
		  //return Observable.throw(err);
		  return throwError(err);
	      }
	  })
      );
  }
}
