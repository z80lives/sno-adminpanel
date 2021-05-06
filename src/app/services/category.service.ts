import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Category } from "../models/category";

import { Image, ImageService, ImageUpload } from "./image.service";

import { Observable } from "rxjs";

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

    //Emit when the picture is updated for a selected category.
    // Lets the component know when to reload the current image
    // we can simply add timestamp to url of img to force the
    // browser to update the image, instead of loading from cache.
    pictureUpdateEvent = new EventEmitter<any>();
    public categoryPagePictureRefresh : boolean = false;
		      
    public onPictureChange(): EventEmitter<any>{
	return this.pictureUpdateEvent;
    }

    public getPictureRefresh(){
	const refresh_state = this.categoryPagePictureRefresh;
	this.categoryPagePictureRefresh = false;
	return refresh_state;
    }
			     
    create(data : CategoryData) : Observable<any>{
	const {name, file} = data;

	const procResult =  (result: ImageUpload) => {
	    return this.http.post<CategoryQuery>("/api/admin/category", {
		name,
		picture: {
		    _id: result.data._id
		}
	    });
	};
		      	
	return this.imageService.afterUpload(file, procResult, null, "category");
    }

    update(file: File | undefined, data : Category) : Observable<any> {
	const {_id, name, picture} = data;

	const procResult =  () => {
	    return this.http.post<CategoryQuery>("/api/admin/category/"+_id, {
		name
	    });
	};
	const pic_id = data.picture? data.picture._id : "" ;

	if(file !== undefined){
	    this.categoryPagePictureRefresh = true;
	    this.pictureUpdateEvent.emit();
	    return this.imageService.afterUpload(file, procResult, pic_id, "category");
	}else{
	    return procResult();
	}
    }

    fetchAll(){
	return this.http.get<CategoryList>("/api/admin/category");
    }


    fetch(_id: string){
	return this.http.get<CategoryQuery>("/api/category/"+_id);
    }
}
