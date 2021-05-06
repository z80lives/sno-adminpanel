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

    create(file : File, _type: string = ""){
	const formData = new FormData();
	const type_str = _type===""?"" : `?type=${_type}`;
	formData.append("image", file);
	
	const imageUpload$ = this.http.post<ImageUpload>("/api/admin/picture/" + type_str,							
							formData);
	return imageUpload$;
    }


    update(file : File, _id:string, _type: string = ""){
	const formData = new FormData();
	const type_str = _type===""?"" : `?type=${_type}`;
	formData.append("image", file);
	
	const imageUpload$ = this.http.post<ImageUpload>("/api/admin/picture/"+_id+type_str,							
							formData);
	return imageUpload$;
    }

    fetchImage(_id : string){
	return this.http.get("/api/picture/"+_id, { responseType: 'blob'});
    }

    getImageUrl(_id: string, timestamp=false){
	var tsstring="";
	if(timestamp){
	    tsstring = "&date="+(new Date()).toISOString();
	}
	return "/api/picture/"+_id+"?render=true"+tsstring;
    }

    resolve(picture: Image){
	return this.getImageUrl(picture._id);
    }

    afterUpload(file : File, request : any, _id : string| null=null, _type : string = ""){
	return new Observable( (observer) => {
	    if(file){
		const action = (_id===null)?
		    this.create(file, _type) : this.update(file, _id, _type);

		action
		    .subscribe(result => {
			
			request(result)
			    .subscribe(
				(r:unknown) => {
				    observer.next(r)

				},
				(r:any) => {
				    observer.error(r)
				},
				() => {
				    observer.complete()
				}
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
