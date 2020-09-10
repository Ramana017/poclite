import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ZipcodeService } from '../../../services/zipcode.service';

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
public servicesList: Array<any> ;
public procedureSelctedItems: Array<any> = []
public beginDate: Date = new Date();
public endDate: Date = new Date();
public billingRate: number;
public totalUnits: number;
public totalUnitsFlag: boolean;
public effectiveFromDate: Date = new Date()
public effectiveToDate: Date = new Date()
public dropdownSettings: object = {
singleSelection: true,
text: "Select Procedure",
enableSearchFilter: true,
labelKey: 'procedureCode',
primaryKey: 'serviceId',
class:'checkbox-list'
}
public privateDuty:boolean;
public casemanagerKeyword="name";
public caseManagerList:Array<any>;
public getlookUpResponse:any;

public payorPlanResponse:any
private psAdmissionId:number;
private psAdmitPayorId:number;
private psId:number;
private ppEffectiveFrom;
private ppEffectiveTo;
private admitDate;



constructor(private  _zipService:ZipcodeService) {
   this.payorPlanResponse=JSON.parse(sessionStorage.getItem('savePayorRes'));
   if(this.payorPlanResponse!=undefined||null){
    this.payorPlanResponse.privateDuty=="true"?this.privateDuty=true:this.privateDuty=false;
    this.admitDate=this.payorPlanResponse.admitDate;
    this.payorPlan=this.payorPlanResponse.payorPlan;
    this.ppEffectiveFrom=this.payorPlanResponse.ppEffectiveFrom;
    this.ppEffectiveTo=this.payorPlanResponse.ppEffectiveTo;
    this.psId=this.payorPlanResponse.psId;
    this.psAdmissionId=this.payorPlanResponse.psAdmissionId;
    this.psAdmitPayorId=this.payorPlanResponse.psAdmitPayorId;
    this.psName=this.payorPlanResponse.psName;

   }

  console.log(this.payorPlanResponse)
}

ngOnInit() {
  this.getLookupsData ();
  this.getAuthBasicDetails();

console.log("Ps Authorization called")
this.beginDate=new Date('10/10/2020')

}
private getAuthBasicDetails(){
  let params={"psAdmissionId": this.psAdmissionId,"psAdmitPayorId" : this.psAdmitPayorId,"psId":this.psId}
  try {
    this._zipService.getAuthBasicDetails(JSON.stringify(params)).subscribe(
      response=>{
        console.log(response);
        let data:any=response;
        this.servicesList=data.servicesList;

      }
    )
  } catch (error) {

  }
}
private getLookupsData(){
  try {
    this._zipService.getLookupsData().subscribe(
      response=>{
        this.getlookUpResponse=response;
        this.caseManagerList=this.getlookUpResponse.caseManager;
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
this.dailyFlag =event.target.checked;
}
public toggleCheck(event): void {
console.log(event.target.checked);
event.target.checked == true ? this.totalUnitsFlag = true : this.totalUnitsFlag = false;
this.totalUnitsFlag == true ? this.totalUnits = null : this.totalUnits;
console.log(this.tempAuth)
}
public tempAuthCheck(): void {
this.tempAuth = !this.tempAuth;
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

public dateChange(){
console.log(this.beginDate)
}

}
