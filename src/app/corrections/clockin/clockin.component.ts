import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clockin',
  templateUrl: './clockin.component.html',
  styleUrls: ['./clockin.component.sass']
})
export class ClockinComponent implements OnInit {

  constructor(public datepipe: DatePipe, public apiservice: ApiserviceService, public bsmodelRef: BsModalRef) { }
  userId;
  public psName: string;
  public DcsName: string;
  public procedureCode: string;
  public scheduleStartDate: string;
  public scheduleEndDate: string;
  public scheduleStartTime: any;
  public scheduleEndTime: string;
  public JsonData: any;
  // public userId: number = 1164;
  public unLinkedArrivalDepartureList: Array<any> = [];
  public getResponseData: any;
  public createresponseData: any;

  public templateStartdateseconds;
  public templatedEnddateseconds;
  public linkedArrivalDepartureId: number;
  public unLinkedArrivalDepartureId: number;
  public travelTime: number;
  public mileage: number;
  public manualDate: any;
  public manualTime;
  public manualmileage: number;
  public manualinput = true;
  public savebutton = true;
  public useraccount: any;
  public templatebeginDate: Date;
  public templateendDate: Date;
  public defaultinput: boolean = true;
  public mytime: Date = new Date()
  public linkarrivaldate

  public hours: Array<any> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public minutes: Array<any> = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
  public meridian: Array<any> = ['AM', 'PM']

  public manualhours: string;
  public manualminutes: string;
  public manualmeridian: string;
  public manualtraveltime: number;
  private scheduledReportedMapId: number;


  conditiondate: string;

  public ngOnInit(): void {
    this.displayData();
    this.getUnLinkedArrivalDeparture();

  }

  public displayData() {

    var userlist = localStorage.getItem('userlist');
    this.JsonData = JSON.parse(userlist);
    console.log(this.JsonData)
    var useraccount = sessionStorage.getItem('useraccount');
    this.useraccount = JSON.parse(useraccount);
    this.userId = this.useraccount.userId;
    this.DcsName = this.JsonData.dcsName;
    this.psName = this.JsonData.psName;
    this.procedureCode = this.JsonData.procedureCode;
    this.scheduleStartDate = this.JsonData.scheduledBeginDateTime
    //  this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'MM/dd/yyyy');
    // this.scheduleStartTime = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'shortTime');
    this.scheduleEndDate = this.JsonData.scheduledEndDateTime;
    // this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'MM/dd/yyyy');
    // this.scheduleEndTime = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'shortTime');
    this.linkedArrivalDepartureId = this.JsonData.arrivalDepartureId;
    this.manualDate = this.JsonData.scheduledBeginDateTime;
    this.manualhours = this.datepipe.transform(this.scheduleStartDate, 'hh');
    this.manualminutes = this.datepipe.transform(this.scheduleStartDate, 'mm');
    this.manualmeridian = this.datepipe.transform(this.scheduleStartDate, 'a')


  }

  public getUnLinkedArrivalDeparture() {
    var jsonObj = { "vsistDetailsId": this.JsonData.visitDetailsId, "psId": this.JsonData.psId, "dcsId": this.JsonData.dcsId, "serviceId": this.JsonData.serviceId, "officeId": this.JsonData.officeId, "userId": this.userId, "visitDate": this.scheduleStartDate, "txnFlag": "ARRIVAL" }
    var parameters = JSON.stringify(jsonObj);
    console.log(parameters);
    try {
      this.apiservice.getUnLinkedArrivalDeparture(parameters).subscribe(
        response => {
          console.log(response);
          this.getResponseData = response;
          this.unLinkedArrivalDepartureList = this.getResponseData.unLinkedArrivalDepartureList;
          this.templatebeginDate = new Date(this.getResponseData.scheduleBeginDate);
          this.templateendDate = new Date(this.getResponseData.scheduleEndDate);
          this.templateStartdateseconds = Date.parse(this.getResponseData.scheduleBeginDate);
          this.templatedEnddateseconds = Date.parse(this.getResponseData.scheduleEndDate)

        }, error => {
          console.log(error);
        }
      )
    }
    catch (error) {
      console.log(error);
    }
  }

  public createArrivalDeparture() {

    var manualDate = this.datepipe.transform(this.manualDate, 'MM/dd/yyyy');
    var arrivalDateTime = manualDate + " " + this.manualhours + ":" + this.manualminutes + " " + this.manualmeridian;
    this.manualtraveltime = this.manualtraveltime == undefined || null || '' ? 0 : this.manualtraveltime;
    this.manualmileage = this.manualmileage == undefined || null || '' ? 0 : this.manualmileage;
    var manualObj = { "scheduledBeginDateTime": this.JsonData.scheduledBeginDateTime, "scheduledEndDateTime": this.JsonData.scheduledBeginDateTime, "visitDetailsId": this.JsonData.visitDetailsId, "unLinkedArrivalDepartureId": 0, "linkedArrivalDepartureId": 0, "txnType": "", "psId": this.JsonData.psId, "dcsId": this.JsonData.dcsId, "serviceId": this.JsonData.serviceId, "officeId": this.JsonData.officeId, "arrivalDateTime": arrivalDateTime, "departureDateTime": " ", "mileage": this.manualmileage, "traveltime": this.manualtraveltime, "userId": this.userId }
    var linkobj = { "scheduledBeginDateTime": this.JsonData.scheduledBeginDateTime, "scheduledEndDateTime": this.JsonData.scheduledEndDateTime, "visitDetailsId": this.JsonData.visitDetailsId, "unLinkedArrivalDepartureId": this.unLinkedArrivalDepartureId, "linkedArrivalDepartureId": this.linkedArrivalDepartureId, "txnType": "ARRIVAL", "psId": 0, "dcsId": 0, "serviceId": 0, "officeId": this.JsonData.officeId, "arrivalDateTime": "", "departureDateTime": "", "mileage": this.mileage, "traveltime": 0, "userId": this.userId }
    var jsonObj = this.manualinput ? manualObj : linkobj;
    var parameters = JSON.stringify(jsonObj);
    console.log(parameters);
    try {
      this.apiservice.createArrivalDeparture(parameters).subscribe(
        response => {
          console.log(response);
          var response2 = JSON.stringify(response);
          this.createresponseData = response;
          // alert(response2);
          if (this.createresponseData.validtaeFlag == 0) {
            // this.apiservice.updateTable.next(true);
            // this.bsmodelRef.hide();
            swal.fire({
              title: 'Data Saved Successfully',
              icon: 'success',
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then(Ok => {
              this.apiservice.updateTable.next(true);
              this.bsmodelRef.hide();

            })

          } else {
            swal.fire({
              title: 'Invalid attempt',
              text: 'This Visit is already Reported',
              icon: 'error',
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



  public manualSave(): void {
    this.savebutton = false;
    this.manualinput = true;
    console.log("manual is working");
  }

  public linkIn(link): void {
    this.savebutton = false;
    this.manualinput = false;
    console.log("link in working", link);
    this.unLinkedArrivalDepartureId = link.arrivalDepartureId;
    this.scheduledReportedMapId = this.JsonData.arrivalDepartureId == 0 ? link.scheduledReportedMapId : 0;
    console.log(this.scheduledReportedMapId)
    this.mileage = link.mileage;
    this.travelTime = link.travelTime;
    this.linkarrivaldate = Date.parse(link.arrivalAdjustedTime);


  }

  public validation() {

    console.log(this.manualmileage)

    let manualentry = this.datepipe.transform(this.manualDate, 'MM/dd/yyyy') + ' ' + this.manualhours + ":" + this.manualminutes + " " + this.manualmeridian;
    let manualDateseconds = Date.parse(this.datepipe.transform(this.manualDate, 'MM/dd/yyyy'))
    let manualseconds = Date.parse(manualentry);
    let departureseconds = Date.parse(this.JsonData.departureDateTime);
    let dateBeforeFlag: boolean = manualseconds > departureseconds ? true : false;
    let dateFlag: boolean = false;
    let mileageFlag: boolean = false;
    let differnce = (((departureseconds - manualseconds) / 1000) / 60) / 60;
    let differnceFlag = differnce <= 24 && differnce >= 0 ? false : true;
    let todaysDate: any = new Date();
    let todayseconds = Date.parse(todaysDate);
    let todayflag = false;

    // console.log(departureseconds,manualseconds,new Date(manualseconds))

    // console.log("manualsecomds",manualseconds)
    // console.log('templastartsec',this.templateStartdateseconds)
    console.log('departure', manualseconds > departureseconds, differnce)

    console.log("datebefore flag", this.JsonData.departureDateTime, this.manualDate, dateBeforeFlag, differnceFlag, differnce);

    if (this.manualDate == undefined || null) {
      dateFlag = true;
      this.alertbox('Invalid Date', 'Arrival Date and Time cannot be Empty');
    }
    else {
      dateFlag = false;

      if (manualDateseconds >= this.templateStartdateseconds && manualDateseconds <= this.templatedEnddateseconds) {

        // console.log(this.manualDate);
        if (manualDateseconds > todayseconds) {
          todayflag = true;
          this.alertbox('Invalid Arrival', 'Arrival Date time should not be greater than current Date');
        }

        if ((this.manualmileage >= 0 && this.manualmileage <= 999.99) || this.manualmileage == undefined) {
          mileageFlag = false;
        }
        else {
          mileageFlag = true;
          this.alertbox('Invalid Arrival Mileage', 'Arrival Mileage should between [0-999.99] ');
        }
        if (dateBeforeFlag == true) {
          this.alertbox('Invalid Arrival', 'Arrival Date should be less then ' + this.JsonData.departureDateTime)
        }
        else {
          dateBeforeFlag = false;
          if (differnceFlag == true) {
            this.alertbox('Invalid Arrival', 'Arrival Date Time and Departure Date Time must be in 24 hours Time Span"')
          }
        }


        if (dateFlag == false && mileageFlag == false && dateBeforeFlag == false && differnceFlag == false && todayflag == false) {
          this.createArrivalDeparture();
        }

      }
      else {
        this.alertbox('Invalid Entry', 'Arrival  Date time should be in between template start date' + this.datepipe.transform(this.templatebeginDate, 'MM/dd/yyyy') + ' and template end date ' + this.datepipe.transform(this.templateendDate, 'MM/dd/yyyy'))
      }

    }
  }
  public alertbox(message, string) {
    swal.fire(message, string, 'warning')
  }
  public linkValidation() {
    var departureseconds = Date.parse(this.JsonData.departureDateTime);
    var differnce = (((departureseconds - this.linkarrivaldate) / 1000) / 60) / 60;

    if (this.linkarrivaldate >= this.templateStartdateseconds && this.linkarrivaldate <= this.templatedEnddateseconds) {
      // console.log(departureseconds > this.linkarrivaldate, differnce <= 24, differnce >= 0)
      console.log("+++++++++++++++", this.JsonData.departureDateTime.length)

      // if(this.JsonData.departureDateTime !='""'||this.JsonData.departureDateTime!=undefined||this.JsonData.departureDateTime!=null)
      if (this.JsonData.departureDateTime.length > 0) {
        if (departureseconds > this.linkarrivaldate && (differnce <= 24 && differnce >= 0)) {

          this.createArrivalDeparture();
        }
        else {
          this.alertbox('Invalid Link', "Cannot link as Arrival Date/Time is greater than or equal to Departure Date/Time " + this.JsonData.departureDateTime)

        }
      } else {
        this.createArrivalDeparture();
      }

    }
    else {
      this.alertbox('Invalid Link', 'Arrival  Date time should be in between template start date' + this.datepipe.transform(this.templatebeginDate, 'MM/dd/yyyy') + ' and template end date ' + this.datepipe.transform(this.templateendDate, 'MM/dd/yyyy'))

    }
  }
}
