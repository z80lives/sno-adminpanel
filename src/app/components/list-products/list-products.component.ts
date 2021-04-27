import { Component, OnInit } from '@angular/core';
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
    isLoading : boolean = true;
    dataSource: Product[] = [];
    displayed_columns: string[] = ["name", "packaging"];
    
    constructor(public productService : ProductService) { }

    getData(){
	this.productService.fetchAll().subscribe( results => {
	    this.dataSource = results.data;
	}, fail => {
	    
	}, () => {
	    this.isLoading = false;
	});
    }
    
    ngOnInit(): void {
	this.getData();
  }

}
