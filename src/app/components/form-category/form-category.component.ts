import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Category } from "../../models/category";
import { CategoryService } from "../../services/category.service";
import { ImageService } from "../../services/image.service";

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
    styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent implements OnInit {
    category: Category = {
	_id: "",
	name: ""
    };
    editMode: boolean=false;
    hasLoaded=false;
    submitButtonLabel="Create";
    imgsrc : string ="";

    pictureFile! : File;

    constructor(public categoryService : CategoryService,
		public imageService: ImageService,
		public route : ActivatedRoute,
		public router: Router
	       ) {
	const category_id= route.snapshot.paramMap.get("id");
	if(category_id){
	    this.category._id = category_id;
	    this.submitButtonLabel="Update";
	    this.editMode = true;
	}else{
	    this.submitButtonLabel="Create";
	    this.hasLoaded = true;
	}
    }

    getData(){
	if(this.category._id){
	    this.categoryService.fetch(this.category._id)
		.subscribe( results => {
		    this.category = results.data;
		    if(this.category.picture){
			const pic = this.category.picture;
			this.imgsrc = this.imageService.resolve(pic);
		    }
		}, fail => {

		}, () => {
		    this.hasLoaded = true;
		});
	}
    }

    ngOnInit(): void {
	this.getData();
    }

    onImageFileUpload(file : File ){
	this.pictureFile = file;
    }

    onSubmitButton(){

		//file: this.pictureFile,
	if(this.editMode && this.category._id){
	    this.categoryService.update(this.pictureFile, {
		...this.category
	    }).subscribe( result => {
		console.log("Update success");
	    }, fail => {
		var errorMsg = "Failed to change category";
		if(fail.error){
		    const code = fail.error.error.code
		    if(code == "ER_DUP_ENTRY"){
			errorMsg = `A category with name ${this.category.name} already exists`;
		    }
		}
		alert(errorMsg);
	    }, () => {
		console.log("Done");
	    });
	}else{
	    this.categoryService.create({
		name: this.category.name,
		file: this.pictureFile
	    }).subscribe( result => {
		console.log("Result", result);
	    }, err => {
		console.log("error", err);
	    });
	}
    }
    
}
