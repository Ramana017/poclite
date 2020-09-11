import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ZipcodeService } from '../../../services/zipcode.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  public dailyFlag = false;
  public monthlyFlag = false;
  public weeklyFlag = false;
  public psName: string;
  public tempAuth: boolean = false;
  public authHash: string;
  public payorPlan: string;
  public caseManager: string;
  public servicesList: Array<any>;
  public procedureSelctedItems: Array<any> = []
  public beginDate: Date = new Date();
  public endDate: Date = new Date();
  public billingRate: number;
  public totalUnits: number;
  public totalUnitsFlag: boolean;
  public effectiveFromDate: Date = new Date()
  public effectiveToDate: Date = new Date();
  public caseManagerId: number;
  public dropdownSettings: object = {
    singleSelection: true,
    text: "Select Procedure",
    enableSearchFilter: true,
    labelKey: 'procedureCode',
    primaryKey: 'serviceId',
    class: 'checkbox-list'
  }
  public authorizationManual: string;
  public privateDuty: boolean;
  public casemanagerKeyword = "name";
  public tempAuthzDaySpanKeyword = "name";
  public caseManagerList: Array<any>;
  public tempAuthzDaySpanList: Array<any>;
  public getlookUpResponse: any;
  public locationList: Array<any>;
  public psAddressId: number;

  public payorPlanResponse: any
  private psAdmissionId: number;
  private psAdmitPayorId: number;
  private psId: number;
  private ppEffectiveFrom;
  private ppEffectiveTo;
  private admitDate;

  public dailyMaxUnits: number;
  public dailyDays;
  public weeklyMaxUnits;
  public weeklyPerWeek;
  public weeklyNoOfWeek;
  public weeklyDaysPerWeek;
  public weeklySunUnits;
  public weeklyMonUnits;
  public weeklyTueUnits;
  public weeklyWedUnits;
  public weeklyThuUnits;
  public weeklyFriUnits;
  public weeklySatUnits;
  public monthlyMaxUnits;
  public privateDutyRateType;
  public regularShift1Rate;
  public regularShift2Rate;
  public regularShift3Rate;
  public weekendShift1Rate;
  public weekendShift2Rate;
  public weekendShift3Rate;
  public holidayShift1Rate;
  public holidayShift2Rate;
  public holidayShift3Rate;
  private userId;


  constructor(private _zipService: ZipcodeService, private date: DatePipe) {
    let data: any = this.userId = JSON.parse(sessionStorage.getItem("useraccount"));
    this.userId = data.userId
    this.payorPlanResponse = JSON.parse(sessionStorage.getItem('savePayorRes'));
    if (this.payorPlanResponse != undefined || null) {
      this.payorPlanResponse.privateDuty == "true" ? this.privateDuty = true : this.privateDuty = false;
      this.admitDate = this.payorPlanResponse.admitDate;
      this.payorPlan = this.payorPlanResponse.payorPlan;
      this.ppEffectiveFrom = this.payorPlanResponse.ppEffectiveFrom;
      this.ppEffectiveTo = this.payorPlanResponse.ppEffectiveTo;
      this.psId = this.payorPlanResponse.psId;
      this.psAdmissionId = this.payorPlanResponse.psAdmissionId;
      this.psAdmitPayorId = this.payorPlanResponse.psAdmitPayorId;
      this.psName = this.payorPlanResponse.psName;

    }

    console.log(this.payorPlanResponse)
  }

  ngOnInit() {
    this.getLookupsData();
    this.getAuthBasicDetails();

    console.log("Ps Authorization called")
    this.beginDate = new Date('10/10/2020')

  }
  private getAuthBasicDetails() {
    let params = { "psAdmissionId": this.psAdmissionId, "psAdmitPayorId": this.psAdmitPayorId, "psId": this.psId }
    try {
      this._zipService.getAuthBasicDetails(JSON.stringify(params)).subscribe(
        response => {
          console.log(response);
          let data: any = response;
          this.servicesList = data.servicesList;
          this.locationList = data.locationList;
          this.psAddressId = this.locationList[0].psAddressId;

        }
      )
    } catch (error) {

    }
  }
  private getLookupsData() {
    try {
      this._zipService.getLookupsData().subscribe(
        response => {
          console.log(response)
          this.getlookUpResponse = response;
          this.caseManagerList = this.getlookUpResponse.caseManager;
          this.tempAuthzDaySpanList = this.getlookUpResponse.tempAuthzDaySpan;

        }
      )
    } catch (error) {

    }

  }
  public toggleDisplayDivWeekly(event): void {
    console.log(event.target.checked)
    this.weeklyFlag = event.target.checked;

  }
  public toggleDisplayDivMonthly(event): void {
    this.monthlyFlag = event.target.checked;
  }
  public toggleDisplayDivDaily(event): void {
    this.dailyFlag = event.target.checked;
  }
  public toggleCheck(event): void {
    console.log(event.target.checked);
    event.target.checked == true ? this.totalUnitsFlag = true : this.totalUnitsFlag = false;
    this.totalUnitsFlag == true ? this.totalUnits = null : this.totalUnits;
    console.log(this.tempAuth)
  }
  public tempAuthCheck(event): void {
    this.tempAuth = event.target.checked;
    console.log(this.tempAuth)
  }
  public procedureChange(event): void {
    console.log(event)
  }
  public procedureSelect(): void {
    console.log(this.procedureSelctedItems)
    this.billingRate = this.procedureSelctedItems[0].billingRate;
  }
  public procedureDeSelect(): void {
    this.procedureSelctedItems.length = 0;
    console.log(this.procedureSelctedItems)
    this.billingRate = null;
  }
  public autoSelected(event, templatetype) {
    templatetype == "tempAuthzDaySpanList";
    if (templatetype == "tempAuthzDaySpanList") {

    } else if (templatetype == "caseManagerList") {
      this.caseManagerId = event.id;

    }
    console.log(event);

  }

  public dateChange() {
    console.log(this.beginDate)
  }

  public savePSAuthorization() {
    let delivaryobject = {
      "psAdmissionid": this.psAdmissionId,
      "caseManagerId": this.caseManagerId,
      "authorizationNumber": this.authorizationManual,
      "psAdmittPayorPlanId": this.psAdmitPayorId,
      "tempAuth": this.tempAuth,
      "privateDuty": this.privateDuty ? 1 : 0,
      "serviceId": this.procedureSelctedItems[0].serviceId,
      "billingRate": this.procedureSelctedItems[0].billingRate,
      "billingType": this.procedureSelctedItems[0].billingType,
      "psAddressId": this.psAddressId,
      "beginDate": this.date.transform(this.beginDate, 'MM/dd/yyyy'),
      "endDate": this.date.transform(this.endDate, 'MM/dd/yyyy'),
      "totalUnits": this.totalUnits,
      "totalUnitsFlag": this.totalUnitsFlag ? 1 : 0,
      "dpEffectiveFrom": this.date.transform(this.effectiveFromDate, 'MM/dd/yyyy'),
      "dpEffectiveTo": this.date.transform(this.effectiveToDate, 'MM/dd/yyyy'),
      "dailyDP": this.dailyFlag ? 1 : 0,
      "dailyMaxUnits": this.dailyMaxUnits,
      "dailyDays": this.dailyDays,
      "weeklyDP": this.weeklyFlag ? 1 : 0,
      "weeklyMaxUnits": this.weeklyMaxUnits,
      "weeklyPerWeek": "W",
      "weeklyNoOfWeek": this.weeklyPerWeek,
      "weeklyDaysPerWeek": this.weeklyDaysPerWeek,
      "weeklySunUnits": this.weeklySunUnits,
      "weeklyMonUnits": this.weeklyMonUnits,
      "weeklyTueUnits": this.weeklyTueUnits,
      "weeklyWedUnits": this.weeklyWedUnits,
      "weeklyThuUnits": this.weeklyThuUnits,
      "weeklyFriUnits": this.weeklyFriUnits,
      "weeklySatUnits": this.weeklySatUnits,
      "monthlyDP": this.monthlyFlag ? 1 : 0,
      "monthlyMaxUnits": this.monthlyMaxUnits,
      "privateDutyRateType":"",
      "regularShift1Rate":0,
      "regularShift2Rate":0,
      "regularShift3Rate":0,
      "weekendShift1Rate":0,
      "weekendShift2Rate":0,
      "weekendShift3Rate":0,
      "holidayShift1Rate":0,
      "holidayShift2Rate":0,
      "holidayShift3Rate":0,
      "userId": this.userId
    }
    let privatePlan = {
      "psAdmissionid": this.psAdmissionId,
      "caseManagerId": this.caseManagerId,
      "authorizationNumber": this.authorizationManual,
      "psAdmittPayorPlanId": this.psAdmitPayorId,
      "tempAuth": this.tempAuth?1:0,
      "privateDuty": this.privateDuty ? 1 : 0,
      "serviceId": this.procedureSelctedItems[0].serviceId,
      "billingRate": this.procedureSelctedItems[0].billingRate,
      "billingType": this.procedureSelctedItems[0].billingType,
      "psAddressId": this.psAddressId,
      "beginDate": this.date.transform(this.beginDate, 'MM/dd/yyyy'),
      "endDate": this.date.transform(this.endDate, 'MM/dd/yyyy'),
      "totalUnits": this.totalUnits,
      "totalUnitsFlag": this.totalUnitsFlag ? 1 : 0,
      "dpEffectiveFrom": "",
      "dpEffectiveTo": "",
      "dailyDP": 0,
      "dailyMaxUnits": 0,
      "dailyDays": 0,
      "weeklyDP": 0,
      "weeklyMaxUnits": 0,
      "weeklyPerWeek": "W",
      "weeklyNoOfWeek": 0,
      "weeklyDaysPerWeek": 0,
      "weeklySunUnits": 0,
      "weeklyMonUnits": 0,
      "weeklyTueUnits": 0,
      "weeklyWedUnits": 0,
      "weeklyThuUnits": 0,
      "weeklyFriUnits": 0,
      "weeklySatUnits": 0,
      "monthlyDP": 0,
      "monthlyMaxUnits": 0,
      "privateDutyRateType": this.privateDutyRateType,
      "regularShift1Rate": this.regularShift1Rate,
      "regularShift2Rate": this.regularShift2Rate,
      "regularShift3Rate": this.regularShift3Rate,
      "weekendShift1Rate": this.weekendShift1Rate,
      "weekendShift2Rate": this.weekendShift2Rate,
      "weekendShift3Rate": this.weekendShift3Rate,
      "holidayShift1Rate": this.holidayShift1Rate,
      "holidayShift2Rate": this.holidayShift2Rate,
      "holidayShift3Rate": this.holidayShift3Rate,
      "unitDuration": 15,
      "userId": this.userId
    }
    let params =this.privateDuty?privatePlan:delivaryobject
    console.log(params)
      // try {
      //   this._zipService.savePSAuthorization(JSON.stringify(params)).subscribe(
      //     response=>{
      //       console.log(response);
      //     }
      //   )

      // } catch (error) {
      //   console.log(error)
      // }
  }







}



