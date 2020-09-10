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
  @Input() popup: boolean;
  bsModelRef: BsModalRef;
  public admissionForm: FormGroup;
  public Keyword = 'userName';
  public coordinatorValue: string;
  public coordinatorList = [];
  public listingPageData = [];
  field1;
  I;
  id = 'id';
  name = 'name';
  public officeId;
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
  public check(event, ind, data) {
    console.log(event)
    console.log(data,data.id,"data............")
    if (!this.selectedItems.length ) {
      this.selectedItems.push(this.diagnosisList[ind])
    }
    const productExistInCart = this.selectedItems.find(
      ({ id }) => {
        console.log(id,"id.........")
      id === data.id
      }
      
   );
   if (!productExistInCart) {
             this.selectedItems.push(this.diagnosisList[ind])

     return;
   }
    // if (!this.selectedItems.length && event.target.checked) {
    //   this.selectedItems.push(this.diagnosisList[ind])

    // } else {
    // //  if (event.target.checked) {
    //     this.selectedItems.find((x) => {
    //       console.log(x,x.id, "rank..........")
    //       if (data.id === x.id) {
    //         console.log(data.id=== x.id)
    //         console.log("rank")
    //       } else {
      this.selectedItems.push(this.diagnosisList[ind])
    //       }
    //     })
    //  // }

    // }

    console.log(this.selectedItems);

    //  }
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
  savePs() {
    if (this.admissionForm.valid) {
      let temp = [];
      console.log(this.admissionForm.value)
      this.selectedItems.map((x) => {
        temp.push(x.diagnosisCode)
      })
      console.log(temp)
      let params = {
        "psId": this.psId,
        "coordinatorId": this.admissionForm.value.coordinatorId.userInfoId,
        "psGuarantorId": this.guarantorId,
        "admitDate": this.date.transform(this.admissionForm.value.admissionDate, 'MM/dd/yyyy'),
        "firstVisitDate": this.date.transform(this.admissionForm.value.firstVisitDate, 'MM/dd/yyyy'),
        "referralDate": this.date.transform(this.admissionForm.value.referredDate, 'MM/dd/yyyy'),
        "clientTypeId": this.coordinatorData.clientTypeId,
        "clientClassId": this.coordinatorData.clientClassId,
        "primaryDiagnosisCode": temp[0],
        "otherDiagnoses": (temp.shift()).toString(),
        "officeId": this.officeId,
        "userId": this.userId
      }
      console.log(params)
      try {
        this.service.saveAdmissionDetails(JSON.stringify(params)).subscribe(
          data => {
            console.log(data);
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
