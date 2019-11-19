import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Router } from '@angular/router'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

  modalRef: BsModalRef;

  @ViewChild('template', {static: false}) templateRef: TemplateRef<any>;
  

  constructor(private modalService: BsModalService, private route: Router) { }

  ngOnInit() {
    console.log('this should be a modal');
  }

  ngAfterViewInit() { 
    this.modalRef = this.modalService.show(this.templateRef);
    
  }

  closeModal() {
    this.modalRef.hide();
    this.route.navigate(['/home']);
    console.log('this should close modal')
  }

}
