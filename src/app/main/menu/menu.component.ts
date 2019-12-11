import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { ToggleCategoriesService } from '../../common/services/toggle-categories.service';
import { DataService } from '../../data.service';
import { ShowCartItemsService } from '../../common/services/show-cart-items.service';

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

  modalRef: BsModalRef;
  public buttonCategoriesClicked: boolean = false;
  public buttonMenuClicked: boolean = false;
  public searchingString;
  public cartItems: any;

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
    private showCartItemsService: ShowCartItemsService,
    private cd: ChangeDetectorRef,
    ) { }

  ngOnInit() {
    this.showCartItems();
    this.toggleCategoriesService.getStatus().subscribe(status => {
      this.buttonCategoriesClicked = status.status; 
    });
  }

  ngAfterViewInit() {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  public showCartItems() {
    this.showCartItemsService.getItems().subscribe((data => {
      this.cartItems = data.countItems;
      this.cd.detectChanges();
    }));
  }

  public showCategoriesOnMobile() {
    this.buttonCategoriesClicked = !this.buttonCategoriesClicked;
    this.toggleCategoriesService.sendStatus(this.buttonCategoriesClicked);
    this.buttonMenuClicked = false;
  }

  public showMenuOnMobile() {
    this.buttonMenuClicked = !this.buttonMenuClicked;
    if(this.buttonMenuClicked) {
      this.toggleCategoriesService.sendStatus(false)
    }
  }

}
