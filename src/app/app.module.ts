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
import { ModalComponent } from './main/home/modal/modal.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'wiki-search', component: SearchComponent },
  { path: 'product/:id', component: ModalComponent }
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
    ModalComponent,
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
