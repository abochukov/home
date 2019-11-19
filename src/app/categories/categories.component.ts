import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Categories, SubCategories, Products } from '../common/interfaces/items';


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

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getAllCategories();
    this.openProductsByDefault();
  }

  public openProductsByDefault() {
    this.selectedElement = 1;
    this.selectedSubCategory = 1;
    this.router.navigate([], {
      queryParams: {
        cat: this.selectedElement,
        subCat: this.selectedSubCategory
      },
      queryParamsHandling: 'merge'
    })

    this.dataService.getProducts(1).subscribe(products => {
      this.products = products;
      this.showProducts.emit(this.products);
    })
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
    console.log(this.selectedElement)
    console.log(this.selectedSubCategory);

    this.router.navigate([], {
      queryParams: {
        cat: this.selectedElement,
        subCat: this.selectedSubCategory
      },
      queryParamsHandling: 'merge'
    })
  }

}
