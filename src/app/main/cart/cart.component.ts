import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { DataService } from '../../data.service';
import { HomeComponent } from '../products/home/home.component';

import { ToggleCategoriesService } from '../../common/services/toggle-categories.service';
import { ShowCartItemsService } from '../../common/services/show-cart-items.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';

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
  public showOrderFinish: boolean = false;
  public showCart: boolean = true;

  public orderForm: FormGroup;
  public orderFormCompany: FormGroup;

  public initialize = false;
  public showCitizenForm: boolean = true;
  public invoice: boolean = false;
  public errorMessage: string;

  @Input() cartProducts;

  constructor( 
    private fb: FormBuilder, 
    dataService: DataService, 
    private modalServices: BsModalService, 
    private toggleCategories: ToggleCategoriesService,
    private showCartItemsService: ShowCartItemsService,
    private cartRouter: Router,
    private rt: ActivatedRoute
  ) { 
    super(modalServices, toggleCategories, dataService, cartRouter, rt);
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
    
    if(localStorage.getItem('profitstore.bg') == null) {
      let cart: any = [];
      cart.push(JSON.stringify(item))
      localStorage.setItem('profitstore.bg', JSON.stringify(cart));
      this.addItemNotification(item.title);
      
    } else {
      let cart: any = JSON.parse(localStorage.getItem('profitstore.bg'));
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
        localStorage.setItem('profitstore.bg', JSON.stringify(cart));
        // this.addItemNotification();
        this.addItemNotification(item.title); 
      } else {
        this.alertItemNotification();
        let item = JSON.parse(cart[index]);
        // item.quantity += 1;
        cart[index] = JSON.stringify(item);
        // localStorage.setItem('profitstore.bg', JSON.stringify(cart));
      }
    }
    this.loadCart();
  }

  public loadCart() {
    this.totalPrice = 0;
    this.items = [];
    this.cartItems = JSON.parse(localStorage.getItem('profitstore.bg'));
    
    if(this.cartItems) {
      for(var i = 0; i < this.cartItems.length; i++) {
        let item = JSON.parse(this.cartItems[i]);
  
        this.items.push({
          id: item.id,
          title: item.title,
          price: item.price
        })
        this.totalPrice += Number(item.price);
      }
      this.showCartItemsService.setItems(this.items.length);
    }
  }

  public removeCartItems(id: number) {
    let cart = JSON.parse(localStorage.getItem('profitstore.bg'));
    let index: number = -1;

    for(var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      
      if(item.id == id) {
        cart.splice(i, 1);
        break;
      }
    }

    localStorage.setItem('profitstore.bg', JSON.stringify(cart));
    this.removeItemNotification();
    this.loadCart();
  }

  public showForm() {
    // this.showOrderForm = !this.showOrderForm;
    this.showCart = false;
    this.showOrderForm = true
  }

  public order() {
    this.orderForm = this.fb.group({
      firstname: ['', Validators.required],
      family: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      mail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      address: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required],
      rules: [false, Validators.requiredTrue],
      companyname: [''],
      contactperson: [''],
      companynumber: [''],
      vatnumber: ['']
    })
  }

  onSubmit() {
    if(this.orderForm.valid) {
      let allCartProducts = this.cartItems.map(products => {
        return JSON.parse(products).id
      })

      this.showOrderForm = false;
      this.showOrderFinish = true;
      // console.log(this.orderForm.value, allCartProducts)
      // this.orderForm.value.productsId = JSON.parse(this.cartItems).id;
      // this.dataService.saveOrderForm(this.orderForm.value);
    } else {
      if(this.orderForm.controls.firstname.invalid) {
        this.errorMessage = 'Моля попълнете име'
      } else if(this.orderForm.controls.family.invalid) {
        this.errorMessage = 'Mоля попълнете фамилия'
      } else if(this.orderForm.controls.phone.invalid) {
        this.errorMessage = 'Полето телефонен номер трявба да съдържа само цифри и валиден номер'
      } else if(this.orderForm.controls.mail.invalid) {
        this.errorMessage = 'Моля въведете валиден e-mail адрес'
      } else if(this.orderForm.controls.address.invalid) {
        this.errorMessage = 'Моля попълнете полето Адрес'
      } else if(this.orderForm.controls.region.invalid) {
        this.errorMessage = 'Моля изберете област'
      } else if(this.orderForm.controls.city.invalid) {
        this.errorMessage = 'Моля попълнете населено място'
      } else if(this.orderForm.controls.rules.invalid) {
        this.errorMessage = 'За да продължите трябва да сте съгласни с условията'
      }
    }
  }

  clearForm(form: FormGroup) {
    form.reset()
  }
}
