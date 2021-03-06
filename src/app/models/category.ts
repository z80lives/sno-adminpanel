/**
 * Category model
 * - url contains a path to picture url
 **/
export interface Category{
    _id: string;
    name: string;
    url?: string | undefined ;
    fileExists?: string;
    picture?: {
	_id: string;
    };
    product_count?: number ;
}
