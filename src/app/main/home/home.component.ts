import { Component, OnInit, OnChanges, TemplateRef, HostListener, Input } from '@angular/core';

import { ToggleCategoriesService } from '../../common/services/toggle-categories.service';
import { DataService } from '../../data.service';

import { Products, Categories } from '../../common/interfaces/items';
 
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home.mobile.scss']
})
export class HomeComponent implements OnInit, OnChanges {

  public products: Products;
  public cartProducts: any = {};
  public itemName: string;

  modalRef: BsModalRef;

  subscription: Subscription;
  public categoryStatus: boolean = false;
  public mobileResolution: boolean = false;
  public screenWidth: number;

  public productId: number;

  @Input() getSearchedResults: Event;

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
    protected dataService: DataService,
  ) { }

  ngOnInit() {
    this.onResize(event);
    this.subscription = this.toggleCategoriesService.getStatus().subscribe(status => {
      this.categoryStatus = status.status;
    });   
  }

  ngOnChanges() {
    this.search();
  }

  public showAllProducts(data: Products) {
    this.products = data;
    this.categoryStatus=false
  }

  public saveToLocalStorage(id: number, title: string, price: string) {
    this.cartProducts = { id: id, title: title, price: price }
  }

  public addFromProductDetails(productDetails: { id: number, title: string, price:number }) {
    this.cartProducts = {id: productDetails.id, title: productDetails.title, price: productDetails.price }
  }

  public addItemNotification(productTitle: string) {
    let message = document.getElementById('add-item');
    message.textContent += " " + productTitle;

    message.classList.add('toggleMessage');
    setTimeout(() => {
      message.classList.remove('toggleMessage');
    }, 3000);

    setTimeout(() => {
      message.textContent = message.textContent.split(" ").slice(0,2).join(" ");
    }, 3100);
  } 

  public removeItemNotification() {
    let message = document.getElementById('remove-item');

    message.classList.add('toggleMessage');
    setTimeout(() => {
      message.classList.remove('toggleMessage');
    }, 3000)
  }

  public alertItemNotification() {
    let message = document.getElementById('already-add-item');

    message.classList.add('toggleMessage');
    setTimeout(() => {
      message.classList.remove('toggleMessage');
    }, 3000)
  }

  openModal(template: TemplateRef<any>, productId: number) {
    this.productId = productId;
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal() {
    this.modalRef.hide()
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

    public search() {
      if(this.getSearchedResults) {
        this.dataService.search(this.getSearchedResults).subscribe(data => {
          this.products = data;
        });
      }
    }
}
