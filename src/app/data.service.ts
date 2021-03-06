import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Categories, SubCategories, Products } from './items';
import { imageDetails } from './image';

// import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private username = 'asss';
  public result: any;

  constructor(private http: HttpClient) {
    console.log('GitHub Service');
   }

   getAllUsers() {
     return this.http.get('http://api.github.com/users');
   }

   getUserById(id) {
     return this.http.get(`http://api.github.com/users/${id}`)
   }

   saveFormData(formData) {
     console.log(formData);
     this.http.post('http://localhost:3000/users', formData).subscribe(data => {
      console.log(data);
     });
   }

   getAllCategories() {
     return this.http.get<Categories>('http://localhost:4000/api/categories');
   }

   getSubCategories(id: number) {
    return this.http.get<SubCategories>(`http://localhost:4000/api/categories/${id}`)
   }

   getProducts(subCategoryId: number) {
    return this.http.get<Products>(`http://localhost:4000/api/products/${subCategoryId}`);   
   }

   saveOrderForm(orderValues) {
    return this.http.post('http://localhost:4000/api/orders', orderValues).subscribe(data => {
    });
   }

   saveOrderFormCompany(companyValues) {
     console.log(companyValues);
    return this.http.post('http://localhost:4000/api/ordersCompany', companyValues).subscribe(data => {
      
    })
   }

   search(searchKey) {
    //  console.log(searchKey);
    return this.http.get<Products>(`http://localhost:4000/api/search/${searchKey}`,)
   }

   getProductDetails(productId: number) {
     return this.http.get(`http://localhost:4000/api/details/${productId}`);
   }

   getProductDetailsImages(productId: number) {
    return this.http.get<imageDetails>(`http://localhost:4000/api/detailsImages/${productId}`)
   }
}