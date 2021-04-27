import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Brand } from "../models/brand";

interface BrandList{
    message: string;
    data: Brand[];
}

interface BrandResponse{
    message: string;
    data: Brand;
}

interface BrandData{
    id?: string;
    name: string;
    origin: string;
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {

    constructor(public http: HttpClient) { }


    fetchAll(){
	return this.http.get<BrandList>("/api/brand");
    }

    fetch(id: string){
	return this.http.get<BrandResponse>("/api/brand/"+id);
    }

    
    create(data : BrandData){
	const {name, origin} = data;

	return this.http.post("/api/admin/brand", {
	    name,
	    origin
	});
    }

    update(data : Brand) {
	const {_id, name, origin} = data;

	return this.http.post("/api/admin/brand/"+_id, {
	    name,
	    origin
	});
    }

}
