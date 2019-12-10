import { Component, OnInit, OnChanges, AfterViewInit, TemplateRef, HostListener, Input, ViewChild, ElementRef } from '@angular/core';

import { ToggleCategoriesService } from '../../common/services/toggle-categories.service';
import { DataService } from '../../data.service';

import { Products, Categories } from '../../common/interfaces/items';
 
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home.mobile.scss']
})
export class HomeComponent implements OnInit, OnChanges, AfterViewInit {

  public products: any;
  public cartProducts: any = {};
  public itemName: string;

  modalRef: BsModalRef;

  subscription: Subscription;
  public categoryStatus: boolean = false;
  public mobileResolution: boolean = false;
  public screenWidth: number;

  public productId: number;
  public currentUrl: any;

  public headImage: any;

  @Input() getSearchedResults: Event;
  @ViewChild('productDetails', {static: false}) productDetails: ElementRef;

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
    private router: Router,
    
  ) { }

  ngOnInit() {
    this.onResize(event);
    this.subscription = this.toggleCategoriesService.getStatus().subscribe(status => {
      this.categoryStatus = status.status;
    });   
    this.openProductsByDefault();
  }
  
  ngOnChanges() {
    this.search();
  }
  
  ngAfterViewInit() {
    
    if(window.location.href.includes('product')) {
      if(this.productDetails) {
          let productId = Number(window.location.href.split('&')[2].split('=')[1])
          this.initialModal(this.productDetails, productId);
      }
    } else {
      // console.log('dont open modal')
    }
  }

  public openProductsByDefault() {
    let category = 1;
    let area = 7;

    this.router.navigate([], {
      queryParams: {
        category: category,
        area: area
      },
      queryParamsHandling: 'merge'
    })

    this.dataService.getProducts().subscribe(products => {
      this.products = Object.keys(products).map(i => {
        return products[i];
      }).filter(product => {
        if(product.category_id == 7) {
          return product;
        }
      })
    })
  }

  public showAllProducts(data: Products[]) {
    this.products = data;
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

  public openModal(template: TemplateRef<any>, productId: number) {
    this.productId = productId;
    this.modalRef = this.modalService.show(template, this.config);

    this.router.navigate([], {
      queryParams: {
        product: productId
      },
      queryParamsHandling: 'merge'
    })
  }

  public initialModal(productDetails, productId: number) {
    let category = window.location.href.split('?')[1].split('&')[0].split('=')[1];
    let subCategory = window.location.href.split('&')[1].split('=')[1];
    // console.log(window.location.href.split('&')[1].split('=')[1])
    this.productId = productId;
    this.modalRef = this.modalService.show(productDetails, this.config);

    this.router.navigate([], {
      queryParams: {
          category: category,
          area: subCategory,
          product: productId
      },
      queryParamsHandling: 'merge'
    })
  }

  closeModal() {
    let category = window.location.href.split('?')[1].split('&')[0].split('=')[1];
    let subCategory = window.location.href.split('&')[1].split('=')[1];

    this.modalRef.hide();

    this.router.navigate([], {
      queryParams: {
        cat: 1,
        subCat: 1,
        product: null
      },
      queryParamsHandling: 'merge'
    })

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
