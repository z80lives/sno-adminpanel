import { HttpClient } from "@angular/common/http";

export class WebService{
    protected token : string | null;

    private readonly url = "/api/";

    constructor(public http: HttpClient){	
	this.token = this.getToken();
    }

    get(url: string, options={}){
	return this.http.get(url, options);
    }


    post(url : string, body: any, options={}){
	return this.http.post(url, body, options);
    }

    put(url : string, body: any, options={}){
	return this.http.put(url, body, options);
    }


    delete(url : string, options={}){
	return this.http.delete(url, options);
    }
    

    protected getToken(): string | null{
	this.token = localStorage.getItem("token");
	return this.token;
    }
}
