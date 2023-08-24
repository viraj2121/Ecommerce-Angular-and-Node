import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { url } from 'inspector';

@Injectable({
    providedIn: 'root'
})
export class cartService{
     cartUrl = "http://localhost:8080/api/cart";
     cart!:Cart;
     private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
     private cartItems: any[] = [];
    constructor(private httpClient: HttpClient,
        private router: Router) { }
    // httpOptions = {
    //     headers: new HttpHeaders({
    //         token: sessionStorage['token']
    //     })
    // }

   // selectedcolor: string, selectedSize: string, name: string, quantity: number,prodid:number
    addTocart(cart:Cart) {
        // this.cart.color=selectedcolor;
        // this.cart.name=name;
        // this.cart.size=selectedSize;
        // this.cart.quantity=quantity;
        // this.cart.prodid=prodid;
        const body = cart;
        return this.httpClient.post(this.cartUrl, body)
      }

      getAll(){
        const URI = this.cartUrl;
        return this.httpClient.get<any>(URI)
      }

      getCartCount(): Observable<number> {
        return this.cartCountSubject.asObservable();
      }
      updateCart(item: any): void {
        this.cartItems.push(item);
        this.cartCountSubject.next(this.cartItems.length);
      }
      initializeCart(items: any[]): void {
      
        this.cartItems = items;
        this.cartCountSubject.next(this.cartItems.length);
      }

      deleteFromCart(cartId:number){
        debugger
        const body=cartId;
       const url=this.cartUrl+'/'+cartId;
        return this.httpClient.delete(url)
      }
}
