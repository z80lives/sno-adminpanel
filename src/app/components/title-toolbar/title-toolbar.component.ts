import { Component, EventEmitter,
	 OnInit, Output} from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-title-toolbar',
  templateUrl: './title-toolbar.component.html',
  styleUrls: ['./title-toolbar.component.css']
})
export class TitleToolbarComponent implements OnInit {
    sideMenuStatus=false;
    @Output() sideMenuToggle = new EventEmitter<boolean>();

    constructor(public auth: AuthService,
		public router: Router
	       ) { }

    ngOnInit(): void {
    }

    //when burger menu button is pressed
    onClickBurgerButton(){
	//toggle side menu status
	this.sideMenuStatus = !this.sideMenuStatus;
	//emit the event for the layout component so it can actually toggle the sidemenu from there
	this.sideMenuToggle.emit(this.sideMenuStatus);
    }


  onClickLogout(){
      this.auth.clear();
      this.router.navigate(["login"]).then( () => {
	  //todo fix this, instead of reloading layout component update based on the route and auth service
	  document.location.reload();
      });
  }

}
