import { Component, OnInit, OnChanges, AfterViewInit, TemplateRef, HostListener, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { ToggleCategoriesService } from '../../../common/services/toggle-categories.service';
import { DataService } from '../../../data.service';

import { Products, Categories } from '../../../common/interfaces/items';
 
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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

  public productBriefImage;
  public hideTooltip: boolean;
  public brandsFilter: any;
  public visibleItems: any;
  public itemsPerPage: number = 6;
  public currnetPage: number = 1;
  public totalItems: number;
  public noSearchResults: boolean = false;

  @ViewChild('productDetails', {static: false}) productDetails: ElementRef;
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;
  @ViewChild('wrapper', {static: false}) wrapper: ElementRef;

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
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.onResize(event);
    this.subscription = this.toggleCategoriesService.getStatus().subscribe(status => {
      this.categoryStatus = status.status;
    });   
    this.openProductsByDefault();
  }
  
  ngOnChanges() {
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

    this.searchByType();
  }

  public searchByType() {
    let searchBox = document.querySelector('.search');

    if(searchBox) {
      searchBox.addEventListener('input', (e) => {
        setTimeout(() => {
        let target = e.target as HTMLInputElement;
        let searchString = target.value;
        this.dataService.search(searchString).subscribe(data => {
            if(data == null) {
              this.noSearchResults = true;
            } else {
              this.products = data;
            }
            this.updatePagination();
          });
        }, 400)
      });
    }
  }


  public setVisibleItems(start: number = (this.currnetPage-1) * this.itemsPerPage, end: number = start + this.itemsPerPage) {
    this.visibleItems = this.products.slice(start, end);
  }

  public pageChanged(page) {
    this.currnetPage = page.page;
    this.updatePagination();

    this.wrapper.nativeElement.scrollTop = 0;
  }


  public selectItemsPerPage(option) {
    this.itemsPerPage = Number(option.target.value);
    this.setVisibleItems();
  }

  public showAllProducts(data: Products[]) {
    this.products = data;
    this.updatePagination();
    
    let brands = data;
    this.brandsFilter = [...new Set(brands.map(item => item.manifacture))];
  }

  public openProductsByDefault() {

    let category: any;
    let area: any;

    if(window.location.href == 'http://localhost:4200/home') {
    // if(window.location.href == 'https://profitstore.bg/home') {
      category = 1;
      area = 7;
    } else {
      category = window.location.href.split('?')[1].split('&')[0].split('=')[1];
      area = window.location.href.split('&')[1].split('=')[1];
    }

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
        if(product.category_id == area) {
          return product;
        }
      })

      this.brandsFilter = [...new Set(this.products.map(item => item.manifacture))];   

      this.totalItems = this.products.length;
      this.setVisibleItems();
    });
  }

  public getBrandFilterResult(brand) {
    let area = window.location.href.split('&')[1].split('=')[1];   

    this.dataService.getProducts().subscribe(products => {
      this.products = Object.keys(products).map(i => {
        return products[i];
      }).filter(product => {
        if(product.manifacture == brand.target.value && product.category_id == area) {
          return product;
        }
      })
      this.updatePagination();
    }) 

  }

  public saveToLocalStorage(id: number, title: string, price: string) {
    this.cartProducts = { id: id, title: title, price: price }
  }

  public addFromProductDetails(productDetails: { id: number, title: string, price:number }) {
    this.cartProducts = {id: productDetails.id, title: productDetails.title, price: productDetails.price }
  }

  test() {
    let category = window.location.href.split('?')[1].split('&')[0].split('=')[1];
    let area = window.location.href.split('&')[1].split('=')[1];

    this.dataService.getProducts().subscribe(products => {
      this.products = Object.keys(products).map(i => {
        return products[i];
      }).filter(product => {
        if(product.category_id == area) {
          return product;
        }
      });
      
      this.updatePagination();
    })
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
    let area = window.location.href.split('&')[1].split('=')[1];

    this.router.navigate(['.'], 
      { 
        relativeTo: this.route, 
        queryParams: { 
          category: category, 
          area: area, 
          product: null 
        },
        queryParamsHandling: 'merge' 
      }
    );

    this.modalRef.hide();
  }

  public updatePagination() {
    this.totalItems = this.products.length;
    this.setVisibleItems();
    this.cd.detectChanges();
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

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.screenWidth = window.innerWidth;
      if(this.screenWidth < 992) {
        this.mobileResolution = true;
        this.hideTooltip = true;
      } else {
        this.mobileResolution = false;
      }
    }

  public closeNoSearchResultsContainer() {
    this.noSearchResults = false;
  }
}
