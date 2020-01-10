import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Categories, SubCategories, Products } from './common/interfaces/items';
import { imageDetails } from './common/interfaces/image';

// import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private username = 'asss';
  public result: any;

  constructor(private http: HttpClient) {
   }

   saveFormData(formData) {
     this.http.post('http://localhost:3000/users', formData).subscribe(data => {
     });
   }

   getAllCategories(): Observable<Categories> {
     return this.http.get<Categories>('http://profitstore.bg:8000/api/category');
   }

  //  getSubCategories(id: number): Observable<SubCategories> {
  //   return this.http.get<SubCategories>(`http://profitstore.bg:8000/api/category/${id}`)
  //  }

   getProduct(productId: number): Observable<Products> {
     return this.http.get<Products>(`http://profitstore.bg:8000/api/products/${productId}`);
   }

   getProducts(): Observable<Products> {
    return this.http.get<Products>(`http://profitstore.bg:8000/api/products`);   
   }

   saveOrderForm(value) {
    // console.log(value);
    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    let options = { headers: headers };
    // console.log(options)

    return this.http.post('http://profitstore.bg:8000/api/order', value, options).subscribe(data => {
      console.log(data)
    }, error => {
      console.log('Error', error.error.message)
    });
   }

   search(searchKey) {
    return this.http.get<Products>(`http://profitstore.bg:8000/api/search/${searchKey}`,)
   }

   getProductDetailsImages(productId: number) {
    return this.http.get<imageDetails>(`http://profitstore.bg:8000/api/products/${productId}`)
   }
}