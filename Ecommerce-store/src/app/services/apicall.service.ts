import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {
    private baseUrl: String = "http://localhost:8080/api";
    constructor(private httpClient: HttpClient,
        private router: Router) { }
    httpOptions = {
        headers: new HttpHeaders({
            token: sessionStorage['token']
        })
    }

    getAllproducts() {
        const URI = this.baseUrl + "/product";
        return this.httpClient.get<any>(URI)
    }
    getAllImgs(){
        const URI = this.baseUrl + "/imgurl";
        return this.httpClient.get<any>(URI)
    }

    getimageByProdId(id:any){
        const URI=this.baseUrl+"/imgurl/image/"+id;
        return this.httpClient.get<any>(URI)
    }
}
