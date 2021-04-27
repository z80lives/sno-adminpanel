import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Category } from "../models/category";

import { Image, ImageService, ImageUpload } from "./image.service";



interface CategoryList{
    message: string;
    data: Category[];
};

interface CategoryQuery{
    message: string;
    data: Category;
};

interface CategoryData{
    _id?: string;
    name : string;
    file: File; //image file
};


@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(public http: HttpClient,
		private imageService : ImageService
	       ){}
    
		      
			     
    create(data : CategoryData){
	const {name, file} = data;

	const procResult =  (result: ImageUpload) => {
	    return this.http.post("/api/admin/category", {
		name,
		picture: {
		    _id: result.data._id
		}
	    });
	};
		      
	
	return this.imageService.afterUpload(file, procResult);
    }

    update(file: File | undefined, data : Category) {
	const {_id, name, picture} = data;

	const procResult =  () => {
	    return this.http.post("/api/admin/category/"+_id, {
		name
	    });
	};
	const pic_id = data.picture? data.picture._id : "" ;

	if(file !== undefined){
	    return this.imageService.afterUpload(file, procResult, pic_id);
	}else{
	    return procResult();
	}
    }

    fetchAll(){
	return this.http.get<CategoryList>("/api/category");
    }


    fetch(_id: string){
	return this.http.get<CategoryQuery>("/api/category/"+_id);
    }
}
