import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { imgUrls } from '../models/imgage';
import { Products } from '../models/products';
import { ApicallService } from '../services/apicall.service';
import { ClassChangeService } from '../services/class-change.service';
import { SharedService } from '../services/shared-popup.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ImgViewrComponent } from '../img-viewr/img-viewr.component';
import { QuickviewComponent } from '../quickview/quickview.component';
// import * as AOS from 'aos';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-productoverview',
  templateUrl: './productoverview.component.html',
  styleUrls: ['./productoverview.component.scss'],

})


export class ProductoverviewComponent implements OnInit {
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  constructor(private classChangeService: ClassChangeService, private apicall: ApicallService, private sharedService: SharedService) {
    this.searchSubject
    .pipe(
      debounceTime(1000), // Adjust the debounce time (in milliseconds) as needed
      takeUntil(this.destroy$)
    )
    .subscribe((searchTerm) => {
      // Call your search function here
      this.onsearch(searchTerm);
    });
  }

  ngOnInit(): void {
    // AOS.init();
    this.getallProducts();
    //this.getCategoryNames();
  }
  @Output() CartCount = new EventEmitter<string>();
  Products: Products[] = [];
  productsview: Products[] = [];
  imgUrls: imgUrls[] = [];
  unfilteredlist: Products[] = [];
  isModalOpen: boolean = false;
  theproduct!: Products;
  productId!: number;
  categoryName: string[] = []
  selectedCategory: string = 'All products';
  animateFilter: string | null = null;
  sortByArray: string[] = ["Default", "Price : Low to High", "Price : High to Low"]
  colorNames: string[] = []
  tagsValues: String[] = [];
  @ViewChild(ImgViewrComponent) imageViewerComponent!: ImgViewrComponent;
  @ViewChild('filterbox') filterbox!: ElementRef;
  @ViewChild('filterbutton') filterbutton!: ElementRef;
  @ViewChild('searchbutton') searchbutton!: ElementRef;

  @ViewChild(QuickviewComponent) quickviewComponent!: QuickviewComponent;
  activesortPrice: string = "Default";
  activcolor: string = "";
  isFilterBox: boolean = false;
  searchvalue!: string;
  searchresult!: any;
  activetag: string = "";
  isToShowSearchInput: boolean = false;
  isLoadingCards:boolean=false;
  cardanimationdelay:number=0.1
  getallProducts() {

    this.apicall.getAllproducts().subscribe(
      data => {
        this.Products = data;
        this.getAllImgaeUrls();

      }

    );

  }

  getAllImgaeUrls() {
    this.apicall.getAllImgs().subscribe(
      (data: any) => {
        this.imgUrls = data;
        for (let index = 0; index < this.imgUrls.length; index++) {
          const element = this.imgUrls[index];
          this.Products.forEach(prduct => {
            //this.productsview.push(this.Products[index]);
            if (prduct.prodid == element.prodid && element.isbanner == false && element.isthumbnail == true) {
              this.Products[index].imgObject = element;
              this.productsview.push(this.Products[index]);

            }

          })
        }
        this.productsview.sort(this.compareProductname)
        this.unfilteredlist = this.productsview;

        this.getCategoryNames();
        this.getThecolorvalues();
        this.getTagsValues();
      }

    );

  }
  compareProductname(a: any, b: any) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
   
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
  openModal(id: number) {
    this.productsview.forEach(element => {
      if (element.prodid == id) {
        this.theproduct = element;
      }
    });
    this.productId = id;

    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.quickviewComponent.createBlankCart();
  }

  confirmModal() {
    // Handle confirm action here
    this.closeModal();
  }
  
  getCategoryNames() {

    this.productsview.forEach((element: Products) => {
      var category = element.category;
      this.categoryName.push(category);
    })
    const uniqueArray = [...new Set(this.categoryName)];
    this.categoryName = uniqueArray;
  }

  sortbycategory(name: string) {

    if (name == "All products") {
      this.productsview = [];
      this.productsview = this.unfilteredlist;
    } else {

      this.productsview = this.unfilteredlist;
      const filteredProducts = this.productsview.filter(product => product.category === name);
      this.productsview = [];
      this.productsview = filteredProducts;

    }
    this.selectedCategory = name;
    this.animateFilter = 'scale';
    this.gotofirstpage()
  }

  triggerImageViewer(imageUrl: any) {
    this.imageViewerComponent.openImageViewer(imageUrl);
  }


  getThecolorvalues() {
    this.productsview.forEach((element: Products) => {
      var colorNames = element.color;
      this.colorNames.push(colorNames);
    })
    const uniqueArray = [...new Set(this.colorNames)];
    this.colorNames = uniqueArray;
  }

  getTagsValues() {
    this.productsview.forEach((element: Products) => {

      var tagsValues = element.tags;
      this.tagsValues.push(tagsValues);
    })
    const uniqueArray = [...new Set(this.tagsValues)];
    this.tagsValues = uniqueArray;
  }

  togglefilter() {
    this.filterbutton.nativeElement.classList.toggle("active-toggle")
    this.searchbutton.nativeElement.classList.remove("active-toggle")
    this.isFilterBox = !this.isFilterBox;
    this.isToShowSearchInput = false;
  }

  sortbyPrice(sortname: any) {
    this.activcolor = ""
    this.activetag = ""
    this.productsview = [];
    if (sortname == "Price : Low to High") {
      this.productsview = [];
      this.productsview = this.unfilteredlist;
      this.productsview.sort((a, b) => a.cost - b.cost);
      // const filteredProducts = this.productsview.filter(product => product.category === name);
    } else if (sortname == "Price : High to Low") {
      this.productsview = this.unfilteredlist;
      this.productsview.sort((a, b) => b.cost - a.cost);
    }
    else {
      this.getallProducts();
    }
    this.activesortPrice = sortname;
  }

  filterByColor(color: string) {
    this.activesortPrice = "";
    this.activetag = ""
    this.productsview = this.unfilteredlist;
    const filteredProducts = this.productsview.filter(product => product.color == color);
    this.productsview = [];
    this.productsview = filteredProducts;
    this.activcolor = color
  }

  filterByTags(tagname: any) {
    this.activesortPrice = "";
    this.activcolor = "";
    this.productsview = this.unfilteredlist;
    const filteredProducts = this.productsview.filter(product => product.tags == tagname);
    this.productsview = filteredProducts;
    this.activetag = tagname;
  }

  onsearch(searchTerm: any) {
    this.searchSubject.next(searchTerm);
    this.isLoadingCards=true;

  if (this.searchvalue.trim() != "") {
    const searchedValue =  searchTerm.target.value.toLowerCase();
    this.searchresult = this.unfilteredlist.filter(product => product.name.toLocaleLowerCase().includes(searchedValue));
    this.productsview = this.searchresult;
  } else {
    this.productsview = this.unfilteredlist;
  }
  this.isLoadingCards=false;

  }

  togglSearch() {
    this.isFilterBox = false;
    this.isToShowSearchInput = !this.isToShowSearchInput;
    this.searchbutton.nativeElement.classList.toggle("active-toggle")
    this.filterbutton.nativeElement.classList.remove("active-toggle")
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  itemsPerPage = 8;
  currentPage = 1;
  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.productsview.slice(startIndex, endIndex);
  }
  previousPage() {
    this.cardanimationdelay=0.2
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nextPage() {
    this.cardanimationdelay=10
    if (this.currentPage * this.itemsPerPage < this.productsview.length) {
      this.currentPage++;
    }
  }

  gotofirstpage(){
    this.currentPage=1;
  }
  
}


