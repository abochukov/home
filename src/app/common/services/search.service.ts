import { Injectable } from '@angular/core';
// import { URLSearchParmas, Jsonp } from '@angular/common/';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public baseUrl: string = 'http://localhost:3000/users';
  public queryUrl: string = '?name=';

  constructor(private http: HttpClient) { }

  search(names: Observable<string>) {
    return names.debounceTime(400).distinctUntilChanged().switchMap(name => this.searchEntries(name));
  }

  searchEntries(names: any) {
    return this.http.get(this.baseUrl + this.queryUrl + names);
  }
}
