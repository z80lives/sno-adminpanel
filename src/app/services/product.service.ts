import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from "../models/product";

import { Image, ImageService, ImageUpload } from "./image.service";

interface ProductList{
    message: string;
    data: Product[];
}

interface ProductQuery{
    message: string;
    data: Product;
}

interface ProductData{
    _id?: string;
    name: string;
    packaging: string;
    file: File; //image file
    picture?: {
	_id: string;
    };
    brand? : string;
    category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    product! : Product;
    
    constructor(public http: HttpClient,
		private imageService : ImageService
	       ) { }

    fetchAll() {
	return this.http.get<ProductList>("/api/product");
    }


    create(data : ProductData){
	const {name, file, packaging} = data;

	const procResult =  (result: ImageUpload) => {
	    return this.http.post("/api/admin/product", {
		name,
		packaging,
		picture: {
		    _id: result.data._id
		}
	    });
	};
		      
	
	return this.imageService.afterUpload(file, procResult);
    }
    
    update(file: File | undefined, data : ProductData ) {
	const {_id} = data;
	
	const procResult = () => {
	    return this.http.post("/api/admin/product/"+_id,
				  data);		
	};

	const pic_id = data.picture? data.picture._id : "";

	if(file !== undefined){
	    return this.imageService.afterUpload(file, procResult, pic_id);
	}else{
	    return procResult();
	}
    }

    fetch(_id: string){
	return this.http.get<ProductQuery>("/api/product/"+_id+"?populate=true");
    }

}
