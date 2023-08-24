import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cart } from '../models/cart';
import { imgUrls } from '../models/imgage';
import { Products } from '../models/products';
import { ApicallService } from '../services/apicall.service';
import { cartService } from '../services/cart.service';
import { ClassChangeService } from '../services/class-change.service';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartSubscription!: Subscription;
  constructor(private classChangeService: ClassChangeService, private apicallservice: ApicallService, private cartApi: cartService,private tostService:ToastrService) {
 
   }
  className!: string;
  mycart: Cart[] = [];
  images: imgUrls[] = [];
  totalCartcount:any=0;
  imageurl: any[] = [];
  display!: any;
  products:Products[]=[];
  ngOnInit(): void {
    this.classChangeService.classChange$.subscribe(className => {
      this.className = className;
    });

    this.getAllFromCart();

    this.cartSubscription=this.cartApi.getCartCount().subscribe(count=>
      {
        this.totalCartcount=count;
        console.log(this.totalCartcount)
      })
  
   // this.getImagesByProducuctId();
   
  }

  getImagesByProducuctId() {
    this.apicallservice.getAllImgs().subscribe((data) => {
      this.images = data;
       // console.log(this.images);
    })
    this.setimages();
  }

  getAllFromCart() {
    this.cartApi.getAll().subscribe((data) => {
      this.mycart = data;
    this.cartApi.initializeCart(this.mycart);
    })
  
  
  }

  setimages(){
    // debugger
    this.mycart.forEach((oneItem:Cart)=>{
      this.images.forEach((image:imgUrls)=>{
       // console.log(true)
        if(image.name==oneItem.name){
         // console.log(true)
        }
      })
    })
  }
  getTheproductprice(){
   this.apicallservice.getAllproducts().subscribe((data)=>{
    this.products=data;
   }) 
  }
  opencart(){
    
    this.getAllFromCart();
    this.getImagesByProducuctId();
    this.getTheproductprice();
    this.display=true;


  }

  deleteFromCart(cart:Cart){
    const request= this.cartApi.deleteFromCart(cart.cartId);

  // const request = this.userService.deleteUser(userId)
    request.subscribe((response: any) => {
      if (response == null) {
        console.log(response['error'])
      }
      else {
        this.tostService.success("removed from cart","",{timeOut:500})
        this.getAllFromCart();
       
      }
    })
  }

  
}
