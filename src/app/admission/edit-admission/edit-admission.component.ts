import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MenuItem} from 'primeng/api';
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
  cities: City[];
  items: MenuItem[];

  selectedCities2: City[];
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Update', icon: 'pi pi-refresh'},
      {label: 'Delete', icon: 'pi pi-times'},
      {label: 'Angular.io', icon: 'pi pi-info'},
      {label: 'Setup', icon: 'pi pi-cog'}
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
  addDig(diglist:TemplateRef<any>){
    this.modalRef = this.modalService.show(diglist,Object.assign({},{ class: 'registration-modal-container modal-dialog-centered modal-dialog-scrollable'}))
  }
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',

  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }



}
