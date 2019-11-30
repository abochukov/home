import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../../data.service';

import { imageDetails } from '../../../common/interfaces/image';
import { cartItems } from '../../../common/interfaces/cart-items';
// import { cartItems } from 'src/app/common/interfaces/cart-items';
 
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnChanges {

    public productTitle: string;
    public productPrice: number;
    public productDescription: string;
    public headDetailImage: string;
    public detailsImages: imageDetails;

  @Input() productId: any;
  @Output() onClose = new EventEmitter();
  @Output() onAdd = new EventEmitter<cartItems>();

  constructor( private dataService: DataService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.productDetails();
  }

  public productDetails() {
    this.dataService.getProduct(this.productId).subscribe(data => {
      this.productTitle = data[0].productTitle;
      this.productPrice = data[0].productPrice;
    })

    this.dataService.getProductDetails(this.productId).subscribe(data => {
      this.productDescription = data[0].description;  
      // TO DO: check if data is empty
    });

    this.dataService.getProductDetailsImages(this.productId).subscribe(data => {
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

  public closeModal() {
    this.onClose.emit();
  }

  addProduct(id: number, title: string, price: number) {
    this.onAdd.emit({id: id, title: title, price: price});
  }

}
