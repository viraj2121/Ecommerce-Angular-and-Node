import { imgUrls } from "./imgage"

export interface Products{
    prodid:number,
    name:string,
    description:string,
    category:string,
    size:string,
    cost:number,
    color:string,
    imgurl:string
    imgObject:imgUrls;
    tags:string;
}