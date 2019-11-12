import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-cart-total-items',
  templateUrl: './cart-total-items.component.html',
  styleUrls: ['./cart-total-items.component.scss']
})
export class CartTotalItemsComponent implements OnInit, OnChanges {

  @Input() totalPrice: number;
  @Input() items: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.items);
  }

}
