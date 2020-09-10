import { Component, OnInit, TemplateRef, Input } from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ZipcodeService } from 'src/app/services/zipcode.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: "app-admission-details",
  templateUrl: "./admission-details.component.html",
  styleUrls: ["./admission-details.component.scss"],
})
export class AdmissionDetailsComponent implements OnInit {

  public result = [];

  @Input() popup: boolean;
  public bsModelRef: BsModalRef;
  public admissionForm: FormGroup;
  public Keyword = 'userName';
  public coordinatorValue: string;
  public coordinatorList = [];
  public listingPageData = [];
  id = 'id';
  name = 'name';
  public officeId;
  public clientType;
  public coordinatorData;
  public AdmissionDate: Date;
  public FirstVisitDate: Date;
  public referredDate: Date;
  public isDuplicate: boolean;
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
  psId: number;
  admissionRes: any;
  public userId: number;
  public diagnosisCode: string = '';
  public diagnosisName: string = '';
  constructor(private fb: FormBuilder, public date: DatePipe, public service: ZipcodeService, public modalService: BsModalService, private router: Router) {
    console.log("basic constructer", this.popup);
    let data: any = this.userId = JSON.parse(sessionStorage.getItem("useraccount"));
    this.userId = data.userId
    for (this.i = 1; this.i <= 100; this.i++) {
      this.numbers.push(this.i);

    }
    this.newAttribute = { rank: 0, name: '', code: '' };

    this.newForm();
  }
  i;
  ngOnInit() {

    this.upperBound = this.perPage;

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
    this.psId = psSession.psId
    let params = { "userId": this.userId, "psId": this.psId, "guarantorId": this.guarantorId };
    this.service.getAdmissionLookups(JSON.stringify(params)).subscribe(
      data => {
        console.log(data);
        this.coordinatorData = data;
        this.coordinatorList = data.coordinatorList;
        this.clientType = data.clientType;
        this.clientClass = data.clientClass;
        this.PSName = data.PSName;
        this.guarantorName = data.guarantorName;
        this.psId = data.psId;
        this.officeId = data.officeId

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
    let params = { "userId": this.userId, "code": this.diagnosisCode, "name": this.diagnosisName, "lowerBound": this.lowerBound, "upperBound": this.upperBound };
    console.log(params)
    this.service.getDiagnosisDetails(JSON.stringify(params)).subscribe(
      data => {
        let data1: any = data;
        this.diagnosisList = data.daignosisList;
        this.maxCount = data.totalRecordsCount;
        console.log(data);
      })
  }
  public check(event, ind) {
    console.log(event.target.checked)
    console.log(ind)
    if (event.target.checked) {
      this.selectedItems.push(this.diagnosisList[ind])
      console.log(this.diagnosisList[ind])

      this.result = [];
      const map = new Map();
      let count = 0
      for (const item of this.selectedItems) {
        count++;
        if (!map.has(item.id)) {
          map.set(item.id, true);    // set any value to Map
          this.result.push({
            id: item.id,
            diagnosisName: item.diagnosisName,
            diagnosisCode: item.diagnosisCode,
            rank: count
          });
        }

      }
      console.log(this.result)
    } 
    // else if (event.target.checked === false && this.result.length !== 0) {
    //   console.log(this.result)
    //   this.result.forEach((ele, i) => {
    //     if (this.diagnosisList[ind].id=== ele['id']) {
    //       console.log(this.diagnosisList[ind].id, ele['id'])
    //       this.result.splice(this.diagnosisList[ind],1)
    //     }
    //     console.log(this.diagnosisList[ind].id === ele['id'])
    //     console.log(this.result,'after splice')
    //   });
   // }

  }
  // uncheck(event) {
  //   if (event.target.checked === false)
  //     console.log(this.diagnosisList)
  //   console.log(this.result)
  //   console.log(event.target.check)
  // }
  addFieldValue(template: TemplateRef<any>) {

    this.bsModelRef = this.modalService.show(template, { class: 'registration-modal-container modal-dialog-centered modal-dialog-scrollable' });

  }
  public deleteRow(index): void {
    this.result.forEach((ele, i) => {
      if (index === i) {
        this.result.splice(index, 1);
        console.log(this.result);
      }
    });
  }
  savePs() {
    let temp = [];
    let rank = [];
    let primaryCode;
    console.log(this.admissionForm.value);
    this.result.map((x) => {

      rank.push(x.rank)
      x.rank == 1 ? primaryCode = x.diagnosisCode : temp.push(x.diagnosisCode)
      this.isDuplicate = rank.some(function (item, idx) {
        return rank.indexOf(item) != idx++
      });
    })
    console.log(this.isDuplicate);
    // console.log(temp)
    // console.log(rank)
    // console.log(this.result)


    if (this.admissionForm.valid && temp.length > 0 && this.isDuplicate == false) {
      let params = {
        "psId": this.psId,
        "coordinatorId": this.admissionForm.value.coordinatorId.userInfoId,
        "psGuarantorId": this.guarantorId,
        "admitDate": this.date.transform(this.admissionForm.value.admissionDate, 'MM/dd/yyyy'),
        "firstVisitDate": this.date.transform(this.admissionForm.value.firstVisitDate, 'MM/dd/yyyy'),
        "referralDate": this.date.transform(this.admissionForm.value.referredDate, 'MM/dd/yyyy'),
        "clientTypeId": this.coordinatorData.clientTypeId,
        "clientClassId": this.coordinatorData.clientClassId,
        "primaryDiagnosisCode": primaryCode,
        "otherDiagnoses": temp.toString(),
        "officeId": this.officeId,
        "userId": this.userId
      }
      console.log(params)
      console.log(temp)
      try {
        this.service.saveAdmissionDetails(JSON.stringify(params)).subscribe(
          data => {
            console.log("saveadmission", data);
            this.admissionRes = data
            console.log("datasaved successfully");
            sessionStorage.setItem('AdmissionDetails', JSON.stringify(this.admissionRes));
            sessionStorage.setItem('officeId', JSON.stringify(this.officeId));
            this.router.navigateByUrl('registration-re/child-payorplan');
          })
        // // if (Object.keys(this.admissionRes).length !== 0)
        // {
        //   console.log("datasaved successfully");
        //   sessionStorage.setItem('AdmissionDetails', JSON.stringify(this.admissionRes));
        //   this.router.navigateByUrl('registration-re/child-payorplan');
        // }
      }

      catch (error) {
        console.log(error);

      }
    }
    else if (temp.length == 0) {
      swal.fire({
        title: 'Invalid Entry',
        text: 'No Diagnosis is selected',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
    }
    else if (this.isDuplicate === true) {
      swal.fire({
        title: 'Invalid Entry',
        text: 'Same rank is selected',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
    }

    else {
      swal.fire({
        title: 'Invalid Form',
        text: 'Fill the all Required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
    }

  }
  public searchCLick() {
    this.upperBound = this.perPage;
    this.lowerBound = 1;
    this.getDiagnosisData();
  }
  public reset() {
    this.diagnosisName = '';
    this.diagnosisCode = '';
    this.upperBound = this.perPage;
    this.lowerBound = 1;
    this.getDiagnosisData();
  }

}
