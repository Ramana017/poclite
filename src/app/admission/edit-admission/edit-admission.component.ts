import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MenuItem } from 'primeng/api';
import { GurantorComponent } from 'src/app/edit/ps-edit/gurantor/gurantor.component';
import { GuarantorDetailsComponent } from 'src/app/core/create_new_ps/guarantor-details/guarantor-details.component';
import { ContactsComponent } from 'src/app/edit/ps-edit/contacts/contacts.component';
import { AddDaignosisComponent } from '../popups/add-daignosis/add-daignosis.component';
import { PayorPlanDetailsComponent } from 'src/app/core/create_new_ps/payor-plan-details/payor-plan-details.component';
interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-edit-admission',
  templateUrl: './edit-admission.component.html',
  styleUrls: ['./edit-admission.component.sass']
})
export class EditAdmissionComponent implements OnInit {
  public priorHospitalization: boolean = false;
  public rank = [{ name: 1 }]
  public contacts: City[];
  items: MenuItem[];
  selectedCities2: City[];
  public modalRef: BsModalRef;
  constructor(public modalService: BsModalService) {
    this.contacts = [
      { name: 'BAILEY, RUTH', code: 'BR' },

    ];
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Update', icon: 'pi pi-refresh' },
      { label: 'Delete', icon: 'pi pi-times' },
      { label: 'Angular.io', icon: 'pi pi-info' },
      { label: 'Setup', icon: 'pi pi-cog' }
    ];
  }
  ppListdata(ppList: TemplateRef<any>) {
    this.modalRef = this.modalService.show(ppList);
  }
  ppHistorydata(ppHistory: TemplateRef<any>) {
    this.modalRef = this.modalService.show(ppHistory, Object.assign({}, { class: 'ppHistory modal-dialog-centered' }));
  }
  phyHistorydata(phyHistory: TemplateRef<any>) {
    this.modalRef = this.modalService.show(phyHistory, Object.assign({}, { class: 'ppHistory modal-dialog-centered' }))
  }
  digHistorydata(digHistory: TemplateRef<any>) {
    this.modalRef = this.modalService.show(digHistory, Object.assign({}, { class: ' modal-dialog-centered' }))
  }
  phyListdata(phyList: TemplateRef<any>) {
    this.modalRef = this.modalService.show(phyList, Object.assign({}, { class: 'ppHistory modal-dialog-centered' }))
  }
  editdigdata(editdig: TemplateRef<any>) {
    this.modalRef = this.modalService.show(editdig, Object.assign({}, { class: 'editdig-modal modal-dialog-centered' }))
  }
  addDig() {
    this.modalRef = this.modalService.show(AddDaignosisComponent, Object.assign({}, { class: '' }))
  }
  terminatePayor(terminate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(terminate, Object.assign({}, { class: 'modal-dialog-centered ' }))
  }
  changeRankdata(changeRank: TemplateRef<any>) {
    this.modalRef = this.modalService.show(changeRank, Object.assign({}, { class: 'modal-dialog-centered ' }))
  }
  replacePpdata(replacePp: TemplateRef<any>) {
    this.modalRef = this.modalService.show(replacePp, Object.assign({}, { class: 'modal-dialog-centered ' }))
  }
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',

  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  /**
   * newGurantor method is used to create new Guranotor
   */
  public newGurantor() {
    this.modalRef = this.modalService.show(GuarantorDetailsComponent, Object.assign({
      initialState: {
        intialPopUp: false,
      }
    }, { class: ' modal-dialog-centered' }))

  }
  public modelhedaerType='';
  public newContact(template:TemplateRef<any>,type) {
    this.modelhedaerType=type;
    this.modalRef = this.modalService.show(template, Object.assign({
      initialState: {
        popupintialValue: false,
      }
    }, { class: ' modal-dialog-centered create-contact-popup' }))
console.log(this.modalRef)
  }
  public Addpayor() {
    this.modalRef = this.modalService.show(PayorPlanDetailsComponent, Object.assign({
      initialState: {
        popupintialValue: false,
      }
    }, { class: ' modal-dialog-centered' }))
    console.log(this.modalRef)
  }




}
