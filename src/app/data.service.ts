import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
     return this.http.get('http://localhost:4000/api/categories');
   }

   getSubCategories(id) {
    return this.http.get(`http://localhost:4000/api/categories/${id}`)
   }

   getProducts(subCategoryId) {
    return this.http.get(`http://localhost:4000/api/products/${subCategoryId}`);   
   }

   saveOrderForm(orderValues) {
    return this.http.post('http://localhost:4000/api/orders', orderValues).subscribe(data => {
    });
   }

   search(searchKey) {
    //  console.log(searchKey);
    return this.http.get(`http://localhost:4000/api/search/${searchKey}`,)
   }
}