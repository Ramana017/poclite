import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getLocaleDateFormat, DatePipe } from '@angular/common';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';


@Component({
  selector: 'app-scheduledvariance',
  templateUrl: './scheduledvariance.component.html',
  styleUrls: ['./scheduledvariance.component.sass']
})
export class ScheduledvarianceComponent implements OnInit {
  @Output()
  popupUpdate: EventEmitter<any> = new EventEmitter<any>();
  public psName: string;
  public DcsName: string;
  public procedureCode: string;
  public scheduleStartDate: string;
  public scheduleEndDate: string;
  public scheduleStartTime: string;
  public scheduleEndTime: string;
  public jsonData: any;
  public arrivalAdjustReasons: Array<any>;
  public departureAdjustReasons: Array<any>;
  public scheduleVarPrefVal: number;
  public scheduleVariance: number;
  public clockOutDateAndTime: Date;
  public clockInDateAndTime: Date;
  public userid: number;
  public clockInDate: any = new Date();
  public clockInTime: string;
  public clockOutDate: any;
  public clockOutDateview: any;
  public clockinDateview: any;

  public ClockOutTime;
  public departureAdjReasonId: number = 0;
  public arrivalAdjReasonId: number = 0;
  public getResponsedata: any;
  public updateResponseData: any;
  public useraccount: any;
  public todaysDate: Date = new Date();

  public clockinChangeFlag: boolean = false;
  public clockoutChangeFlag: boolean = false;

  public exampleDate: any = new Date();
  public hours: Array<any> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public minutes: Array<any> = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
  public meridian: Array<any> = ['AM', 'PM']
  public clockinHours: any;
  public clockinMinutes: any;
  public ClockinMeridian: any;
  public clockoutHours: any;
  public clockoutMinutes: any;
  public ClockoutMeridian: any;
  public orginalStartDate: string;
  public OrginalEndDate: string;

  minTime: Date = new Date();
  maxTime: Date = new Date();
  public scheduleVarAcceptReasonList = [];
  public exceptionAcceptReasonId: Number = 0;
  constructor(public datepipe: DatePipe, public _apiService: ApiserviceService, public bsmodelRef: BsModalRef) { }

  ngOnInit(): void {
    console.log('schedule oninit working');
    this.displayData();
    this.getScheduleVarExceptionData();

  }
  public displayData(): void {
    var userlist = localStorage.getItem('userlist');
    this.jsonData = JSON.parse(userlist);
    console.log(this.jsonData);
    var useraccount = sessionStorage.getItem('useraccount');
    this.useraccount = JSON.parse(useraccount);
    this.userid = this.useraccount.userId;
    this.DcsName = this.jsonData.dcsName;
    this.psName = this.jsonData.psName;
    this.procedureCode = this.jsonData.procedureCode;
    // this.scheduleStartDate = this.datepipe.transform(this.jsonData.scheduledBeginDateTime, 'dd/MM/yyyy');
    // this.scheduleStartTime = this.datepipe.transform(this.jsonData.scheduledBeginDateTime, 'shortTime');
    // this.scheduleEndDate = this.datepipe.transform(this.jsonData.scheduledEndDateTime, 'dd/MM/yyyy');
    // this.scheduleEndTime = this.datepipe.transform(this.jsonData.scheduledEndDateTime, 'shortTime');
    this.scheduleStartDate = this.jsonData.scheduledBeginDateTime;
    this.scheduleEndDate = this.jsonData.scheduledEndDateTime;

  }

  public getScheduleVarExceptionData() {

    var JsonData = { "id": this.jsonData.id, "officeId": this.jsonData.officeId };
    var parameters = JSON.stringify(JsonData);
    try {
      this._apiService.getScheduleVarExceptionData(parameters).subscribe(
        response => {
          console.log(response);
          this.getResponsedata = response;
          this.departureAdjustReasons = this.getResponsedata.departureAdjustReasons;
          this.arrivalAdjustReasons = this.getResponsedata.arrivalAdjustReasons;
          this.scheduleVarPrefVal = this.getResponsedata.scheduleVarPrefVal;
          this.scheduleVariance = this.getResponsedata.scheduleVariance;
          this.clockInDateAndTime = this.getResponsedata.clockInDateAndTime;
          this.clockOutDateAndTime = this.getResponsedata.clockOutDateAndTime;
          this.clockinDateview = this.datepipe.transform(this.clockInDateAndTime, 'MM/dd/yyyy');
          this.clockOutDateview = this.datepipe.transform(this.clockOutDateAndTime, 'MM/dd/yyyy');
          this.clockInTime = this.datepipe.transform(this.clockInDateAndTime, 'hh:mm a')
          this.clockinHours = this.datepipe.transform(this.clockInDateAndTime, 'hh')
          this.clockinMinutes = this.datepipe.transform(this.clockInDateAndTime, 'mm')
          this.ClockinMeridian = this.datepipe.transform(this.clockInDateAndTime, 'a')
          this.clockoutHours = this.datepipe.transform(this.clockOutDateAndTime, 'hh')
          this.clockoutMinutes = this.datepipe.transform(this.clockOutDateAndTime, 'mm')
          this.ClockoutMeridian = this.datepipe.transform(this.clockOutDateAndTime, 'a')

          this.orginalStartDate = this.getResponsedata.originalSchBeginDateTime;
          this.OrginalEndDate = this.getResponsedata.originalSchEndDateTime;
          this.scheduleVarAcceptReasonList = this.getResponsedata.scheduleVarAcceptReasonList;
          console.log("ramana", this.getResponsedata.originalSchEndDateTime)

          // this.datepipe.transform(this.clockInDateAndTime,'a')

          console.log('minutes', this.clockinHours, this.clockinMinutes, this.ClockinMeridian)

          // this.clockOutDate = this.datepipe.transform(this.clockOutDateAndTime, 'MM/dd/yyyy');
          // this.validationschedule()

        }, error => {
          console.log(error);
        }
      )
    }
    catch (error) {
      console.log(error);
    }


  }

  public acceptScheduleVarException() {
    var JsonData = { "id": this.jsonData.id, "visitDetailsId": this.jsonData.visitDetailsId, "userId": this.userid, exceptionAcceptReasonId: this.exceptionAcceptReasonId }
    let parameters = JSON.stringify(JsonData);
    if (this.exceptionAcceptReasonId == 0) {
      swal.fire({
        // title: "Invalid",
        text: "Please select Verification Method before accept",
        icon: "warning",
        confirmButtonText: 'OK',
        allowOutsideClick: false
      })
    } else {
      console.log(JsonData)
      try {
        this._apiService.acceptScheduleVarException(parameters).subscribe(
          response => {
            if (response) {
              let merged = { ...this.jsonData, ...response };
              if (this._apiService.checkException(merged)) {
                console.log("exception is there");
                this.popupUpdate.emit();
              } else {
                console.log("exception not there")
                swal.fire({
                  text: "Accepted successfully",
                  icon: "success",
                  confirmButtonText: 'OK',
                  allowOutsideClick: false
                }).then(ok => {
                  let merged = { ...this.jsonData, ...response }
                  if (this._apiService.checkException(merged)) {
                    this.popupUpdate.emit();
                  } else {
                    this._apiService.updateTable.next(true);
                    this.bsmodelRef.hide();
                  }
                })
              }
            }

          },
          error => {
            console.log(error);
          }
        )
      }
      catch (error) {

        console.log(error);
      }
    }
  }
  public updateReportedTimes() {

    if (this.arrivalAdjReasonId != null || undefined && this.departureAdjReasonId != null || undefined) {
      let newclockindate = this.datepipe.transform(this.clockInDate, 'MM/dd/yyyy') + " " + this.datepipe.transform(this.clockInDate, 'h:mm a');
      let newclockoutdate = this.datepipe.transform(this.clockOutDate, 'MM/dd/yyyy') + " " + this.datepipe.transform(this.clockOutDate, 'h:mm a');
      var JsonData = { "id": this.jsonData.id, "arrivalDateTime": this.clockInDateAndTime, "departureDateTime": this.clockOutDateAndTime, newArrivalDateTime: newclockindate, "newDepartureDateTime": newclockoutdate, "arrivalAdjReasonId": this.arrivalAdjReasonId, "departureAdjReasonId": this.departureAdjReasonId, "userId": this.userid }
      let parameters = JSON.stringify(JsonData);
      console.log(JsonData)
      try {
        this._apiService.updateReportedTimes(parameters).subscribe(
          response => {
            console.log(response);
            this.updateResponseData = response;
            if (this.updateResponseData.validateFlag == 0) {
              swal.fire({
                text: "Updated successfully",
                icon: "success",
                confirmButtonText: 'OK',
                allowOutsideClick: false
              }).then(ok => {
                let merged = { ...this.jsonData, ...response }
                if (this._apiService.checkException(merged)) {
                  this.popupUpdate.emit();
                } else {
                  this._apiService.updateTable.next(true);
                  this.bsmodelRef.hide();
                }
              })
            }
            else {
              swal.fire({
                title: "Updated failed",
                text: "You cannot update this record since it's already adjusted by some one",
                icon: "error",
                confirmButtonText: 'OK',
                allowOutsideClick: false
              })
            }

          },
          error => {
            console.log(error);
          }
        )
      }
      catch (error) {

        console.log(error);
      }
    }
    else {
      alert("select Arrival and  departure Adjust Reasons");
    }


  }


  public validationschedule() {
    if (this.clockinDateview != undefined && this.clockinHours != undefined && this.clockinMinutes != undefined && this.clockoutMinutes != undefined && this.clockoutHours && this.clockOutDateview != undefined) {

      // let clockinschedule = "'" + this.datepipe.transform(this.clockinDateview, 'MM/dd/yyyy') + " " + this.clockinHours + ":" + this.clockinMinutes + " " + this.ClockinMeridian + "'"
      // let clockoutschedule = "'" + this.datepipe.transform(this.clockOutDateview, 'MM/dd/yyyy') + " " + this.clockoutHours + ":" + this.clockoutMinutes + " " + this.ClockoutMeridian + "'"

      let clockinyear: any = this.datepipe.transform(this.clockinDateview, 'yyyy');
      let clockinmonth: any = this.datepipe.transform(this.clockinDateview, 'MM');
      let clockindays: any = this.datepipe.transform(this.clockinDateview, 'dd');
      let clockinhours = this.ClockinMeridian == "PM" ? parseInt(this.clockinHours) + 12 : this.clockinHours;
      this.clockInDate = new Date(clockinyear, clockinmonth - 1, clockindays, clockinhours, this.clockinMinutes)
      let clockoutyear: any = this.datepipe.transform(this.clockOutDateview, 'yyyy');
      let clockoutmonth: any = this.datepipe.transform(this.clockOutDateview, 'MM');
      let clockoutdays: any = this.datepipe.transform(this.clockOutDateview, 'dd');
      let clockouthours = this.ClockoutMeridian == "PM" ? parseInt(this.clockoutHours) + 12 : this.clockoutHours;
      this.clockOutDate = new Date(clockoutyear, clockoutmonth - 1, clockoutdays, clockouthours, this.clockoutMinutes)
      // let ieDate=new Date( year,month-1,days,clockinhours,this.clockinMinutes);
      console.log("clockin schedule", this.clockInDate, 'clockout schedule', this.clockOutDate,)
      var differnce = (((this.clockOutDate - this.clockInDate) / 1000) / 60) / 60;
      if ((this.datepipe.transform(this.clockInDate, 'MM/dd/yyyy') == this.datepipe.transform(this.clockInDateAndTime, 'MM/dd/yyyy')) && this.datepipe.transform(this.clockInDate, 'HH:mm') == this.datepipe.transform(this.clockInDateAndTime, 'HH:mm')) {
        this.clockinChangeFlag = false;
      }
      else {
        this.clockinChangeFlag = this.arrivalAdjReasonId == 0 ? true : false;
        if (this.arrivalAdjReasonId == 0) {
          this.clockinChangeFlag = true;
          swal.fire({
            text: "There is a change in the Clock In, please select the adjust reason",
            icon: "warning",
            confirmButtonText: 'OK',
            allowOutsideClick: true
          })
        }
      }
      if ((this.datepipe.transform(this.clockOutDate, 'MM/dd/yyyy') == this.datepipe.transform(this.clockOutDateAndTime, 'MM/dd/yyyy')) && this.datepipe.transform(this.clockOutDate, 'HH:mm') == this.datepipe.transform(this.clockOutDateAndTime, 'HH:mm')) {
        // console.log("clockout not changed")
        this.clockoutChangeFlag = false;
      }
      else {
        console.log(" changed")
        this.clockoutChangeFlag = this.departureAdjReasonId == 0 ? true : false;
        if (this.departureAdjReasonId == 0) {
          swal.fire({
            text: "There is a change in the Clock Out, please select the adjust reason",
            icon: "warning",
            confirmButtonText: 'OK',
            allowOutsideClick: true
          })
        }
      }
      // console.log(this.clockinChangeFlag,this.clockoutChangeFlag);
      if (this.clockoutChangeFlag == false && this.clockinChangeFlag == false) {
        if (this.clockInDate <= this.clockOutDate) {
          if (differnce > 24 || differnce < 0) {
            console.log("date range should be 24 hrs")
            swal.fire({
              text: " Duration Between ClockIn and clock Out should not more than 24 hrs",
              icon: "warning",
              confirmButtonText: 'OK',
              allowOutsideClick: true
            })
          } else {
            this.updateReportedTimes();
          }



        }
        else {
          console.log("arrival should be before departure")
          swal.fire({
            text: " Clock In Date Time should be before Clock Out Date Time",
            icon: "warning",
            confirmButtonText: 'OK',
            allowOutsideClick: true
          })
        }


      }

    }
    else {
      if (this.clockinDateview == undefined) {
        // swal.fire('Invalid Date','clockIn Date Should valid ','warning');
        swal.fire({
          text: " clockIn Date Should valid",
          icon: "warning",
          confirmButtonText: 'OK',
          allowOutsideClick: true
        })
      }
      if (this.clockOutDateview == undefined) {
        swal.fire({
          text: " clockIn Date Should valid",
          icon: "warning",
          confirmButtonText: 'OK',
          allowOutsideClick: true
        })
      } if (this.clockinMinutes == undefined) {
        swal.fire({
          text: " clockIn Minutes Should be Select",
          icon: "warning",
          confirmButtonText: 'OK',
          allowOutsideClick: true
        })
      } if (this.clockoutMinutes == undefined) {
        swal.fire({
          text: " clockOut Minutes Should be Select",
          icon: "warning",
          confirmButtonText: 'OK',
          allowOutsideClick: true
        })
      } if (this.clockinHours == undefined) {
        swal.fire({
          text: " clockIn Hours Should be Select",
          icon: "warning",
          confirmButtonText: 'OK',
          allowOutsideClick: true
        })
      } if (this.clockoutHours == undefined) {
        swal.fire({
          text: " clockOut Minute Should be Select",
          icon: "warning",
          confirmButtonText: 'OK',
          allowOutsideClick: true
        })
      }
    }
  }



  public datetime() {
    this.clockInDate = this.datepipe.transform(this.clockOutDate, 'MM/dd/yyyy') + ' ' + '04:30 am'

    this.exampleDate.setDate()
    this.exampleDate.setHours(4);
    this.exampleDate.setMinutes(30);

    // clockin+' '+'04:30 am'
    console.log(this.clockInDate);
    var differnce = (((this.exampleDate - this.clockOutDate) / 1000) / 60) / 60;


    console.log(this.exampleDate - this.exampleDate);
  }

  public dropdown() {

  }

}
