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
     return this.http.get<Categories>('https://api.profitstore.bg/api/category');
   }

  //  getSubCategories(id: number): Observable<SubCategories> {
  //   return this.http.get<SubCategories>(`http://profitstore.bg:8000/api/category/${id}`)
  //  }

   getProduct(productId: number): Observable<Products> {
     return this.http.get<Products>(`https://api.profitstore.bg/api/products/${productId}`);
   }

   getProducts(): Observable<Products> {
    return this.http.get<Products>(`https://api.profitstore.bg/api/products`);   
   }

   saveOrderForm(value) {
    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    let options = { headers: headers };
    

    return this.http.post('https://api.profitstore.bg/api/order', value, options);

    // .subscribe(data => {
    //   console.log(data)
    // }, error => {
    //   window.alert(`Съжаляваме, но възникна грешка ${error.status}. Ваша поръчка не беше приета, моля свържете се с нас по телефона или опитайте отново`);
    //   // console.log('Error', error)
    // });
   }

   search(searchKey) {
    return this.http.get<Products>(`https://api.profitstore.bg/api/search/${searchKey}`,)
   }

   getProductDetailsImages(productId: number) {
    return this.http.get<imageDetails>(`https://api.profitstore.bg/api/products/${productId}`)
   }

   sendMail(value) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    let options = { headers: headers };

    return this.http.post('https://api.profitstore.bg/api/contact', value, options);
   }

   getTerms() {
     return this.http.get('https://api.profitstore.bg/api/terms/general/1');
   }
}