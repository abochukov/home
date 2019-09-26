import { Component, OnInit, TemplateRef } from '@angular/core';

import { ToggleCategoriesService } from '../toggle-categories.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  modalRef: BsModalRef;
  public buttonClicked: boolean = false;

  config = {
    animated: false,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "modal-lg",
  };

  constructor(private modalService: BsModalService, private toggleCategoriesService: ToggleCategoriesService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  public showCategoriesOnMobile() {
    this.buttonClicked = !this.buttonClicked;
    this.toggleCategoriesService.sendStatus(this.buttonClicked);
  }
}
