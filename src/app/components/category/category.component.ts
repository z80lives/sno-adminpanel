import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "../../services/category.service";
import { ImageService } from "../../services/image.service";
import { Category } from "../../models/category";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    isLoading = true;
    category_id : string | null = null;
    pictureUrl : string = "#";
    reloadImage = false;
    category!: Category;

    constructor( public categoryService : CategoryService,
		 public route : ActivatedRoute,
		 public router : Router,
		 public imageService : ImageService
	       ) {
	this.category_id = route.snapshot.paramMap.get("id");
	this.reloadImage = this.categoryService.getPictureRefresh();
    }

    getPicture(){	
	if(this.category.picture){
	    console.log("reload image", this.reloadImage);
	    this.pictureUrl = this.imageService.getImageUrl(this.category.picture._id, true);
	}
    }

    getData(){
	if(this.category_id){
	    this.categoryService
		.fetch(this.category_id).subscribe( results =>{
		    this.category = results.data;
		    this.getPicture();
		}, fail => {

		}, () => {
		    this.isLoading = false;
		});
	}
	//this.categoryService.fet
    }
    
    ngOnInit(): void {
	this.getData();
	//this.getPicture();
	this.categoryService.onPictureChange()
	    .subscribe( () => {		
		this.reloadImage = true;
	    });
    }

    onClickEdit(event: any){
	this.router.navigate(["category", this.category_id, "edit"]);
    }

}
