import { Injectable } from '@angular/core';

import { addCartItemsFromDetails } from '../interfaces/items';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCartItemsFromDetailsService {

  private subject = new Subject<any>();

  public getItems(): Observable<any> {
    return this.subject.asObservable();
  }

  public setItems(items: addCartItemsFromDetails) {
    this.subject.next({items: items})
  }

  constructor() { }
}
