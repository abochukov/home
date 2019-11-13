import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowCartItemsService {

  private countCartItems = new Subject<any>();

  constructor() { }

  getItems(): Observable<any> {
    return this.countCartItems.asObservable();
  }

  setItems(countItems: number) {
    this.countCartItems.next({ countItems: countItems });
  }
}
