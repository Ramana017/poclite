import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrls: ['./allergies.component.sass']
})
export class AllergiesComponent implements OnInit {

  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {
  }
  allergylogdata(allergylog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(allergylog);
  }
}
