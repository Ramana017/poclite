import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {

  public modalRef: BsModalRef;
  public popupintialValue=true;
  constructor(public modalService: BsModalService) {
    console.log(this.popupintialValue)
  }

  ngOnInit(): void {
console.log(this.popupintialValue)
    console.log("contact ngonInit")
  }
  contactslogdata(contactlog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(contactlog);
  }
  public ngOnDestroy(){
    console.log('COntact destroy')
  }
}
