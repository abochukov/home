import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Categories, SubCategories, Products } from '../items';

import { DataService } from '../data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: Categories;
  public subCategories: SubCategories;
  public products: Products;
  public selectedElement: any;
  public selectedSubCategory: any;

  @Output() showProducts = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  public getAllCategories() {
    this.dataService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  public showSubCategories(id: number) {
    this.dataService.getSubCategories(id).subscribe(subCategories => {
      this.subCategories = subCategories;
    })
    this.selectedElement = id;
  }

  public sendProducts(id: number) {
    this.dataService.getProducts(id).subscribe(products => {
      this.products = products;
      this.showProducts.emit(this.products);
    })
    this.selectedSubCategory = id;
  }

}
