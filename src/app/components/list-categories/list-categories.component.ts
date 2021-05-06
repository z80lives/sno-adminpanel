import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/category";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    isLoading : boolean = true;

    displayed_columns : string[] = ["name", "fileExists"];
    dataSource : MatTableDataSource<Category>;

    constructor(public categoryAPI : CategoryService,
		public router : Router
	       ) {
	this.dataSource = new MatTableDataSource<Category>();
    }


    setupDatasource(data : Category[]){
	this.dataSource = new MatTableDataSource<Category>(data);
	this.dataSource.paginator = this.paginator;
	this.dataSource.sort = this.sort;
    }


    @ViewChild(MatSort) set content(content: any) {
	this.sort = content;
	if (this.sort){
	    this.dataSource.sort = this.sort;

	}
    }


     applyFilter(event : Event){
	const filterValue = (event.target as HTMLInputElement).value;
	this.dataSource.filter = filterValue.trim().toLowerCase();
	if (this.dataSource.paginator) {
	    this.dataSource.paginator.firstPage();
	}
    }
    

    getData(){
	this.categoryAPI.fetchAll().subscribe( results => {
	    //this.dataSource = results.data;
	    this.setupDatasource(results.data);
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
