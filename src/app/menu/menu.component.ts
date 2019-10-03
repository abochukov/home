import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';

import { ToggleCategoriesService } from '../toggle-categories.service';
import { DataService } from '../data.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;
  modalRef: BsModalRef;
  public buttonClicked: boolean = false;
  public searchingString;
  public searchResults;

  config = {
    animated: false,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "modal-lg",
  };

  constructor(
    private modalService: BsModalService, 
    private toggleCategoriesService: ToggleCategoriesService,
    private dataService: DataService,
    ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.search()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  public showCategoriesOnMobile() {
    this.buttonClicked = !this.buttonClicked;
    this.toggleCategoriesService.sendStatus(this.buttonClicked);
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
