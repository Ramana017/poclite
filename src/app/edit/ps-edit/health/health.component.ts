import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.sass']
})
export class HealthComponent implements OnInit {

  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {
  }
  healthlogdata(healthlog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(healthlog);
  }
}
