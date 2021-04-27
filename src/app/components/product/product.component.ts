import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { ImageService } from "../../services/image.service";
import { Product } from "../../models/product";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    isLoading = true;
    product_id : string | null = null;
    pictureUrl : string = "#";
    product!: Product;

    
    constructor( public productService : ProductService,
		 public route : ActivatedRoute,
		 public router : Router,
		 public imageService : ImageService
	       ) {
	this.product_id = route.snapshot.paramMap.get("id");
    }


    getData(){
	if(this.product_id){
	    this.productService
		.fetch(this.product_id).subscribe( results =>{
		    this.product = results.data;
		    if(this.product.picture)
			this.pictureUrl = this.imageService.getImageUrl(this.product.picture._id);
		}, () => {
		    
		}, () => {
		    this.isLoading = false;
		});
	}
	//this.productService.fet
    }
    
    ngOnInit(): void {
	this.getData();
    }

    onClickEdit(event: any){
	this.router.navigate(["product", this.product_id, "edit"]);
    }

}
