import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../../data.service';
import { ToggleCategoriesService } from '../../../common/services/toggle-categories.service';

import { Categories, SubCategories, Products } from '../../../common/interfaces/items';

import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: Categories[];
  public subCategories: SubCategories[];
  public products: Products[];
  public selectedElement: any;
  public selectedSubCategory: any;

  @Output() showProducts = new EventEmitter();

  constructor(private dataService: DataService, private router: Router, private toggleCategoriesService: ToggleCategoriesService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  public getAllCategories() {
    this.dataService.getAllCategories().subscribe(categories => {
      this.categories = Object.keys(categories).map(i => {
        return categories[i]
      }).filter(a => {
        return a.parent == 0
      });
    })
  }

  public showSubCategories(id: number) {
    this.subCategories = [];

      this.dataService.getAllCategories().subscribe(area => {
        this.subCategories = Object.keys(area).map(i => {
          return area[i];
        }).filter(subcategory => {
          if(subcategory.parent == id) {
            return subcategory;
          }
        })   
      })
    this.selectedElement = id;
  }

  public sendProducts(id: number) {
    this.dataService.getProducts().subscribe(products => {
      this.products = Object.keys(products).map(i => {
        return products[i];
      }).filter(product => {
        if(product.category_id == id) {
          return product;
        }
      })
      this.showProducts.emit(this.products);
      this.toggleCategoriesService.sendStatus(false);
    })
    this.selectedSubCategory = id;
    
    this.router.navigate([], {
      queryParams: {
        category: this.selectedElement,
        area: this.selectedSubCategory
      },
      queryParamsHandling: 'merge'
    })
  }
}