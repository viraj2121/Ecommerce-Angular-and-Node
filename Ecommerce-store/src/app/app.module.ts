import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { QuickviewComponent } from './quickview/quickview.component';
import { ProductoverviewComponent } from './productoverview/productoverview.component';
import { SharedService } from './services/shared-popup.service';
import { ImgViewrComponent } from './img-viewr/img-viewr.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { ScrollRevealDirective } from './scroll-reveal.directive';
import { ButtonModule } from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    QuickviewComponent,
    ProductoverviewComponent,
    ImgViewrComponent,

    //ScrollRevealDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, FormsModule,
    ToastrModule.forRoot(),
    ButtonModule,
    SidebarModule

  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
