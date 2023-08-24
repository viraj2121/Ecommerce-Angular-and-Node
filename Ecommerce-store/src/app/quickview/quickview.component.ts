import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Cart } from '../models/cart';
import { Products } from '../models/products';
import { cartService } from '../services/cart.service';
import { SharedService } from '../services/shared-popup.service';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.scss']
})
export class QuickviewComponent implements OnInit {
  @Input() isOpen!: boolean;
  @Input()  theProduct!:Products;
  @Input() productId!:number;

  ngOnInit(): void {
    
  console.log(this.productId)
  }

  constructor(private cartService:cartService,private toastr:ToastrService) { }

  @Output() closeModal = new EventEmitter<void>();

  showFlag: boolean = false;
  selectedImageIndex: number = -1;


closeEventHandler() {
  this.dropdownSizeHeader="Choose an option";
    this.showFlag = false;
    // this.currentIndex = -1;
}
toggleSizeDropdown:boolean=false;
dropdownSizeHeader:String="Choose an option"
Sizes:string[]=["Size S","Size M","Size L","Size XL"]
toggleDropdownSize(){
  this.toggleSizeDropdown=!this.toggleSizeDropdown;
  this.isToshowColorDropdown=false;
}
selectedSize:string="";
onSelectedSize(size:string){
  this.dropdownSizeHeader=size;
  this.toggleSizeDropdown=false;
  this.selectedSize=size;
}
isToshowColorDropdown:boolean=false;
toggleDropdownColor(){
this.isToshowColorDropdown=!this.isToshowColorDropdown;
this.toggleSizeDropdown=false;
}
counter:number=1
increamentdecreament(name:string){
  if(name==="plus"){
    this.counter++;
  }else if(name==="minus" && this.counter>1){
    this.counter--;
  }
}
dropdowncolorHeader:string="Choose an option"
Colors:string[]=["Black","Red","White","Blue"]
selectedcolor:string="";
onSelectedcolor(color:string){
  this.dropdowncolorHeader=color;
  this.isToshowColorDropdown=false;
  this.selectedcolor=color;
}

cart:Cart={cartId:0,name:'',size:'',prodid:0,quantity:0,color:''}
Addtocart(){

  this.cart.prodid=this.theProduct.prodid;
  this.cart.color=this.selectedcolor;
  this.cart.size=this.selectedSize;
  this.cart.name=this.theProduct.name;
  this.cart.quantity=this.counter;

var isValidCart=false;
isValidCart=this.checkvalidation();
if(isValidCart){
  const request=this.cartService.addTocart(this.cart)
  request.subscribe(response => {
    console.log("response from question bank from addquestion");
    if (response == null) {
      console.log(response['error'])
    }
    else {
      this.createBlankCart();
      this.cartService.updateCart(this.cart)
      this.closeModal.emit();
      this.toastr.success("added to cart","",{timeOut:500})
      // alert("added to cart")
    }
  
  
  })
}
else{
  this.toastr.error("Please enter valid data")
  // alert("Please add correct data")
}


//  const request = this.questionbankService.addQuestion(this.question, this.optionA, this.optionB, this.optionC, this.optionD, this.answer, this.marks)


}

createBlankCart(){
this.dropdownSizeHeader="Choose an option";
this.dropdowncolorHeader="Choose an option";
this.counter=1;
this.selectedcolor="";
this.selectedSize="";
 
}


checkvalidation():boolean{
  var isvalid=false;
if(this.dropdownSizeHeader!="Choose an option" && this.dropdowncolorHeader!="Choose an option"&&this.counter>0){
  isvalid=true;
}else{
  isvalid=false;
}
return isvalid;
 
}

}




