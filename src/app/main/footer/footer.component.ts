import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ShowCartItemsService } from '../../common/services/show-cart-items.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public cartItems: any;
  modalRef: BsModalRef;
  public terms: any;

  config = {
    animated: false,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "modal-lg",
  };

  constructor(
    private modalService: BsModalService, 
    private showCartItemsService: ShowCartItemsService,
    private cd: ChangeDetectorRef,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getTerms().subscribe(data => {
      this.terms = data[0].content;
    });
  }

  public showConditions(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config)
  }

  public closeModal() {
    this.modalRef.hide();
  }

  public showDelivery(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  public showCartItems() {
    this.showCartItemsService.getItems().subscribe((data => {
      this.cartItems = data.countItems;
      this.cd.detectChanges();
    }));
  }
}
