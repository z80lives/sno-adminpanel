import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Category } from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    constructor(public http: HttpClient){}


    fetchAll(){
	interface CategoryList{
	    message: string;
	    data: Category[];
	};
	return this.http.get<CategoryList>("/api/category");
    }
}
