import {
    AfterViewInit,
    Component, OnInit,
    ViewChild,
    ElementRef
       } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    isLoading : boolean = true;
    //dataSource: Product[] = [];
    dataSource: MatTableDataSource<Product>;
    

    @ViewChild(MatSort) set content(content: any) {
	this.sort = content;
	if (this.sort){
	    this.dataSource.sort = this.sort;

	}
    }
    
    displayed_columns: string[] = ["name", "packaging", "fileExists", "category", "brand", "origin"];
    
    constructor(public productService : ProductService,
		public router: Router
	       ) {
	this.dataSource = new MatTableDataSource<Product>();
    }

    getData(){
	this.productService.fetchAll().subscribe( results => {
	    this.setupDatasource(results.data);
	}, fail => {
	    
	}, () => {
	    this.isLoading = false;
	});
    }

    applyFilter(event : Event){
	const filterValue = (event.target as HTMLInputElement).value;
	this.dataSource.filter = filterValue.trim().toLowerCase();
	if (this.dataSource.paginator) {
	    this.dataSource.paginator.firstPage();
	}
    }
    
    ngOnInit(): void {
	this.getData();
    }    

    setupDatasource(data : Product[]){
	this.dataSource = new MatTableDataSource<Product>(data);
	this.dataSource.paginator = this.paginator;
	this.dataSource.sort = this.sort;
    }

    ngAfterViewInit() : void{
	this.dataSource.paginator = this.paginator;
	//this.dataSource.sort = this.sort;
    }

    onClickAdd(){
	this.router.navigate(["product", "new"]);
    }

}
