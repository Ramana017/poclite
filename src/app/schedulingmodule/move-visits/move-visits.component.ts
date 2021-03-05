import { OnDestroy, TemplateRef } from '@angular/core';
import { Input, Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare var $: any;
@Component({
  selector: 'app-move-visits',
  templateUrl: './move-visits.component.html',
  styleUrls: ['./move-visits.component.sass']
})
export class MoveVisitsComponent implements OnInit {

  constructor(public modelService: BsModalService,public bsmodelRef: BsModalRef) { }
  public modalRef: BsModalRef;
  ngOnInit(): void {
  }
  dropdown() {
    $(".dashboard-nav-dropdown").toggleClass("show");
  }
  public opendcsOT(dcsOT:TemplateRef<any>){
    this.modalRef=this.modelService.show(dcsOT,
      Object.assign({}, { class: '  modalcontent-wrapper modal-dialog-centered edit-modal-content' })
      )
  }
}
