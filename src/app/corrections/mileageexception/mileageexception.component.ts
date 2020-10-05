import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getLocaleDateFormat, DatePipe } from '@angular/common';
import { ApiserviceService } from 'src/app/services/apiservice.service';
// import { DateFormatter } from 'ngx-bootstrap/datepicker/public_api';
import { BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';


@Component({
  selector: 'app-mileageexception',
  templateUrl: './mileageexception.component.html',
  styleUrls: ['./mileageexception.component.sass']
})
export class MileageexceptionComponent implements OnInit {
  @Output()
  popupUpdate: EventEmitter<any> = new EventEmitter<any>();
  // Display variables
  public JsonData;

  public psName: string;
  public DcsName: string;
  public procedureCode: string;
  public scheduleStartDate: string;
  public scheduleEndDate: string;
  public scheduleStartTime: string;
  public scheduleEndTime: string;
  public clockInMileage: number;
  public clockOutMileage: number;
  public MileageLimitPrefernce;
  public responsedate;
  public acceptResponse;
  public updateResponseData;
  public userId :any;
  public clockInExceptionAccept :boolean= false;
  public clockOutExceptionAccept :boolean= false;
  public clockInExceptionUpdate :boolean= false;
  public clockOutExceptionUpdate :boolean= false;
  public arrMileageExceptionview:boolean=false;
  public depMileageExceptionView:boolean=false;
  public useraccount:any;
  public editTravelTimePriv:boolean=false;

  //APi variables


  constructor(public datepipe: DatePipe, private _apiService: ApiserviceService, public bsmodelRef: BsModalRef,
  ) { }


  public ngOnInit(): void {
    console.log(" mileage oninit calling")
    this.displayData();
    this.getmileageCallApi();

  }
  public displayData(): void {
    var userlist = localStorage.getItem('userlist');
    this.JsonData = JSON.parse(userlist);
    console.log(this.JsonData);
    var useraccount=sessionStorage.getItem('useraccount');
    this.useraccount=JSON.parse(useraccount);
    this.userId=this.useraccount.userId;
    this.DcsName = this.JsonData.dcsName;
    this.psName = this.JsonData.psName;
    this.procedureCode = this.JsonData.procedureCode;
    // this.scheduleStartDate = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'MM/dd/yyyy');
    // this.scheduleStartTime = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'shortTime');
    // this.scheduleEndDate = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'MM/dd/yyyy');
    // this.scheduleEndTime = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'shortTime');
    this.scheduleStartDate=this.JsonData.scheduledBeginDateTime;
    this.scheduleEndDate=this.JsonData.scheduledEndDateTime;
    if (this.JsonData.depMileageException == 1) {
      this.clockOutExceptionAccept = true;
      this.clockOutExceptionUpdate = true;
      this.depMileageExceptionView=true;

      console.log("clockout changed")
    }
    if (this.JsonData.arrMileageException == 1) {
      console.log("clockin changed")
      this.clockInExceptionAccept = true;
      this.clockInExceptionUpdate = true;
      this.arrMileageExceptionview=true;
    }
  }

  public getmileageCallApi(): void {
    var arrivalInfoId = this.JsonData.arrivalInfoId;
    var departureInfoId = this.JsonData.departureInfoId;
    var officeId = this.JsonData.officeId;
    var jsondata = { 'arrivalInfoId': arrivalInfoId, 'departureInfoId': departureInfoId, 'officeId': officeId, 'id': this.JsonData.id }
    var parameters = JSON.stringify(jsondata);
    try {
      this._apiService.getMileageException(parameters).subscribe(
        response => {
          console.log(response);
          this.responsedate = response;
          this.MileageLimitPrefernce = this.responsedate.milegeLimitPrefVal;
          this.clockInMileage = this.responsedate.clockInMilege;
          this.clockOutMileage = this.responsedate.clockOutMilege;
        }, error => {
          console.log(error);
        }
      )
    }
    catch (error) {
      console.log(error);
    }
  }
  public acceptMileageApi(clocktype: string): void {
    var id = this.JsonData.id;
    var visitDetailsId = this.JsonData.visitDetailsId;
    if (clocktype == "clockin") {
      var clockInFlag = 1;
      var clockOutFlag = 0;
    }
    if (clocktype == "clockout") {
      var clockInFlag = 0;
      var clockOutFlag = 1;
    }

    var jsondata = { "id": id, "visitDetailsId": visitDetailsId, "clockInFlag": clockInFlag, "clockOutFlag": clockOutFlag, "userId": this.userId };
    console.log(jsondata);
    var parameters = JSON.stringify(jsondata);
    try {
      this._apiService.acceptMilegeException(parameters).subscribe(
        response => {
          console.log(response);
          if (clocktype == "clockin") {
            this.clockInExceptionAccept = false;
          }
          if (clocktype == "clockout") {
            this.clockOutExceptionAccept = false
          }
          this.acceptResponse = response
          // alert(this.acceptResponse.result);
          if (this.clockInExceptionAccept == false && this.clockOutExceptionAccept == false) {
            swal.fire({
              text: "Accepted successfully",
              icon: "success",
              confirmButtonText: 'Ok',
              allowOutsideClick: false
            }).then(ok => {
              let merged={...this.JsonData,...response}
              if(this._apiService.checkException(merged))
              {
                 this.popupUpdate.emit();
              }else{
                console.log("accept in mileage")
                this._apiService.updateTable.next(true);
                this.bsmodelRef.hide();
              }

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

  public updateMileage(clocktype: string): void {

    //{"arrivalInfoId":1754066,"arrivalMileage":10,"departureInfoId":1750706,"departureMileage":20,"arrMileageException":1,"depMileageException":1,"visitDetailsId":4636570,"userId":1}


    console.log(clocktype)
    if (clocktype == "clockin") {
      var arrivalMileage = this.clockInMileage;
      var departureMileage = 0;
    }
    if (clocktype == "clockout") {
      var arrivalMileage = 0;
      var departureMileage = this.clockOutMileage;
    }

    var JsonData = {
      "id": this.JsonData.id,
      "arrivalInfoId": this.JsonData.arrivalInfoId,
      "arrivalMileage": arrivalMileage, "departureMileage": departureMileage,
      "departureInfoId": this.JsonData.departureInfoId, "depMileageException": this.JsonData.depMileageException, "arrMileageException": this.JsonData.arrMileageException,
      "visitDetailsId": this.JsonData.visitDetailsId, "userId": this.userId
    }
    var parameters = JSON.stringify(JsonData);
    console.log(parameters);
    try {
      this._apiService.updateMilege(parameters).subscribe(
        response => {
          console.log(response);
          this.updateResponseData = response;
          // if(this.updateResponseData.validateFlag==0)
          // {
            if (clocktype == "clockin") {
              this.clockInExceptionUpdate = false;
            }
            if (clocktype == "clockout") {
              console.log('++++++')
              this.clockOutExceptionUpdate = false;
            }
          // }
          console.log(this.clockInExceptionUpdate,this.clockOutExceptionUpdate)
          if (this.clockInExceptionUpdate == false && this.clockOutExceptionUpdate == false) {
            if (this.updateResponseData.validateFlag == 0) {
              swal.fire({
                title: "Updated successfully",
                icon: "success",
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              }).then(ok => {
                this._apiService.updateTable.next(true);
                this.bsmodelRef.hide();
              })

            } else {
              swal.fire({
                title: "Updated failed",
                text:"You cannot update this record since it's already adjusted by some one.",
                icon: "error",
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              })
            }

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
  public validations(event){
    let mileage=event=='clockin'?this.clockInMileage:this.clockOutMileage;
    // console.log(event);
    // console.log(typeof(mileage));
    if(mileage>= 0 && mileage <=999.9)
    {
       this.updateMileage(event);
    }
    else{
      swal.fire({
        text:"The Mileage should between 0 to 999.99",
        icon: "warning",
        confirmButtonText: 'ok',
        allowOutsideClick: false
      })

    }

  }

}
