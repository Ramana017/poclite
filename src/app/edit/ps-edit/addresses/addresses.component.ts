import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.sass']
})
export class AddressesComponent implements OnInit {

  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {
    console.log("addresses ngonInit")

  }
  addresslogdata(addresslog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addresslog);
  }

}
