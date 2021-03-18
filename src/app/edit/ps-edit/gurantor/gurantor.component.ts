import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-gurantor',
  templateUrl: './gurantor.component.html',
  styleUrls: ['./gurantor.component.sass']
})
export class GurantorComponent implements OnInit {

  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }
  guarantorlogdata(guarantorlog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(guarantorlog);
  }
}
