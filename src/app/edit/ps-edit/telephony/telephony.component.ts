import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-telephony',
  templateUrl: './telephony.component.html',
  styleUrls: ['./telephony.component.sass']
})
export class TelephonyComponent implements OnInit {

  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {
  }
  telephonylogdata(telephonylog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(telephonylog);
  }
}
