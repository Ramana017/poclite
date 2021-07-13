import { Component, TemplateRef ,OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-open-scheduled-hrs',
  templateUrl: './open-scheduled-hrs.component.html',
  styleUrls: ['./open-scheduled-hrs.component.sass']
})
export class OpenScheduledHrsComponent implements OnInit {
check:boolean=true;
check1:boolean=true;
modalRef: BsModalRef;
constructor(private modalService: BsModalService) {}
  ngOnInit(): void {
  }
 
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ class: 'modal-sm map-tt' });
  }
}
