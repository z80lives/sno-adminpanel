import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Product } from "../../models/product";
import { Brand } from "../../models/brand";
import { Category } from "../../models/category";
import { ProductService } from "../../services/product.service";
import { BrandService } from "../../services/brand.service";
import { CategoryService } from "../../services/category.service";
import { ImageService } from "../../services/image.service";
import {FormControl} from '@angular/forms';


import {Observable } from "rxjs";
import {map, startWith} from 'rxjs/operators'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {

    product: Product = {
	_id: "",
	name: "",
	packaging: ""
    };
    
    selected_category!: string;
    selected_brand!: string;

    brands!: Brand[];
    categories!: Category[];
    filtered_categories: Category[] = [];
    filtered_brands: Brand[] = [];
    
    editMode: boolean=false;
    hasLoaded=false;
    submitButtonLabel="Create";
    imgsrc : string ="";

    pictureFile! : File;

    constructor(public productService : ProductService,
		public brandService : BrandService,
		public categoryService : CategoryService,
		public imageService: ImageService,
		public route : ActivatedRoute,
		public router: Router
	       ) {
	const product_id= route.snapshot.paramMap.get("id");
	if(product_id){
	    this.product._id = product_id;
	    this.submitButtonLabel="Update";
	    this.editMode = true;
	}else{
	    this.submitButtonLabel="Create";
	    this.hasLoaded = true;
	}
    }

    getBrands(){
	this.brandService.fetchAll()
	    .subscribe( results => {
		this.brands = results.data;
		this.filtered_brands = results.data;
	    });
    }

    getCategories(){
	this.categoryService.fetchAll()
	    .subscribe( results => {
		this.categories = results.data;
		this.filtered_categories = results.data;
	    });
    }    

    getProduct(){
	if(this.product._id){
	    this.productService.fetch(this.product._id)
		.subscribe( results => {
		    this.product = results.data;
		    if(this.product.picture){
			const pic = this.product.picture;
			this.imgsrc = this.imageService.resolve(pic);
			if(this.product.category)
			    this.selected_category =  this.product.category._id;
			if(this.product.brand)
			    this.selected_brand = this.product.brand._id;
		    }
		}, fail => {

		}, () => {
		    this.hasLoaded = true;
		});
	}
    }

    getData(){
	this.getProduct();
	this.getBrands();
	this.getCategories();
    }

    ngOnInit(): void {
	this.getData();
    }

    onImageFileUpload(file : File ){
	this.pictureFile = file;
    }

    onSubmitButton(){
	var inputData : any = {
	    ...this.product
	};
	if(this.selected_category)
	    inputData.category = this.selected_category;
	if(this.selected_brand)
	    inputData.brand = this.selected_brand;
	
		//file: this.pictureFile,
	if(this.editMode && this.product._id){
	    console.log("Product", inputData);
	    this.productService.update(this.pictureFile, 
				       inputData
				      )
		.subscribe( results => {
		    this.router.navigate(["product", this.product._id], {replaceUrl: true});
		}, fail => {
		    var errorMsg = "Failed to update product";

		    if(fail.error){
			const code = fail.error.error.code
			if(code == "ER_DUP_ENTRY"){
			    errorMsg = `A product with name ${this.product.name} already exists`;
			}
		    }
		    alert(errorMsg);
		    console.error("Failed to create product", fail);
		}, () => {
		    console.log("Done");
		});
	}else{
	    delete inputData._id;
	    this.productService.create({
		...inputData,
		file: this.pictureFile
	    })
		.subscribe( result => {
		    this.router.navigate(["product", result.data._id], {replaceUrl: true});
		}, fail => {
		    var errorMsg = "Failed to create product";

		    if(fail.error){
			const code = fail.error.error.code
			if(code == "ER_DUP_ENTRY"){
			    errorMsg = `A product with name ${this.product.name} already exists`;
			}
		    }
		    console.log("error", fail);
		});
	}
    }

    filterCategory(filterString : string){
	this.filtered_categories = this.categories.filter( category => 
	    category.name.toLowerCase().indexOf(filterString.toLowerCase()) === 0
	);
    }


    filterBrand(filterString : string){
	this.filtered_brands = this.brands.filter( brand => 
	    brand.name.toLowerCase().indexOf(filterString.toLowerCase()) === 0
	);
    }

}
