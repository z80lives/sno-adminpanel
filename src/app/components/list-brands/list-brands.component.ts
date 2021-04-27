import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BrandService } from "../../services/brand.service";
import { Brand } from "../../models/brand";

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.css']
})
export class ListBrandsComponent implements OnInit {
    isLoading : boolean = true;
    dataSource: Brand[]=[];    
    displayed_columns : string[] = ["name", "origin"];
    
    constructor(public brandService : BrandService,
		public router: Router
	       ) { }


    getData(){
	this.brandService.fetchAll().subscribe( results => {
	    this.dataSource = results.data;
	}, fail => {

	}, () => {
	    this.isLoading = false;
	});
    }

    ngOnInit(): void {
	this.getData();
    }

    
    onClickAdd(){
	this.router.navigate(["brand", "new"]);
    }
}
