import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { BrandService } from "../../services/brand.service";
import { Brand } from "../../models/brand";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.css']
})
export class ListBrandsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    isLoading : boolean = true;
    dataSource: MatTableDataSource<Brand>;    
    displayed_columns : string[] = ["name", "origin"];
    
    constructor(public brandService : BrandService,
		public router: Router
	       ) {
	this.dataSource = new MatTableDataSource<Brand>();
    }


    setupDatasource(data : Brand[]){
	this.dataSource = new MatTableDataSource<Brand>(data);
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
	this.brandService.fetchAll().subscribe( results => {
	    this.setupDatasource(results.data);
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
