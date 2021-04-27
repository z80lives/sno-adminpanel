import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/category";

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
    isLoading : boolean = true;

    displayed_columns : string[] = ["name"];
    dataSource : Category[] = [];

    constructor(public categoryAPI : CategoryService,
		public router : Router
	       ) { }

    getData(){
	this.categoryAPI.fetchAll().subscribe( results => {
	    this.dataSource = results.data;
	}, fail => {
	    console.error("Failed to load category data");
	}, () => {
	    this.isLoading = false;
	})
    }

    ngOnInit(): void {
	this.getData();
    }

    onClickAdd(){
	this.router.navigate(["category", "new"]);
    }
    
}
