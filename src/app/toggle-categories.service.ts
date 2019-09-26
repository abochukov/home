import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleCategoriesService {

  private buttonStatus = new Subject<any>();

  constructor() { }

  getStatus(): Observable<any> {
    return this.buttonStatus.asObservable();
  }

  sendStatus(status: boolean) {
    this.buttonStatus.next({ status: status });
    console.log(status)
  }
}
