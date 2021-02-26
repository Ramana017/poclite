import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
declare var $: any;
@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.sass']
})
export class ScheduleManagementComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }
  ngOnInit(): void {
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'site-map modal-dialog-centered' })
    );
  }

  icontoggle(i) {
    $('.icon-toggle').eq(i).parent().siblings("span").toggleClass('hide');
  }

  filtermenu() {
    $(".filter-menu").toggleClass("show");
  }

  dropdown() {
    $(".dashboard-nav-dropdown").toggleClass("show");
  }



}
