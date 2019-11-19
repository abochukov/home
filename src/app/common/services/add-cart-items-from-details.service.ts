import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCartItemsFromDetailsService {

  private subject = new Subject<any>();

  public getItems(): Observable<any> {
    return this.subject.asObservable();
  }

  public setItems(message: string) {
    this.subject.next({text: message})
  }

  constructor() { }
}
