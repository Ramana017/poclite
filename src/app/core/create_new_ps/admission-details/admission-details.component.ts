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
  public Keyword2 = 'name';
  public coordinatorValue: string;
  public coordinatorList = [];
  public listingPageData = [];
  id = 'id';
  name = 'name';
  z = [];
  public referralSourceList;
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
  public flag: any;
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
  public formError: boolean = false;
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
      referralSource: ['', Validators.required],


    });
  }
  get f() {
    return this.admissionForm.controls;

  }

  public getAdmissionLookups(): void {
    let guarantorSession: any = JSON.parse(sessionStorage.getItem('guarantorDetails'));
    let psSession: any = JSON.parse(sessionStorage.getItem('psDetails'));
    this.guarantorId = guarantorSession.psGuarantorId;
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
    this.service.getLookupsData2().subscribe(
      res => {
        let data: any = res;
        this.referralSourceList = data.referralSource
        console.log(res)

        console.log("ggggggggg", this.referralSourceList)
      }
    )
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
        this.diagnosisList.map(x => {
          x.flag = false;

        })
        this.showCheckboxData();

        this.maxCount = data.totalRecordsCount;
        console.log(data);
      })
  }
  // itemChecked;

  public check(event, ind, field) {
    //  console.log(event.target.checked)
    //  console.log(ind)
    if (event.target.value, field === 'frstDate') {
      this.admissionForm.get('firstVisitDate').setValue(this.admissionForm.value.admissionDate, 'MM/dd/yyyy')
      console.log(event)
      console.log(event.target.value)

    }
    if (event.target.checked, field === 'addDiagnosis') {
      this.selectedItems.push(this.diagnosisList[ind])
      // console.log(this.diagnosisList[ind])
      let itemChecked = event.target.checked
      this.result = [];
      const map = new Map();
      let count = 0;

      for (const item of this.selectedItems) {
        count++;
        if (!map.has(item.id)) {
          map.set(item.id, true);
          // set any value to Map
          this.result.push({
            flag: true,
            id: item.id,
            diagnosisName: item.diagnosisName,
            diagnosisCode: item.diagnosisCode,
            rank: count
          });
        }

      }
      if (event.target.checked === false) {

        this.result.map((ele, i) => {
          if (ele.id === this.diagnosisList[ind].id) {
            console.log(ele.id === this.diagnosisList[ind].id, 'true')
            this.result.splice(i, 1);
            ele.flag=false
            this.showCheckboxData();
          }
        });
      }
     }

  }
  showCheckboxData(){
    this.result.forEach(ele => {
      this.z.push(ele)
    });
    if (this.z.length > 0) {

      this.diagnosisList.forEach((x, i) => {
        this.z.forEach((y, i) => {
          if (x.id === this.z[i].id) {
            x.flag = true;
            console.log(x, "dialog box");
          }
        });
      });
    }
  }
  addFieldValue(template: TemplateRef<any>) {
    this.showCheckboxData();
   // console.log('res', this.result, 'dia', this.diagnosisList)
    // this.result.forEach(ele => {
    //   this.z.push(ele)
    // });
    // if (this.z.length > 0) {

    //   this.diagnosisList.forEach((x, i) => {
    //     this.z.forEach((y, i) => {
    //       if (x.id === this.z[i].id) {
    //         x.flag = true;
    //         console.log(x, "dialog box");
    //       }
    //     });
    //   });
    // }

    // this.diagnosisList.map(x=>{
    //   x.
    // })

    this.bsModelRef = this.modalService.show(template, { class: 'registration-modal-container modal-dialog-centered modal-dialog-scrollable' });
  }
  public deleteRow(index): void {
    this.result.forEach((ele, i) => {
      
      if (index === i) {
        console.log(ele)
      //  ele.flag=false
        this.result.splice(index, 1);
        console.log(this.result);
      }
    });
  }

  savePs() {
    this.formError = true;
    let temp = [];
    let rank = [];
    let isDuplicate;
    let primaryRank;
    console.log(this.admissionForm.value);
    this.result.map((x) => {
      x.rank === +1 ? primaryRank = x.diagnosisCode : rank.push(x.diagnosisCode)
      temp.push(x.diagnosisCode);
      isDuplicate = rank.some(function (item, idx) {
        return rank.indexOf(item) !== idx;
      });

    });
    console.log(isDuplicate);
    if (this.admissionForm.valid && temp.length > 0 && isDuplicate === false) {
      console.log(temp);
      let params = {
        "psId": this.psId,
        "coordinatorId": this.admissionForm.value.coordinatorId.userInfoId,
        "psGuarantorId": this.guarantorId,
        "admitDate": this.date.transform(this.admissionForm.value.admissionDate, 'MM/dd/yyyy'),
        "firstVisitDate": this.date.transform(this.admissionForm.value.firstVisitDate, 'MM/dd/yyyy'),
        "referralDate": this.date.transform(this.admissionForm.value.referredDate, 'MM/dd/yyyy'),
        "clientTypeId": this.coordinatorData.clientTypeId,
        "clientClassId": this.coordinatorData.clientClassId,
        "primaryDiagnosisCode": primaryRank,
        "otherDiagnoses": rank,
        "officeId": this.officeId,
        "userId": this.userId,
        "referralSourceId": this.admissionForm.value.referralSource.id,
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
        // if (Object.keys(this.admissionRes).length !== 0)
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
    else if (!temp.length) {
      swal.fire({
        title: 'Invalid Entry',
        text: 'No Diagnosis is selected',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
    } else if (isDuplicate) {
      swal.fire({
        title: 'Invalid Form',
        text: ' same rank is selected for Different diagnosis',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
    } else {
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
