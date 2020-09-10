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
public psName: string="Aquila";
public tempAuth: boolean = false;
public authHash: string;
public payorPlan: string="Quaterly";
public caseManager: string;
public procedureCode: Array<any> = [
{ procedureId: "201", procedureName: 'procedure1', billingprice: 1000 },
{ procedureId: "202", procedureName: 'procedure2', billingprice: 2000 },
{ procedureId: "203", procedureName: 'procedure3', billingprice: 3000 },
{ procedureId: "204", procedureName: 'procedure4', billingprice: 4000 },
{ procedureId: "205", procedureName: 'procedure5', billingprice: 5000 }];
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
labelKey: 'procedureName',
primaryKey: 'procedureId',
class:'checkbox-list'
}
public privateDuty:boolean;


constructor() {
  let data:any=JSON.parse(localStorage.getItem('savePayorRes'));
  this.privateDuty= data.privateDuty
}

ngOnInit() {
console.log("Ps Authorization called")
this.beginDate=new Date('10/10/2020')

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
this.billingRate = this.procedureSelctedItems[0].billingprice;
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
