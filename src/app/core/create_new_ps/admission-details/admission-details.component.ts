import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ZipcodeService } from 'src/app/services/zipcode.service';

@Component({
  selector: "app-admission-details",
  templateUrl: "./admission-details.component.html",
  styleUrls: ["./admission-details.component.scss"],
})
export class AdmissionDetailsComponent implements OnInit {
  public bsModelRef: BsModalRef;
  public Keyword = 'userName'
  public coordinatorList = [];
  public listingPageData = [];
  field1;
  I;
  id = 'id';
  name = 'name';
  public clientType;
  public clientClass;
  public guarantorName;
  public diagnosisList;
  public PSName;
  public selectedItems = [];
  public pageArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  public lowerBound: number = 1;
  public upperBound: number;
  public perPage: number = 20;
  public maxCount: number = 100;
  code = 'code'
  name1: any;
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  rows: any;
  ds: any;
  numbers = [];
  constructor(public service: ZipcodeService, public modalService: BsModalService) {
    for (let i = 1; i <= 100; i++) {
      this.numbers.push(i);
    }
  }
  ngOnInit() {
    this.upperBound = this.perPage;
    this.newAttribute = { rank: null, name: '', code: '' };
    // this.fieldArray.push(this.newAttribute)
    this.upperBound = this.perPage;
    this.getAdmissionLookups();
    this.getDiagnosisData();
  }

  public getAdmissionLookups(): void {
    let params = { "userId": 47, "psId": 1201, "guarantorId": 1190 };
    this.service.getAdmissionLookups(JSON.stringify(params)).subscribe(
      data => {
        console.log(data)
        let data1: any = data;
        this.coordinatorList = data1.coordinatorList;
        this.clientType = data.clientType;
        this.clientClass = data.clientClass;
        this.PSName = data.PSName;
        this.guarantorName = data.guarantorName;

      })
  }
  public pagenext(): void {
    if (this.upperBound < this.maxCount) {
      this.lowerBound = this.lowerBound + this.perPage;
      this.upperBound = this.upperBound + this.perPage;
      console.log("************", this.upperBound, this.lowerBound)
      this.listingPageData.length = 0;
      this.getDiagnosisData();
    }
    else {
      this.upperBound = this.maxCount;
      this.lowerBound = this.maxCount - this.perPage;
      // this.listingData();
    }
  }
  //method to change previous page
  public prevpage(): void {
    if (this.lowerBound !== 1) {

      this.lowerBound = this.lowerBound - this.perPage;
      this.upperBound = this.upperBound - this.perPage;
      if (this.lowerBound <= 1) {
        this.lowerBound = 1;
        this.upperBound = this.perPage;
        this.diagnosisList.length = 0;
        this.getDiagnosisData();
      } else {
        this.getDiagnosisData();
      }
    }
  }

  public pagereset(): void {
    console.log(this.perPage);
    this.diagnosisList.length = 0;
    this.lowerBound = 1;
    this.upperBound = this.perPage;
    this.getDiagnosisData();

  }

  public getDiagnosisData(): void {
    let params = { "userId": 47, "code": "", "name": "", "lowerBound": this.lowerBound, "upperBound": this.upperBound };
    console.log(params)
    this.service.getDiagnosisDetails(JSON.stringify(params)).subscribe(
      data => {
        let data1: any = data;
        this.diagnosisList = data.daignosisList;
        console.log(data);
        // this.maxCount = data1.totalRecordsCount;
      })
  }
  public check(event, ind) {
    console.log(event.target.checked)
    if(event.target.checked){
      this.selectedItems.push(this.diagnosisList[ind])
      console.log(this.selectedItems);
    }

  }


  addFieldValue(template: TemplateRef<any>) {
    // this.fieldArray.push(this.newAttribute)
    // this.newAttribute = {};
    this.bsModelRef = this.modalService.show(template, { class: 'registration-modal-container modal-dialog-centered modal-dialog-scrollable' });

  }


  deleteFieldValue(index) {
    if (this.fieldArray.length !== 1) {
      this.fieldArray.splice(index, 1);
      console.log(this.selectedItems.length);
    }
    if (this.fieldArray.length === 0) {
      console.log(this.fieldArray.length);
      alert('value cant be null');
    }
  }
  public deleteRow(index): void {
    this.selectedItems.forEach((ele, i) => {
      if (index === i) {
        this.selectedItems.splice(index, 1);
        console.log(this.selectedItems);
      }
    });
  }


}
