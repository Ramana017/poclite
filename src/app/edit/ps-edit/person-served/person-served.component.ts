import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-person-served',
  templateUrl: './person-served.component.html',
  styleUrls: ['./person-served.component.sass']
})
export class PersonServedComponent implements OnInit {

  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }
  pslogdata(pslog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(pslog);
  }

}
