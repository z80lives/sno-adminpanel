import { Component, OnInit,
	 Input,
	 Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {Location} from '@angular/common';


import { Observable } from "rxjs";

@Component({
  selector: 'app-head-card',
  templateUrl: './head-card.component.html',
  styleUrls: ['./head-card.component.css']
})
export class HeadCardComponent implements OnInit {
    @Input() showToolbar : boolean = false;
    @Output() editAction = new EventEmitter<any>();
    @Output() deleteAction = new EventEmitter<any>();
    
    constructor(public router : Router,
		public route: ActivatedRoute,
		public location: Location) { }

    ngOnInit(): void {
    }


    onClickBack(){
      this.location.back();
    }

    onClickEdit(){

    }

}
