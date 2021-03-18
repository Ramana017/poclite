import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-ps-edit',
  templateUrl: './ps-edit.component.html',
  styleUrls: ['./ps-edit.component.sass']
})
export class PsEditComponent implements OnInit {

  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }

  contactslogdata(contactlog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(contactlog);
  }
  addresslogdata(addresslog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addresslog);
  }







}
