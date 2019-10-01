import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { DataService } from '../data.service';
import { HomeComponent } from '../home/home.component';

import { ToggleCategoriesService } from '../toggle-categories.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


// import { getDate, getMonth, getFullYear } from 'ngx-bootstrap/chronos/utils/date-getters';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends HomeComponent implements OnInit, OnChanges {

  public cartItems: any;
  public items: any;
  public totalPrice: number;
  public showOrderForm: boolean = false;

  public orderForm: FormGroup;

  public initialize = false;

  @Input() cartProducts;

  constructor( private fb: FormBuilder, dataService: DataService, private modalServices: BsModalService, private toggleCategories: ToggleCategoriesService ) { 
    super(modalServices, toggleCategories, dataService);
  }

  ngOnInit() {
    this.loadCart();
    this.order();
    this.initialize = true;
  }

  ngOnChanges() {
    if(this.initialize) {
      this.addCartItems();

    }
  }

  public addCartItems() { 
    let item = { id: this.cartProducts.id, title: this.cartProducts.title, price: this.cartProducts.price };
    
    if(localStorage.getItem('cart') == null) {
      let cart: any = [];
      cart.push(JSON.stringify(item))
      localStorage.setItem('cart', JSON.stringify(cart));
      
    } else {
      let cart: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;

      for(let i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i])

        if(item.id == this.cartProducts.id) {
          index = i;
          break;
        }
      }

      if(index == -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
        this.addItemNotification();
        // this.addItemNotification(item.title); 
      } else {
        let item = JSON.parse(cart[index]);
        // item.quantity += 1;
        cart[index] = JSON.stringify(item);
        // localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
    this.loadCart();
  }

  public loadCart() {
    this.totalPrice = 0;
    this.items = [];
    this.cartItems = JSON.parse(localStorage.getItem('cart'));
    
    if(this.cartItems) {
      for(var i = 0; i < this.cartItems.length; i++) {
        let item = JSON.parse(this.cartItems[i]);
  
        this.items.push({
          id: item.id,
          title: item.title,
          price: item.price
        })
        // console.log(item.price)
        this.totalPrice += Number(item.price);
      }
    }
  }

  public removeCartItems(id: number) {
    console.log(id);
    let cart = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;

    for(var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      
      if(item.id == id) {
        cart.splice(i, 1);
        break;
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.removeItemNotification();
    this.loadCart();
  }

  public showForm() {
    this.showOrderForm = !this.showOrderForm;
  }

  public order() {
    this.orderForm = this.fb.group({
      firstname: ['', Validators.required],
      family: ['', Validators.required],
      phone: ['', Validators.required],
      mail: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  onSubmit() {
    let orderDate = new Date();
    
    for(let i = 0; i < this.cartItems.length; i++) {
      let item = JSON.parse(this.cartItems[i]);
      this.orderForm.value.productsId = JSON.parse(this.cartItems[i]).id
      this.orderForm.value.date = new Date();
      this.dataService.saveOrderForm(this.orderForm.value);
      console.log(this.orderForm.value);
    }

    // console.log(this.orderForm.controls.firstname.status)
    // this.dataService.saveOrderForm(this.orderForm.value);
    
    
  }

}