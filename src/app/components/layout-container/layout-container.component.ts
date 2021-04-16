import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth.service"

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

    constructor(public authService: AuthService){
      
    }

    toggleSideMenu(status: boolean){
	this.sideMenuStatus = status;
	this.drawer.toggle();
    }
    
    ngOnInit(): void {
	console.log("Layout component initialised");
    }

    isLoggedIn():boolean{
	//return true;
	return this.authService.isAuthenticated();
    }

    
}
