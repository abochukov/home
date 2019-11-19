import { Component, OnInit, OnChanges, Input, Output, EventEmitter, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router'

import { DataService } from '../../../data.service';

import { imageDetails } from '../../../common/interfaces/image';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnChanges, AfterViewInit {
    
    public urlProductId: any;
    public productTitle: string;
    public productPrice: number;
    public productDescription: string;
    public headDetailImage: string;
    public detailsImages: imageDetails;

    modalRef: BsModalRef;

    @Output() onAdd = new EventEmitter<{id: number, title: string, price: number}>();

    @ViewChild('template', {static: false}) templateRef: TemplateRef<any>;

  constructor( private dataService: DataService, private modalService: BsModalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.urlProductId = this.route.snapshot.params.id;
  }

  ngOnChanges() {
  }

  ngAfterViewInit() { 
    this.modalRef = this.modalService.show(this.templateRef, {class: 'modal-lg'});
    this.productDetails();
  }

  closeModal() {
    this.modalRef.hide();
    this.router.navigate(['/home']);
  }

  public productDetails() {
    this.dataService.getProduct(this.urlProductId).subscribe(data => {
      this.productTitle = data[0].productTitle;
      this.productPrice = data[0].productPrice;
    })

    this.dataService.getProductDetails(this.urlProductId).subscribe(data => {
      this.productDescription = data[0].description;  
      // TO DO: check if data is empty
    });

    this.dataService.getProductDetailsImages(this.urlProductId).subscribe(data => {
      this.detailsImages = data;
      this.headDetailImage = data[0].images;
    })

    this.gallery();
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

  addProduct(id: number, title: string, price: number) {
    this.onAdd.emit({id: id, title: title, price: price});
  }

}
