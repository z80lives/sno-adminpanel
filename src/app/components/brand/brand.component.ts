import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BrandService } from "../../services/brand.service";
import { ImageService } from "../../services/image.service";
import { Brand } from "../../models/brand";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
    isLoading = true;
    brand_id : string | null = null;
    pictureUrl : string = "#";
    brand!: Brand;

    
    constructor( public brandService : BrandService,
		 public route : ActivatedRoute,
		 public router : Router,
		 public imageService : ImageService
	       ) {
	this.brand_id = route.snapshot.paramMap.get("id");
    }


    getData(){
	console.log(this.brand_id);
	if(this.brand_id){
	    this.brandService
		.fetch(this.brand_id).subscribe( results =>{
		    this.brand = results.data;
		}, fail => {

		}, () => {
		    this.isLoading = false;
		});
	}
	//this.brandService.fet
    }
    
    ngOnInit(): void {
	this.getData();
    }

    onClickEdit(event: any){
	this.router.navigate(["brand", this.brand_id, "edit"]);
    }
}
