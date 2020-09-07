import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tarveltimeexception',
  templateUrl: './tarveltimeexception.component.html',
  styleUrls: ['./tarveltimeexception.component.sass']
})
export class TarveltimeexceptionComponent implements OnInit {


  public JsonData: any;
  public psName: string;
  public DcsName: string;
  public procedureCode: string;
  public scheduleStartDate: string;
  public scheduleEndDate: string;
  public scheduleStartTime: string;
  public scheduleEndTime: string;
  public userId: number;
  public getResponseDate: any;
  public TTLimitPrefVal: number;
  public travelTime: number;
  public updateResponseData: any;
  public acceptResponseData: any;
  public useraccount: any;
  public editTravelTimePriv: boolean=false;
  constructor(public datepipe: DatePipe, public apiService: ApiserviceService, public bsmodelRef: BsModalRef) { }

  ngOnInit(): void {
    console.log('excessive TT oninit working');
    this.displayData();
    this.getTravelTimeExceptionData();

  }
  public displayData(): void {
    var userlist = localStorage.getItem('userlist');
    this.JsonData = JSON.parse(userlist);
    console.log(this.JsonData);
    var useraccount = sessionStorage.getItem('useraccount');
    this.useraccount = JSON.parse(useraccount);
    this.userId = this.useraccount.userId;
    this.DcsName = this.JsonData.dcsName;
    this.psName = this.JsonData.psName;
    this.procedureCode = this.JsonData.procedureCode;
    // this.scheduleStartDate = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'MM/dd/yyyy');
    // this.scheduleStartTime = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'shortTime');
    // this.scheduleEndDate = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'MM/dd/yyyy');
    // this.scheduleEndTime = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'shortTime');
    this.scheduleStartDate=this.JsonData.scheduledBeginDateTime;
    this.scheduleEndDate=this.JsonData.scheduledEndDateTime;
  }
  public getTravelTimeExceptionData(): void {
    // {"arrivalInfoId":1754066,"officeId":191,"userId":1}
    let JsonData = { "arrivalInfoId": this.JsonData.arrivalInfoId, "officeId": this.JsonData.officeId, "userId": this.userId, "id": this.JsonData.id };
    let parameters = JSON.stringify(JsonData)
    try {
      this.apiService.getTravelTimeExceptionData(parameters).subscribe(
        response => {
          console.log(response);
          this.getResponseDate = response;
          this.TTLimitPrefVal = this.getResponseDate.TTLimitPrefVal;
          this.travelTime = this.getResponseDate.travelTime;
          this.editTravelTimePriv=this.getResponseDate.editTravelTimePriv==1?true:false;
        }, error => {
        console.log(error);
      }
      )

    }
    catch (error) {
      console.log(error);
    }
  }

  public acceptTravelTimeException(): void {
    // {"id":10366,"visitDetailsId":4636570,"userId":1}

    let JsonData = { "id": this.JsonData.id, "visitDetailsId": this.JsonData.visitDetailsId, "userId": this.userId }
    let parameters = JSON.stringify(JsonData);
    try {
      this.apiService.acceptTravelTimeException(parameters).subscribe(
        response => {
          console.log(response);
          if (response) {
            swal.fire({
              text: "Accepted successfully",
              icon: "success",
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            }).then(ok => {
              this.apiService.updateTable.next(true);
              this.bsmodelRef.hide();

            })
          }

        }, error => {
        console.log(error);
      }
      )

    }
    catch (error) {
      console.log(error);
    }
  }


  public updateTravelTime(): void {
    let JsonData = {
      "arrivalInfoId": this.JsonData.arrivalInfoId,
      "travelTime": this.travelTime, "visitDetailsId": this.JsonData.visitDetailsId,
      "userId": this.userId, "id": this.JsonData.id
    }
    let parameters = JSON.stringify(JsonData)
    try {
      this.apiService.updateTravelTime(parameters).subscribe(
        response => {
          this.updateResponseData = response;
          console.log(response);
          if (this.updateResponseData.validateFlag == 0) {
            swal.fire({
              text: "Updated successfully",
              icon: "success",
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            }).then(ok => {
              this.apiService.updateTable.next(true);
              this.bsmodelRef.hide();
            })
          }
          else {
            swal.fire({
              title:'Update Failed',
              text: "You cannot update this record since it's already adjusted by some one",
              icon: "error",
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            })
          }

        }, error => {
        console.log(error);
      }
      )

    }
    catch (error) {
      console.log(error);
    }
  }

  validateTraveltime(){
    if(this.travelTime>=0)
    {
       this.updateTravelTime();
    }
    else{
      swal.fire({
        text:"The Travel should be Numeric and not Less then 0",
        icon: "warning",
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })

    }
  }

}
