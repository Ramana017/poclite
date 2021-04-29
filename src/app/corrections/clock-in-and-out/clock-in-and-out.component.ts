import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe, Time } from '@angular/common';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import swal from 'sweetalert2'

@Component({
  selector: 'app-clock-in-and-out',
  templateUrl: './clock-in-and-out.component.html',
  styleUrls: ['./clock-in-and-out.component.sass']
})
export class ClockInAndOutComponent implements OnInit {

  constructor(public datepipe: DatePipe, public apiservice: ApiserviceService, public bsmodelRef: BsModalRef, public timepicker: TimepickerConfig) { }
  userId
  public psName: string;
  public DcsName: string;
  public procedureCode: string;
  public scheduleStartDate: string;
  public scheduleEndDate: string;
  public scheduleStartTime: string;
  public scheduleEndTime: string;
  public JsonData: any;
  public getResponseData: any;
  public createresponseData: any;

  public unLinkedPunchesList: Array<any> = [];

  public scheduledReportedMapId: number;
  public scheduledBeginDateTime: string;
  public scheduledEndDateTime: string;
  public txnType: string;
  public traveltime: number;
  public arrivalMileage: number;
  public departureMileage: number;

  public linkBUtton: boolean = false;
  public saveButton = true;
  public editTravelTimePriv: boolean = true;

  public manualArrivalDate: any;
  public manualArrivalhrs: Time;
  public manualArrivalminutes: string;
  public manualdepartureDate: any;
  public manualDeparturehrs: string;
  public manualDepurtereminutes: string;
  public manualArrivalMileage: any = 0;
  public manualDepartureMileage: any = 0;
  public manualTravelTime: any = 0;
  public useraccount: any;
  public todayDate: Date = new Date()
  manualbutton = true;

  public templateStartDate: Date;
  public templateEndDate: Date;

  public linkarrival: any;
  public linkdeparturar: any;

  public hours: Array<any> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public minutes: Array<any> = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
  public meridian: Array<any> = ['AM', 'PM']

  public manualClockInHours: string;
  public manualClockInMinutes: string;
  public manualClockInMeridian: string;
  public manualClockOutHours: string;
  public manualClockOutminutes: string;
  public manualClockOutMeridian: string;
  public templatestartsconds: number;
  public templatendseconds: number;

  public linkarrivaladjust;
  public linkdepartureadjust;



  ngOnInit(): void {
    this.displayData();
    this.getUnLinkedPunches();
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
    this.scheduleStartDate = this.JsonData.scheduledBeginDateTime;
    //  this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'MM/dd/yyyy');
    // this.scheduleStartTime = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'shortTime');
    this.scheduleEndDate = this.JsonData.scheduledEndDateTime;
    //  this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'MM/dd/yyyy');
    // this.scheduleEndTime = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'shortTime');
    this.manualArrivalDate = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'MM/dd/yyyy');
    this.manualdepartureDate = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'MM/dd/yyyy');
    this.manualClockInHours = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'hh');
    this.manualClockInMinutes = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'mm');
    this.manualClockInMeridian = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'a');
    this.manualClockOutHours = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'hh')
    this.manualClockOutminutes = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'mm')
    this.manualClockOutMeridian = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'a')
    // console.log("**********",this.JsonData.arrivalDateTime)

  }

  public getUnLinkedPunches() {
    var jsonObj = { "vsistDetailsId": this.JsonData.visitDetailsId, "psId": this.JsonData.psId, "dcsId": this.JsonData.dcsId, "serviceId": this.JsonData.serviceId, "officeId": this.JsonData.officeId, "userId": this.userId, "visitDate": this.JsonData.scheduledBeginDateTime }
    var parameters = JSON.stringify(jsonObj);
    console.log(parameters);
    try {
      this.apiservice.getUnLinkedPunches(parameters).subscribe(
        response => {
          console.log(response);
          this.getResponseData = response;
          this.unLinkedPunchesList = this.getResponseData.unLinkedPunchesList;
          if (this.getResponseData.editTravelTimePriv == 1) {
            this.editTravelTimePriv = false;
          }
          this.templateStartDate = new Date(this.getResponseData.scheduleBeginDate);
          this.templateEndDate = new Date(this.getResponseData.scheduleEndDate);
          this.templatestartsconds = Date.parse(this.getResponseData.scheduleBeginDate);
          this.templatendseconds = Date.parse(this.getResponseData.scheduleEndDate)
        }
      )
    }
    catch (error) {
      console.log(error);
    }
  }

  public createPunchForSchedule() {
    console.log()
    let manualDepartureMileage=this.manualDepartureMileage==''||null||undefined? 0:this.manualDepartureMileage;
    let manualArrivalMileage=this.manualArrivalMileage==''||null||undefined?0:this.manualArrivalMileage;
    let manualTravelTime=this.manualTravelTime==""||null||undefined?0:this.manualTravelTime;
    let manualarrivaldatetime =   this.datepipe.transform(this.manualArrivalDate, 'MM/dd/yyyy') + " " + this.manualClockInHours + ":" + this.manualClockInMinutes + " " + this.manualClockInMeridian
    let manualdepaturedatetime =  this.datepipe.transform(this.manualdepartureDate, 'MM/dd/yyyy') + " " + this.manualClockOutHours + ":" + this.manualClockOutminutes + " " + this.manualClockOutMeridian
    var linkJson = {
      "scheduledBeginDateTime": this.JsonData.scheduledBeginDateTime, "scheduledEndDateTime": this.JsonData.scheduledEndDateTime, "scheduleReportedMapId": this.scheduledReportedMapId,
      "visitDetailsId": this.JsonData.visitDetailsId, "txnType": this.txnType, "psId": 0, "dcsId": 0, "serviceId": 0, "arrivalDateTime": "",
      "departureDateTime": "", "arrivalMileage": 0, "traveltime": 0, "departureMileage": 0, "officeId": 0, "userId": this.userId
    };
    var manualJson = {
      "scheduledBeginDateTime": this.JsonData.scheduledBeginDateTime,
      "scheduledEndDateTime": this.JsonData.scheduledEndDateTime,
      "scheduleReportedMapId": 0,
      "visitDetailsId": this.JsonData.visitDetailsId,
      "txnType": "",
      "psId": this.JsonData.psId,
      "dcsId": this.JsonData.dcsId,
      "serviceId": this.JsonData.serviceId,
      "arrivalDateTime": manualarrivaldatetime,
      "departureDateTime": manualdepaturedatetime,
      "arrivalMileage": manualArrivalMileage,
      "traveltime": 0,
      "departureMileage": manualDepartureMileage,
      "officeId": this.JsonData.officeId,
      "userId": this.userId
    }

    var jsonObj = this.saveButton ? manualJson : linkJson
    var parameters = JSON.stringify(jsonObj)
    console.log(parameters);
    try {
      this.apiservice.createPunchForSchedule(parameters).subscribe(
        response => {
          console.log(response);
          this.createresponseData = response;
          {
            if (this.createresponseData.validtaeFlag == 0) {

              swal.fire({
                title: 'Data Saved Successfully',
                icon: 'success',
                confirmButtonText: 'OK',
                allowOutsideClick: false
              }).then(OK => {
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

  public linkPunch(link) {
    console.log("link punch", link);
    this.saveButton = false;
    this.linkBUtton = true;
    this.scheduledReportedMapId = link.scheduledReportedMapId;
    this.traveltime = link.traveltime
    this.arrivalMileage = link.arrivalMileage
    this.departureMileage = link.departureMileage
    var arrivalAdjustedTime = link.arrivalAdjustedTime;
    var departureAdjustedTime = link.departureAdjustedTime;
    this.linkarrivaladjust=link.arrivalAdjustedTime;
    this.linkdepartureadjust=link.departureAdjustedTime;

    if ((departureAdjustedTime == null || undefined) && (arrivalAdjustedTime != null || undefined)) {
      this.txnType = "DEPARTURE";
      console.log(this.txnType);
    }
    if ((arrivalAdjustedTime == null || undefined) && (departureAdjustedTime != null || undefined)) {
      this.txnType = "ARRIVAL";
      console.log(this.txnType)
    }
    if ((arrivalAdjustedTime != null || undefined) && (departureAdjustedTime != null || undefined)) {
      this.txnType = "ARRIVAL";
      console.log(this.txnType);
    }

    this.linkarrival = link.arrivalAdjustedTime;
    this.linkdeparturar = link.departureAdjustedTime;
    // this.validateLink();

  }
  public manuallink() {
    this.linkBUtton = false;
    this.saveButton = true;
  }



  public validation() {

    console.log("manuamileage", typeof (this.manualArrivalMileage), "departuremileage" + this.manualDepartureMileage, "traveltime" + this.manualTravelTime);

    // console.log(this.manualArrivalDate >= this.templateStartDate, this.manualArrivalDate <= this.templateEndDate, this.manualdepartureDate >= this.templateStartDate, this.manualdepartureDate <= this.templateEndDate)
    // console.log(this.manualArrivalDate >= this.templateStartDate && this.manualArrivalDate <= this.templateEndDate && this.manualdepartureDate >= this.templateStartDate && this.manualdepartureDate <= this.templateEndDate)
    let manualarrivalDateseconds = Date.parse(this.datepipe.transform(this.manualArrivalDate, 'MM/dd/yyyy'));
    let manualdepartureDateseconds = Date.parse(this.datepipe.transform(this.manualdepartureDate, 'MM/dd/yyyy'));

    let manualclockin =  this.datepipe.transform(this.manualArrivalDate, 'MM/dd/yyyy') + " " + this.manualClockInHours + ":" + this.manualClockInMinutes + " " + this.manualClockInMeridian
    let manualclockout =  this.datepipe.transform(this.manualdepartureDate, 'MM/dd/yyyy') + " " + this.manualClockOutHours + ":" + this.manualClockOutminutes + " " + this.manualClockOutMeridian
    let manualclockinseconds = Date.parse(manualclockin);
    let manualclockoutseconds = Date.parse(manualclockout);






    if (manualarrivalDateseconds >= this.templatestartsconds && manualarrivalDateseconds <= this.templatendseconds && manualdepartureDateseconds >= this.templatestartsconds && manualdepartureDateseconds <= this.templatendseconds) {



      var differnce = (((manualclockoutseconds - manualclockinseconds) / 1000) / 60) / 60;


      var traveltimeFlag: boolean = false;
      var arrivalmileageFlag: boolean = false;
      var departuremileageFlag: boolean = false;
      let todayFlag:boolean=false;
      let todayDate:any=new Date();
      let todayseconds=Date.parse(todayDate);
      var arrsmallflag: boolean = manualclockinseconds > manualclockoutseconds ? true : false;
      var timespanFlag: boolean = differnce < 0 || differnce > 24 ? true : false;

      if(manualclockinseconds>todayseconds){
        todayFlag = true;
        this.alertbox('Invalid Clock In', 'Clock In Date time should not be greater than current Date');
      }
      if(manualclockoutseconds>todayseconds){
        todayFlag = true;
        this.alertbox('Invalid Clock Out', 'Clock Out Date time should not be greater than current Date');
      }
      if (this.manualTravelTime >= 0) {
        traveltimeFlag = false;
      }
      else {
        traveltimeFlag = true;
        this.alertbox('Invalid Travel Time', ' Travel Time cannot be greater than are equal to 0');
      }
      if ((this.manualArrivalMileage >= 0 && this.manualArrivalMileage < 999.990)||this.manualArrivalMileage==undefined) {
        arrivalmileageFlag = false;

      }
      else {
        arrivalmileageFlag = true;
        this.alertbox('Invalid Clock In Mileage', 'Clock In Mileage should between [0-999.99] ');
      }
      if ((this.manualDepartureMileage >= 0 && this.manualDepartureMileage < 999.99) || this.manualDepartureMileage==undefined) {
        departuremileageFlag = false;

      } else {
        console.log("+++++++++")
        departuremileageFlag = true;
        this.alertbox('Invalid Clock Out Mileage', 'Mileage Value should between  [0-999.99]')
      }
      if (timespanFlag == true) {
        this.alertbox('Invalid Time', 'Clock In Date Time and Clock Out Date Time must be in 24 hours Time Span');
      }

      if (manualclockinseconds > manualclockoutseconds) {
        arrsmallflag = true;
        this.alertbox('Invalid Entry', 'Clock In Date Time should always before Clock Out Date Time')

      }
      else {
        arrsmallflag = false;
      }
      // console.log(traveltimeFlag == false && arrsmallflag == false && arrivalmileageFlag == false && departuremileageFlag == false && timespanFlag == false)
      if (traveltimeFlag == false && arrsmallflag == false && arrivalmileageFlag == false && departuremileageFlag == false && timespanFlag == false && todayFlag==false ) {
        this.createPunchForSchedule()
      }
    } else {
      if ((manualarrivalDateseconds <= this.templatestartsconds || manualarrivalDateseconds >= this.templatendseconds) && (manualdepartureDateseconds <= this.templatestartsconds || manualdepartureDateseconds >= this.templatendseconds)) {
        this.alertbox('Invalid Entry', " Clock In and Clock Out Date should between Template Start Date " + this.datepipe.transform(this.templateStartDate, 'MM/dd/yyyy') + '  and Template End Date ' + this.datepipe.transform(this.templateEndDate, 'MM/dd/yyyy'))

      }

      else if (manualarrivalDateseconds <= this.templatestartsconds || manualarrivalDateseconds >= this.templatendseconds) {
        this.alertbox('Invalid Clock In', " Clock In Date time should be in between Template Start Date"+ this.datepipe.transform(this.templateStartDate, 'MM/dd/yyyy')+ " and Template End Date "  +  this.datepipe.transform(this.templateEndDate, 'MM/dd/yyyy'));
      }
      else if (manualdepartureDateseconds <= this.templatestartsconds || manualdepartureDateseconds >= this.templatendseconds) {
        this.alertbox('Invalid Clock Out','Clock Out Date time should be between Template Start Date '+  this.datepipe.transform(this.templateStartDate, 'MM/dd/yyyy')+ " and Template End Date "  +  this.datepipe.transform(this.templateEndDate, 'MM/dd/yyyy'));
      }





    }
  }

  public alertbox(message, string) {
    swal.fire(message, string, 'warning')
  }

  public validateLink() {

    if((this.linkarrivaladjust==null||undefined)||this.linkdepartureadjust==null||undefined){
   this.createPunchForSchedule();
    }
    else{

    var linkarraivalseconds = Date.parse(this.linkarrival);
    var linkdeparturar = Date.parse(this.linkdeparturar);
    // console.log(linkarraivalseconds < linkdeparturar)
    console.log("Link arrival", linkarraivalseconds, this.linkarrival)
    console.log("link departure", this.linkdeparturar)


    var differnce = (((linkdeparturar - linkarraivalseconds) / 1000) / 60) / 60;

    console.log(differnce)
    console.log(linkarraivalseconds < linkdeparturar && differnce <= 24 && differnce >= 0)

    if(linkdeparturar>=this.templatestartsconds&&linkdeparturar<=this.templatendseconds && linkarraivalseconds>=this.templatestartsconds&&linkarraivalseconds<=this.templatendseconds){

    if (linkarraivalseconds <= linkdeparturar && differnce <= 24 && differnce >= 0) {
      this.createPunchForSchedule();
    }
    else{
      if(linkarraivalseconds<=linkdeparturar)
      {
        this.alertbox('Invalid Link','Clock In Cannot be lessthan Clock Out')
      }
    }}
    else{
      this.alertbox('Invalid Link',' Clock In and Clock Out Date time should be in between template start date'+this.templateStartDate+" and template end date "+this.templateEndDate);
    }
  }

  }
}
