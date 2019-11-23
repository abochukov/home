import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  modalRef: BsModalRef;

  config = {
    animated: false,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "modal-lg",
  };

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
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
}
