import { Component, OnInit, TemplateRef, HostListener } from '@angular/core';

import { ToggleCategoriesService } from '../toggle-categories.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: any;
  public cartProducts: any = {};
  public itemName: string;

  modalRef: BsModalRef;

  subscription: Subscription;
  public categoryStatus: boolean = false;
  public mobileResolution: boolean = false;
  public screenWidth;

  config = {
    animated: false,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "modal-lg",
  };

  constructor( private modalService: BsModalService, private toggleCategoriesService: ToggleCategoriesService ) { }

  ngOnInit() {
    this.onResize(event);
    this.subscription = this.toggleCategoriesService.getStatus().subscribe(status => {
      this.categoryStatus = status.status;
      
    });
  }

  public showAllProducts(data: any) {
    this.products = data;
  }

  public saveToLocalStorage(id: number, title: string, price: string) {
    this.cartProducts = { id: id, title: title, price: price }
  }

  public addItemNotification() {
    let message = document.getElementById('add-item');
    
    message.classList.add('toggleMessage');
    setTimeout(() => {
      message.classList.remove('toggleMessage');
    }, 3000);
  }

  public removeItemNotification() {
    let message = document.getElementById('remove-item');

    message.classList.add('toggleMessage');
    setTimeout(() => {
      message.classList.remove('toggleMessage');
    }, 3000)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.screenWidth = window.innerWidth;
      if(this.screenWidth < 992) {
        this.mobileResolution = true;
      } else {
        this.mobileResolution = false;
      }
    }


}
