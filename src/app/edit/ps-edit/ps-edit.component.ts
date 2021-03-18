import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-ps-edit',
  templateUrl: './ps-edit.component.html',
  styleUrls: ['./ps-edit.component.sass']
})
export class PsEditComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }
  pslogdata(pslog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(pslog);
  }
  guarantorlogdata(guarantorlog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(guarantorlog);
  }
  contactslogdata(contactlog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(contactlog);
  }
  addresslogdata(addresslog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addresslog);
  }
  healthlogdata(healthlog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(healthlog);
  }
  medicationlogdata(medicationlog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(medicationlog);
  }
  allergylogdata(allergylog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(allergylog);
  }
  languageslogdata(languagelog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(languagelog);
  }
  detailslogdata(detailslog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(detailslog);
  }
  hospitalslogdata(hospitalslog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(hospitalslog);
  }
  telephonylogdata(telephonylog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(telephonylog);
  }
  commentslogdata(commentslog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(commentslog);
  }
  alternateidlogdata(alternateidlog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(alternateidlog);
  }
}
