import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ZipcodeService } from 'src/app/services/zipcode.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-admission-details",
  templateUrl: "./admission-details.component.html",
  styleUrls: ["./admission-details.component.scss"],
})
export class AdmissionDetailsComponent implements OnInit {
  public bsModelRef: BsModalRef;
  public admissionForm:FormGroup;
  public Keyword = 'userName';
  public coordinatorValue : string;
  public coordinatorList = [];
  public listingPageData = [];
  field1;
  I;
  id = 'id';
  name = 'name';
  public diaCode=[];
  public clientType;
  public coordinatorData;
  public AdmissionDate: Date;
  public FirstVisitDate: Date;
  public referredDate: Date;
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
  guarantorId: any;
  psId: any;
  constructor(private fb: FormBuilder,  public date: DatePipe, public service: ZipcodeService, public modalService: BsModalService) {
    for (let i = 1; i <= 100; i++) {
      this.numbers.push(i);
    }
    this.newForm();
  }
  ngOnInit() {
    this.upperBound = this.perPage;
    this.newAttribute = { rank: null, name: '', code: '' };
    this.upperBound = this.perPage;
    this.getAdmissionLookups();
    this.getDiagnosisData();
  }
  private newForm(): void {
    this.admissionForm = this.fb.group({

      firstVisitDate: ['', Validators.required],
      admissionDate: ['', Validators.required],
      referredDate: ['', Validators.required],
      coordinatorId: ['', Validators.required],


    });
  }
  get f() {
    return this.admissionForm.controls;

  }

  public getAdmissionLookups(): void {
    let guarantorSession: any = JSON.parse(sessionStorage.getItem('guarantorDetails'));
    let psSession: any = JSON.parse(sessionStorage.getItem('psDetails'));
    this.guarantorId = guarantorSession.psGuarId;
    this.psId=psSession.psId
    let params = { "userId": 47, "psId": this.psId, "guarantorId": this.guarantorId };
    this.service.getAdmissionLookups(JSON.stringify(params)).subscribe(
      data => {
        console.log(data);
        this.coordinatorData = data;
        this.coordinatorList = data.coordinatorList;
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

    this.bsModelRef = this.modalService.show(template, { class: 'registration-modal-container modal-dialog-centered modal-dialog-scrollable' });

  }
  public deleteRow(index): void {
    this.selectedItems.forEach((ele, i) => {
      if (index === i) {
        this.selectedItems.splice(index, 1);
        console.log(this.selectedItems);
      }
    });
  }
  savePs(){
    let temp=[];
    console.log(this.admissionForm.value)
    this.selectedItems.map((x)=>{
      temp.push(x.diagnosisCode)
    })
    console.log(temp)
   // this.admissionForm.get('coordinatorId').setValue(event);
    let params ={
      "psId":this.psId,
      "coordinatorId":this.admissionForm.value.coordinatorId.userInfoId,
      "psGuarantorId":23040,
      "admitDate":this.date.transform(this.admissionForm.value.admissionDate,'MM/dd/yyyy'),
      "firstVisitDate": this.date.transform(this.admissionForm.value.firstVisitDate,'MM/dd/yyyy'),
      "referralDate":this.date.transform(this.admissionForm.value.referredDate,'MM/dd/yyyy'),
      "clientTypeId":this.coordinatorData.clientTypeId,
      "clientClassId":this.coordinatorData.clientClassId,
      // "primaryDiagnosisCode":"E8010",
      // "otherDiagnoses":"E800,E8000,E8001,E8002,E8003",
      "primaryDiagnosisCode":temp[0],
      "otherDiagnoses":(temp.shift()).toString(),
      "officeId":191,
      "userId": 47
    }
    alert("lhgdsfdfghjkl;'")
    console.log(params)
    this.service.saveAdmissionDetails(JSON.stringify(params)).subscribe(
      data => {
        console.log(data);
      })

  }


}
