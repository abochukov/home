import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-brief',
  templateUrl: './product-brief.component.html',
  styleUrls: ['./product-brief.component.scss']
})
export class ProductBriefComponent implements OnInit {

  @Input() productId: number

  constructor() { }

  ngOnInit() {
    console.log(this.productId)
  }



}
