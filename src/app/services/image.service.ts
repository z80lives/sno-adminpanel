import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { Observable } from "rxjs";

export interface ImageUpload{
    return_code: number;
    data: {
	_id: string;
    }
};

export interface Image{
    _id: string;
};

@Injectable({
  providedIn: 'root'
})
export class ImageService {

    constructor(public http: HttpClient){}

    create(file : File){
	const formData = new FormData();
	formData.append("image", file);
	
	const imageUpload$ = this.http.post<ImageUpload>("/api/admin/picture/",							
							formData);
	return imageUpload$;
    }


    update(file : File, _id:string){
	const formData = new FormData();
	formData.append("image", file);
	
	const imageUpload$ = this.http.post<ImageUpload>("/api/admin/picture/"+_id,							
							formData);
	return imageUpload$;
    }

    fetchImage(_id : string){
	return this.http.get("/api/picture/"+_id, { responseType: 'blob'});
    }

    getImageUrl(_id: string){
	return "/api/picture/"+_id+"?render=true";
    }

    resolve(picture: Image){
	return this.getImageUrl(picture._id);
    }

    afterUpload(file : File, request : any, _id : string| null=null){
	return new Observable( (observer) => {
	    if(file){
		const action = (_id===null)?
		    this.create(file) : this.update(file, _id);

		action
		    .subscribe(result => {
			request(result)
			    .subscribe(
				observer.next,
				observer.error
			    );
		    });
	    }else{
		observer.error("No file received");
	    }

	    return {
		unsubscribe(){
		    //todo: implement progress and clear the data here
		}
	    }
	})
    }
}
