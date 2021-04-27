import {Brand} from "./brand";
import {Category} from "./category";

export interface Product{
    _id: string;
    name: string;
    packaging: string;
    picture?: {
	_id: string;
    };
    brand? : Brand;
    category?: Category;
    url?: string;
    pic?: string;
};
