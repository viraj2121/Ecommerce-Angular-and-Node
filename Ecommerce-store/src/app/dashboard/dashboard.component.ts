import { Component, HostListener, OnInit } from '@angular/core';
import { imgUrls } from '../models/imgage';
import { Products } from '../models/products';
import { ApicallService } from '../services/apicall.service';
import { ClassChangeService } from '../services/class-change.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private classChangeService: ClassChangeService,private apicall:ApicallService) { }

  imgUrls:imgUrls[]=[];
  ngOnInit(): void {
    this.getallProducts();

  }
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event:any) {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollOffset >= 100) {
      // Perform your desired action here
      //console.log('Scrolled 50px from the top');
      this.changeClass();
    }else{
      this.removeClass();
    }
  }
  changeClass() {
    const newClassName = 'sticky-top'; // Set the desired class name
    this.classChangeService.updateClass(newClassName);
  }
  removeClass(){
    const newClassName = ''; // Set the desired class name
    this.classChangeService.updateClass(newClassName);
  }
  Products:Products[]=[];
  getallProducts(){
  
    this.apicall.getAllproducts().subscribe(
      data => {
      this.Products=data;
      this.getAllImgaeUrls();
      }
    
    );
   // console.log(this.Products);
  }
  getAllImgaeUrls(){
    this.apicall.getAllImgs().subscribe(
      (data:any) => {
      this.imgUrls=data;
     for (let index = 0; index <  this.imgUrls.length; index++) {
      const element =  this.imgUrls[index];
      this.Products.forEach(prduct=>{
        if(prduct.name==element.name){
          prduct.imgurl=element.imgurl;
          ///console.log(prduct)
        }
        
      })
     }

      }
      
    );
    
  }
  sidebarVisible2: any=false;
  isSildebar(){
    this.sidebarVisible2=!this.sidebarVisible2;
  }
 
}

