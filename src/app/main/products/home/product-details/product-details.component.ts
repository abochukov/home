import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../../../data.service';

import { imageDetails } from '../../../../common/interfaces/image';
import { cartItems } from '../../../../common/interfaces/cart-items';
// import { cartItems } from 'src/app/common/interfaces/cart-items';
 
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnChanges {

    public itemDetails: any;

    public productTitle: string;
    public productPrice: number;
    public productDescription: string;
    public headDetailImage: string;
    // public detailsImages: imageDetails;
    public detailsImages: any;
    public allGalleryImages: any;
    public stock: string;

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
      this.itemDetails = data;
      this.productTitle = this.itemDetails.name;
      this.productPrice = this.itemDetails.price;
      this.productDescription = this.itemDetails.description;
      this.stock = this.itemDetails.stock;
    })


    this.dataService.getProductDetailsImages(this.productId).subscribe(data => {
        this.detailsImages = data;
        this.headDetailImage = this.detailsImages.images[0].path;
        this.allGalleryImages = this.detailsImages.images.map(img => {
          return img.path
        })
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
