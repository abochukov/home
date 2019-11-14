import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-total-items',
  templateUrl: './cart-total-items.component.html',
  styleUrls: ['./cart-total-items.component.scss']
})
export class CartTotalItemsComponent implements OnInit, OnChanges {

  @Input() totalPrice: number;
  @Input() items: any;
  @Output() onRemove = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    
  }

  public removeCartItems(id: number) {
    this.onRemove.emit(id);
  }

}
