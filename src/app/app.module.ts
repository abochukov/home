import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import {RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/products/home/home.component';
import { ContactsComponent } from './main/contacts/contacts.component';

import { HttpClientModule }    from '@angular/common/http';
import { SearchComponent } from './main/search/search.component';
import { CategoriesComponent } from './main/products/categories/categories.component';
import { MenuComponent } from './main/menu/menu.component';
import { CartComponent } from './main/cart/cart.component';
import { CartTotalItemsComponent } from './main/cart/cart-total-items/cart-total-items.component';
import { ProductDetailsComponent } from './main/products/home/product-details/product-details.component';
import { FooterComponent } from './main/footer/footer.component';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { DeliveryComponent } from './main/delivery/delivery.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'delivery', component: DeliveryComponent }
  // { path: 'wiki-search', component: SearchComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    SearchComponent,
    CategoriesComponent,
    MenuComponent,
    CartComponent,
    CartTotalItemsComponent,
    ProductDetailsComponent,
    FooterComponent,
    AboutUsComponent,
    DeliveryComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
