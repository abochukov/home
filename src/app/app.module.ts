import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import {RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { ContactsComponent } from './main/contacts/contacts.component';

import { HttpClientModule }    from '@angular/common/http';
import { SearchComponent } from './main/search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuComponent } from './main/menu/menu.component';
import { CartComponent } from './main/cart/cart.component';
import { CartTotalItemsComponent } from './main/cart/cart-total-items/cart-total-items.component';
import { ProductDetailsComponent } from './main/home/product-details/product-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'wiki-search', component: SearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:cat', component: HomeComponent },
  { path: 'home/:cat/:subCat', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
