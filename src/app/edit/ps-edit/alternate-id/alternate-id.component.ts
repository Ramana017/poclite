import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alternate-id',
  templateUrl: './alternate-id.component.html',
  styleUrls: ['./alternate-id.component.sass']
})
export class AlternateIdComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {
  }
  alternateidlogdata(alternateidlog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(alternateidlog);
  }
}
