import { Component, OnInit, TemplateRef, Input } from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ZipcodeService } from 'src/app/services/zipcode.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { count } from 'rxjs/operators';


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
  public id = 'id';
  public name = 'name';
  public referralSourceList;
  public officeId;
  public clientType;
  public coordinatorData;
  // public AdmissionDate: Date = new Date();
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
  public code = 'code'
  public name1: any;
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  public rows: any;
  public admissionPeriod;
  public ds: any;
  public finalList = [];
  public tableList = [];
  public guarantorId: any;
  public psId: number;
  public admissionRes: any;
  public minDate: Date;
  public userId: number;
  public formError: boolean = false;
  public diagnosisCode: string = '';
  public diagnosisName: string = '';
  public dateValidationFlag: boolean = false;
  constructor(private fb: FormBuilder, public date: DatePipe, public service: ZipcodeService, public modalService: BsModalService, private router: Router) {
    console.log("basic constructer", this.popup);
    let data: any = this.userId = JSON.parse(sessionStorage.getItem("useraccount"));
    this.userId = data.userId
    // for (this.i = 1; this.i <= 100; this.i++) {
    // this.numbers.push(this.i);

    // }
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
  // Code for formcontrols
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
  // Get lookups data
  public getAdmissionLookups(): void {
    let guarantorSession: any = JSON.parse(sessionStorage.getItem('guarantorDetails'));
    let psSession: any = JSON.parse(sessionStorage.getItem('psDetails'));
    this.guarantorId = guarantorSession.psGuarantorId;
    this.psId = psSession.psId
    let params = { "userId": this.userId, "psId": this.psId, "guarantorId": this.guarantorId };
    try {
      this.service.getAdmissionLookups(JSON.stringify(params)).subscribe(
        data => {
          console.log(data);
          this.coordinatorData = data;
          this.coordinatorList = data.coordinatorList;
          this.clientType = data.clientType;
          this.clientClass = data.clientClass;
          this.admissionPeriod = data.admissionPeriod;
          this.PSName = data.PSName;
          this.guarantorName = data.guarantorName;
          this.psId = data.psId;
          this.officeId = data.officeId
          this.getLookupsData2();

        })
    } catch (error) {
      console.log(error);

    }

  }
  // Get referral data
  public getLookupsData2() {

    try {
      this.service.getLookupsData2(this.officeId).subscribe(
        res => {
          let data: any = res;
          this.referralSourceList = data.referralSource
          console.log(res)

          console.log("ggggggggg", this.referralSourceList)
        }
      )
    } catch (error) {
      console.log(error);
    }

  }
  // Navigate to next page data in popup
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
  // Navigate to prev page data in popup
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
  // Reset the seleted data
  public pagereset(): void {

    console.log(this.perPage);
    this.diagnosisList.length = 0;
    this.lowerBound = 1;
    this.upperBound = this.perPage;
    this.getDiagnosisData();

  }
  // Get the whole diagnosis data according to lower and upper bound
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
  // Selecting the diagnosis data in the popup
  public check(event, ind, field) {

    if (event.target.checked && !this.finalList.length, field === 'addDiagnosis') {
      this.selectedItems = this.finalList

      this.selectedItems.push(this.diagnosisList[ind]);
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
        console.log(this.result, "on checked result")
      }
      if (event.target.checked === false) {
        this.selectedItems.forEach((select, i) => {
          if (select.id === this.diagnosisList[ind].id) {
            console.log(select.id, i)
            this.selectedItems.splice(i, 1);
            this.result.splice(i, 1);
          }
        })
        this.result.map((result, j) => {
          if (result.id === this.diagnosisList[ind].id) {
            result.rank == count--;
            result.flag = false;
          }
        });
      }
    }
    this.finalList = this.result;
    // this.finalList.push(this.selectedItems)


  }
  // Add the final Array to the table on clicking add button
  public addList() {
    this.tableList = this.finalList;

    for (let i = 0; i < this.tableList.length; i++) {
      console.log(this.tableList[i], "in loop")
      this.tableList[i].rank = i + 1
      console.log(this.tableList, "on tablelist in for loop")
    }
    console.log(this.tableList, "on tablelist")

  }
  // Show the selected data while navigating to prev and next pages
  public showCheckboxData() {
    if (this.finalList.length >= 0) {

      this.diagnosisList.forEach((x, i) => {
        this.finalList.forEach((y, i) => {
          if (x.id === this.finalList[i].id) {
            x.flag = true;
            console.log(x, "dialog box");
          }
        });
      });
    }
    //this.z.push(this.selectedItems)
  }
  // Code for the popup
  public addFieldValue(template: TemplateRef<any>) {
    this.showCheckboxData();


    this.bsModelRef = this.modalService.show(template, { class: 'registration-modal-container modal-dialog-centered modal-dialog-scrollable', backdrop: 'static' });
  }
  // Delete unwanted row from the table
  public deleteRow(index): void {
    this.finalList.forEach((ele, i) => {
      if (index === i) {
        console.log(ele)
        ele.flag = false
        this.finalList.splice(index, 1);
      }
      for (let i = 0; i < this.finalList.length; i++) {
        console.log(this.finalList[i], "in loop")
        this.finalList[i].rank = i + 1

        console.log(this.finalList, "on tablelist in for loop")
      }
      console.log(this.finalList);
    });
  }

  dateValidation() {
    this.formError = true;
    // console.log(this.admissionForm.value.firstVisitDate)
    // console.log(this.admissionForm.value.admissionDate)
    // console.log(this.admissionForm.value.referredDate)
    if (this.admissionForm.valid) {

      let firstDateFlag: boolean = false;
      let referdateFlag: boolean = false;
      let admitDateFlag: boolean = false;
      let adminDateParse = Date.parse(this.date.transform(this.admissionForm.value.firstVisitDate, 'MM/dd/yyyy'));
      let frstDateParse = Date.parse(this.date.transform(this.admissionForm.value.admissionDate, 'MM/dd/yyyy'));
      let referredDate = Date.parse(this.date.transform(this.admissionForm.value.referredDate, 'MM/dd/yyyy'));
      if (adminDateParse >= frstDateParse) {
        console.log(adminDateParse, 'adminDateParse', frstDateParse, 'frstDateParse')
        console.log(adminDateParse < frstDateParse)
        firstDateFlag = true;
      } else {
        firstDateFlag = false;
        swal.fire({
          title: 'Invalid First Visit',
          text: 'First Visit Date should not be less than Admission Date',
          icon: 'error',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
      }

      if (referredDate <= adminDateParse) {
        console.log(adminDateParse, 'adminDateParse', referredDate, 'referredDate')
        referdateFlag = true
      }
      else {
        referdateFlag = false;
        swal.fire({
          title: 'Invalid Refferred Visit',
          text: 'Referral Date should be less than or equal to Admission Date.',
          icon: 'error',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
      }
      let admissionPeriodDate: Date = new Date()
      admissionPeriodDate.setDate(admissionPeriodDate.getDate() - this.admissionPeriod)
      let admissionDateSeconds = Date.parse(this.date.transform(admissionPeriodDate, 'MM/dd/yyyy'))
      console.log(admissionPeriodDate)

      if (admissionDateSeconds <= adminDateParse) {
        admitDateFlag = true;

        console.log(adminDateParse, 'adminDateParse', frstDateParse, 'frstDateParse', referredDate, 'referredDate', new Date().setDate(new Date().getDate() + 365), "false")

      }
      else {
        admitDateFlag = false;
        swal.fire({
          title: 'Invalid Admission date',
          text: 'The admission date selected is more than ' + this.admissionPeriod + 'day(s) in the past and cannot be entered',
          icon: 'error',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        })
      }
      if (firstDateFlag && referdateFlag && admitDateFlag) {
        this.savePs();
      }
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

  // Code for Saving the whole data
  public savePs() {

    console.log(this.tableList, "on tablelist")
    this.formError = true;
    let temp = [];
    let rank = [];
    //let isDuplicate;
    let primaryRank;
    console.log(this.admissionForm.value);
    this.tableList.map((x) => {
      x.rank === +1 ? primaryRank = x.diagnosisCode : rank.push(x.diagnosisCode)
      temp.push(x.diagnosisCode);
      // isDuplicate1 = rank.some(function (item, idx) {
      //   return rank.indexOf(item) !== idx;
      // });

    });

    var valueArr = this.finalList.map(function (item) { return item.rank });
    var isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) != idx
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
        "otherDiagnoses": rank.toString(),
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
            console.log(Object.keys(this.admissionRes).length);
            // console.log("datasaved successfully");
            // sessionStorage.setItem('AdmissionDetails', JSON.stringify(this.admissionRes));
          //  sessionStorage.setItem('officeId', JSON.stringify(this.officeId));
            // this.router.navigateByUrl('registration-re/child-payorplan');
            if (Object.keys(this.admissionRes).length > 0) {
              console.log("datasaved successfully");
              sessionStorage.setItem('AdmissionDetails', JSON.stringify(this.admissionRes));
              sessionStorage.setItem('officeId', JSON.stringify(this.officeId));
              this.service.showSuccess('Admission created Succssfully!');
                this.router.navigateByUrl('registration-re/child-payorplan');
            }
          });

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
    } else if (isDuplicate === true) {
      swal.fire({
        title: 'Invalid Form',
        text: ' Same rank is selected for Different diagnosis',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
    } else if (this.admissionForm.get('firstVisitDate') < this.admissionForm.get('admissionDate')) {
      swal.fire({
        title: 'Invalid Form',
        text: 'Your First Visit Date is greater than Admission Date ',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      });
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
  // Code for Searching option in the popup
  public searchCLick() {
    this.upperBound = this.perPage;
    this.lowerBound = 1;
    this.getDiagnosisData();
  }
  // Code to reset
  public reset() {
    this.diagnosisName = '';
    this.diagnosisCode = '';
    this.upperBound = this.perPage;
    this.lowerBound = 1;
    this.getDiagnosisData();
  }
  // Code for auto populating the first visit date
  // Code for setting min and max dates for first and reffered dates
  public admissionDateChange() {
    this.admissionForm.get('firstVisitDate').setValue(this.admissionForm.value.admissionDate);

  }
}
