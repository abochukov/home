import { Component, OnInit, OnChanges, TemplateRef, HostListener, Input } from '@angular/core';

import { ToggleCategoriesService } from '../../common/services/toggle-categories.service';
import { DataService } from '../../data.service';

import { Products, Categories } from '../../common/interfaces/items';
import { imageDetails } from '../../common/interfaces/image';
 
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

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
  public productDescription: string;
  public headDetailImage: string;
  public detailsImages: imageDetails;

  // public searchResults;

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

  openModal(template: TemplateRef<any>, productId: number) {
    this.modalRef = this.modalService.show(template, this.config);

    this.dataService.getProductDetails(productId).subscribe(data => {
      this.productDescription = data[0].description;
    });

    this.dataService.getProductDetailsImages(productId).subscribe(data => {
      this.detailsImages = data;
      this.headDetailImage = data[0].images;
    })

    this.gallery();
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

    public gallery() {
      setTimeout(() => {
        const current = document.querySelector('#selected');
        const thumbs = document.querySelectorAll('.thumbs img');
        const opacity = '0.5';
  
        (thumbs[0] as HTMLElement).style.opacity = opacity;
  
        
        thumbs.forEach(img => img.addEventListener('click', imgActivate));
  
        function imgActivate(e) {
          thumbs.forEach(img => ((img as HTMLElement).style.opacity = '1'));
  
          (current as HTMLImageElement).src = e.target.src;
  
          current.classList.add('fade-in');
  
          setTimeout(() => current.classList.remove('fade-in'), 500);
  
          e.target.style.opacity = opacity;
        }
      }, 500)
    }

    public search() {
      if(this.getSearchedResults) {
        this.dataService.search(this.getSearchedResults).subscribe(data => {
          this.products = data;
        });
      }
    }
}
