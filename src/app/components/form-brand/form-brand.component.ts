import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Brand } from "../../models/brand";
import { BrandService } from "../../services/brand.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-form-brand',
  templateUrl: './form-brand.component.html',
  styleUrls: ['./form-brand.component.css']
})
export class FormBrandComponent implements OnInit {
    brand: Brand = {
	_id: "",
	name: "",
	origin: ""
    };
    editMode: boolean=false;
    hasLoaded=false;
    submitButtonLabel="Create";


    constructor(public brandService : BrandService,
		public route : ActivatedRoute,
		public router: Router,
		public _location : Location
	       ) {
	const brand_id= route.snapshot.paramMap.get("id");
	if(brand_id){
	    this.brand._id = brand_id;
	    this.submitButtonLabel="Update";
	    this.editMode = true;
	}else{
	    this.submitButtonLabel="Create";
	    this.hasLoaded = true;
	}
    }

    getData(){
	if(this.brand._id){
	    this.brandService.fetch(this.brand._id)
		.subscribe( results => {
		    this.brand = results.data;
		}, fail => {
		    console.error(fail);
		}, () => {
		    this.hasLoaded = true;
		});
	}
    }

    ngOnInit(): void {
	this.getData();
    }

    onSubmitButton(){
		//file: this.pictureFile,
	if(this.editMode && this.brand._id){
	    this.brandService.update({
		...this.brand
	    }).subscribe( result => {
		this._location.back();
	    }, fail => {
		var errorMsg = "Failed to change brand";
		if(fail.error){
		    const code = fail.error.error.code
		    if(code == "ER_DUP_ENTRY"){
			errorMsg = `A brand with name ${this.brand.name} already exists`;
		    }
		}
		alert(errorMsg);
	    }, () => {
		console.log("Done");
	    });
	}else{
	    this.brandService.create({
		name: this.brand.name,
		origin: this.brand.origin
	    }).subscribe( result => {
		this.router.navigate(["brand", result._id], {replaceUrl: true});
	    }, fail => {
		var errorMsg = "Failed to create brand";
		const code = fail.error.error.code
		if(fail.error){
		    if(code == "ER_DUP_ENTRY"){
			errorMsg = `A brand with name ${this.brand.name} already exists`;
		    }
		}
		alert(errorMsg);
	    });
	}
    }
 


}
