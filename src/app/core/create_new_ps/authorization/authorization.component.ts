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
  public beginDate: Date;
  public endDate: Date;
  public billingRate: string;
  public totalUnits: number;
  public totalUnitsFlag: boolean;
  public effectiveFromDate: Date
  public effectiveToDate: Date;
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
  public ppEffectiveFromDate:Date;
  public ppEffectiveToDate:Date;

  public dailyMaxUnits: number;
  public dailyDays: number;
  public weeklyMaxUnits: number;
  public weeklyPerWeek: string=null;
  public weeklyNoOfWeek: number;
  public weeklyDaysPerWeek: number;
  public weeklySunUnits: number;
  public weeklyMonUnits: number;
  public weeklyTueUnits: number;
  public weeklyWedUnits: number;
  public weeklyThuUnits: number;
  public weeklyFriUnits: number;
  public weeklySatUnits: number;
  public monthlyMaxUnits: number;
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
  private authorizationNumber;
  public rateTypeList:Array<any>;


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
      this.ppEffectiveFromDate=new Date(this.ppEffectiveFrom);
      this.ppEffectiveToDate=new Date(this.ppEffectiveTo)

    }

    console.log(this.payorPlanResponse)
  }

  ngOnInit() {
    this.getLookupsData();
    this.getAuthBasicDetails();

    console.log("Ps Authorization called")
    // this.beginDate = new Date('10/10/2020')

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
          this.rateTypeList=this.getlookUpResponse.rateType;

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
    this.totalUnitsFlag == true ? this.totalUnits = 0 : this.totalUnits;
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
    this.billingRate = " ";
  }
  public autoSelected(event, templatetype) {
    templatetype == "tempAuthzDaySpanList";
    if (templatetype == "tempAuthzDaySpanList") {

      this.authorizationNumber = event.id;


    } else if (templatetype == "caseManagerList") {
      this.caseManagerId = event.id;

    }
    else if(templatetype=="rateTypeList"){
      this.privateDutyRateType=event.id;
    }
    console.log(event);

  }

  public dateChange() {
    console.log(this.beginDate)
  }

  public savePSAuthorization() {
    let delivaryobject = {
      "psAdmissionid": this.psAdmissionId,
      "caseManagerId": +this.caseManagerId,
      "authorizationNumber": this.tempAuth ? this.authorizationNumber : this.authorizationManual,
      "psAdmittPayorPlanId": this.psAdmitPayorId,
      "tempAuth": this.tempAuth ? 1 : 0,
      "privateDuty": this.privateDuty ? 1 : 0,
      "serviceId": this.procedureSelctedItems[0].serviceId,
      "billingRate": this.procedureSelctedItems[0].billingRate,
      "billingType": this.procedureSelctedItems[0].billingType,
      "psAddressId": this.psAddressId,
      "beginDate": this.date.transform(this.beginDate, 'MM/dd/yyyy'),
      "endDate": this.tempAuth ? " " : this.date.transform(this.endDate, 'MM/dd/yyyy'),
      "unitDuration": 15,
      "totalUnits": this.totalUnitsFlag ? 0 : +this.totalUnits,
      "totalUnitsFlag": this.totalUnitsFlag ? 1 : 0,
      "dpEffectiveFrom": this.privateDuty ? "" : this.date.transform(this.effectiveFromDate, 'MM/dd/yyyy'),
      "dpEffectiveTo": this.privateDuty ? "  " : this.date.transform(this.effectiveToDate, 'MM/dd/yyyy'),
      "dailyDP": this.dailyFlag ? 1 : 0,
      "dailyMaxUnits": this.dailyFlag ? +this.dailyMaxUnits : 0,
      "dailyDays": this.dailyFlag ? +this.dailyDays : 0,
      "weeklyDP": this.weeklyFlag ? 1 : 0,
      "weeklyMaxUnits": this.weeklyFlag ? +this.weeklyMaxUnits : 0,
      "weeklyPerWeek": this.weeklyFlag ? this.weeklyPerWeek : '',
      "weeklyNoOfWeek": this.weeklyFlag ? +this.weeklyNoOfWeek : 0,
      "weeklyDaysPerWeek": this.weeklyFlag ? +this.weeklyDaysPerWeek : 0,
      "weeklySunUnits": (this.weeklyFlag && !this.dailyFlag && this.weeklyPerWeek == 'F') ? +this.weeklySunUnits : 0,
      "weeklyMonUnits": this.weeklyFlag && !this.dailyFlag ? +this.weeklyMonUnits : 0,
      "weeklyTueUnits": this.weeklyFlag && !this.dailyFlag ? +this.weeklyTueUnits : 0,
      "weeklyWedUnits": this.weeklyFlag && !this.dailyFlag ? +this.weeklyWedUnits : 0,
      "weeklyThuUnits": this.weeklyFlag && !this.dailyFlag ? +this.weeklyThuUnits : 0,
      "weeklyFriUnits": this.weeklyFlag && !this.dailyFlag ? +this.weeklyFriUnits : 0,
      "weeklySatUnits": this.weeklyFlag && !this.dailyFlag && this.weeklyPerWeek == "F" ? +this.weeklySatUnits : 0,
      "monthlyDP": this.monthlyFlag ? 1 : 0,
      "monthlyMaxUnits": this.monthlyFlag ? +this.monthlyMaxUnits : 0,
      "privateDutyRateType": "",
      "regularShift1Rate": 0,
      "regularShift2Rate": 0,
      "regularShift3Rate": 0,
      "weekendShift1Rate": 0,
      "weekendShift2Rate": 0,
      "weekendShift3Rate": 0,
      "holidayShift1Rate": 0,
      "holidayShift2Rate": 0,
      "holidayShift3Rate": 0,
      "userId": this.userId
    }
    let privatePlan = {
      "psAdmissionid": this.psAdmissionId,
      "caseManagerId": +this.caseManagerId,
      "authorizationNumber": this.authorizationManual,
      "psAdmittPayorPlanId": this.psAdmitPayorId,
      "tempAuth": this.tempAuth ? 1 : 0,
      "privateDuty": this.privateDuty ? 1 : 0,
      "serviceId": this.procedureSelctedItems[0].serviceId,
      "billingRate": this.procedureSelctedItems[0].billingRate,
      "billingType": this.procedureSelctedItems[0].billingType,
      "psAddressId": this.psAddressId,
      "beginDate": this.date.transform(this.beginDate, 'MM/dd/yyyy'),
      "endDate": this.date.transform(this.endDate, 'MM/dd/yyyy'),
      "totalUnits": this.totalUnits,
      "totalUnitsFlag": this.totalUnitsFlag ? 1 : 0,
      "dpEffectiveFrom": " ",
      "dpEffectiveTo": " ",
      "dailyDP": 0,
      "dailyMaxUnits": 0,
      "dailyDays": 0,
      "weeklyDP": 0,
      "weeklyMaxUnits": 0,
      "weeklyPerWeek": "",
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
      "regularShift1Rate": +this.regularShift1Rate,
      "regularShift2Rate": +this.regularShift2Rate,
      "regularShift3Rate": +this.regularShift3Rate,
      "weekendShift1Rate": +this.weekendShift1Rate,
      "weekendShift2Rate": +this.weekendShift2Rate,
      "weekendShift3Rate": +this.weekendShift3Rate,
      "holidayShift1Rate": +this.holidayShift1Rate,
      "holidayShift2Rate": +this.holidayShift2Rate,
      "holidayShift3Rate": +this.holidayShift3Rate,
      "unitDuration": 15,
      "userId": this.userId
    }
    let params = this.privateDuty ? privatePlan : delivaryobject
    let params2 = {
      "psAdmissionid": 22605,
      "caseManagerId": 1206,
      "authorizationNumber": "DF56383",
      "psAdmittPayorPlanId": 24684,
      "tempAuth": 0,
      "privateDuty": 0,
      "serviceId": 16,
      "billingRate": 4.74,
      "billingType": "U",
      "psAddressId": 22464,
      "beginDate": "08/01/2020",
      "endDate": " ",
      "unitDuration": 15,
      "totalUnits": 30,
      "totalUnitsFlag": 0,
      "dpEffectiveFrom": "08/01/2020",
      "dpEffectiveTo": "",
      "dailyDP": 1,
      "dailyMaxUnits": 30,
      "dailyDays": 0,
      "weeklyDP": 1,
      "weeklyMaxUnits": 30,
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
      "monthlyDP": 1,
      "monthlyMaxUnits": 30,
      "privateDutyRateType": "",
      "regularShift1Rate": 0,
      "regularShift2Rate": 0,
      "regularShift3Rate": 0,
      "weekendShift1Rate": 0,
      "weekendShift2Rate": 0,
      "weekendShift3Rate": 0,
      "holidayShift1Rate": 0,
      "holidayShift2Rate": 0,
      "holidayShift3Rate": 0,
      "userId": 1
    }
    console.log(delivaryobject)
    try {
      this._zipService.savePSAuthorization(JSON.stringify(params)).subscribe(
        response => {
          console.log(response);
        }
      )

    } catch (error) {
      console.log(error)
    }
  }








}



