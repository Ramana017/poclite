import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-invalid-token',
  templateUrl: './invalid-token.component.html',
  styleUrls: ['./invalid-token.component.sass']
})
export class InvalidTokenComponent implements OnInit {

  public psName: string;
  public DcsName: string;
  public procedureCode: string;
  public scheduleStartDate: string;
  public scheduleEndDate: string;
  public JsonData: any;
  public userId: number;
  public responseData: any;
  public useraccount: any;
  public clockOutTokenCode:number;
  public clockInTokenCode:number;


  constructor(public _apiService:ApiserviceService) { }

  ngOnInit(): void {
    this.displayData();
    this.getInvalidTokenCodeExceptionData();
  }

  public displayData() {

    var userlist = localStorage.getItem('userlist');
    this.JsonData = JSON.parse(userlist);
    console.log(this.JsonData);
    var useraccount = sessionStorage.getItem('useraccount');
    this.useraccount = JSON.parse(useraccount);
    this.userId = this.useraccount.userId;
    this.DcsName = this.JsonData.dcsName;
    this.psName = this.JsonData.psName;
    this.procedureCode = this.JsonData.procedureCode;
    this.scheduleStartDate=this.JsonData.scheduledBeginDateTime;
    this.scheduleEndDate=this.JsonData.scheduledEndDateTime;

  }

  public getInvalidTokenCodeExceptionData() {
    let jsonObj={"id":this.JsonData.id}
    let parameters = JSON.stringify(jsonObj);
    try {
      this._apiService.getInvalidTokenCodeExceptionData(parameters).subscribe(
        response => {
          let data:any=response;
          this.clockInTokenCode=data.clockInTokenCode;
          this.clockOutTokenCode=data.clockOutTokenCode;
          console.log(response)
        }
      ), error => {

        console.log(error);
      }

    } catch (error) {

      console.log(error);
    }
  }
  public acceptInvalidTokenCodeException() {
    let jsonObj={"id":this.JsonData.id,"visitDetailsId":this.JsonData.visitDetailsId,"clockInFlag":1,"clockOutFlag":1,"userId":this.userId}
    let parameters = JSON.stringify(jsonObj);
    try {
      this._apiService.acceptInvalidTokenCodeException(parameters).subscribe(
        response => {
          let data:any=response;
          console.log(response)
        }
      ), error => {

        console.log(error);
      }

    } catch (error) {

      console.log(error);
    }
  }

  public updateTokenCode() {
    let jsonObj={"id":this.JsonData.id,"visitDetailsId":this.JsonData.visitDetailsId,"psId":this.JsonData.psId,"arrivalTokenCode":this.clockInTokenCode,"departureTokenCode":this.clockOutTokenCode,"userId":this.userId}
    let parameters = JSON.stringify(jsonObj);
    try {
      this._apiService.updateTokenCode(parameters).subscribe(
        response => {
          let data:any=response;
          console.log(response)
        }
      ), error => {

        console.log(error);
      }

    } catch (error) {

      console.log(error);
    }
  }
}
