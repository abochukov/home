import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { DataService } from '../data.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;
  public searchingString;
  public searchResults;

  constructor( private dataService: DataService ) { }

  ngOnInit() {
 
  }

  ngAfterViewInit() {
    this.search();
  }


  search() {
    this.searchingString = Observable.fromEvent(this.searchInput.nativeElement, 'keyup').debounceTime(400).subscribe((value) => {
      console.log(this.searchInput.nativeElement.value)
      this.dataService.search(this.searchInput.nativeElement.value).subscribe(data => {
        this.searchResults = data;
        console.log(this.searchResults);
      });
    });
  }
}
