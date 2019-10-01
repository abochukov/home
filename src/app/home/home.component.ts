import { Component, OnInit, TemplateRef, HostListener } from '@angular/core';

import { ToggleCategoriesService } from '../toggle-categories.service';
import { DataService } from '../data.service';
import { imageDetails } from '../image';

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
  public productDescription;
  public headDetailImage;
  public detailsImages;

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

  openModal(template: TemplateRef<any>, productId: number) {
    this.modalRef = this.modalService.show(template, this.config);

    this.dataService.getProductDetails(productId).subscribe(data => {
      this.productDescription = data[0].description;
    });

    this.dataService.getProductDetailsImages(productId).subscribe(data => {
      this.detailsImages = data;
      this.headDetailImage = data[0].images;
    })

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


      console.log(current)
    }, 500)
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

    // public gallery() {
    //   const current = document.querySelector('#selected');
    //   const thumbs = document.querySelector('.thumbs img');
    //   const opacity = 0.5;

    //   thumbs[0].style.opacity = opacity;

    //   thumbs.forEach(img => img.addEventListener('click', imgActivate));
    //   for(let i = 0; i < thumbs.length; i++) {}

    //   function(imgActivate(e)) {
    //     thumbs.forEach(img => (img.style.opacity = 1));

    //     current.src = e.target.src;

    //     current.classList.add('fade-in');

    //     setTimeout(() => current.classList.remove('fade-in'), 500);

    //     e.target.style.opacity = opacity;
    //   }
    // }
}