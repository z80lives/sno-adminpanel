import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth.service"
import { Router} from '@angular/router';

import {MatDrawer} from '@angular/material/sidenav';
@Component({
  selector: 'layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.css']
})
export class LayoutContainerComponent implements OnInit {
    sideMenuStatus: boolean = true;   


    //this line's a bit ugly because we're using typescript in strict mode
    @ViewChild('drawer') public drawer!: MatDrawer;

    constructor(public authService: AuthService,
		public router : Router
	       ){
      
    }

    toggleSideMenu(status: boolean){
	this.sideMenuStatus = status;
	this.drawer.toggle();
    }
    
    ngOnInit(): void {
	if(!this.isLoggedIn()){
	    this.redirectToLogin();
	}
    }

    redirectToLogin(){
	if(this.router.url !== '/login'){
	    this.router.navigate(["login"]);
	}
    }

    isLoggedIn():boolean{
	//return true;
	const login_status = this.authService.isAuthenticated();
	//if(!login_status){
	//    this.redirectToLogin();
	//}
	return login_status;
    }

    
}
