import { Component, OnInit } from '@angular/core';
import { DatePipe, Time } from '@angular/common';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clockout',
  templateUrl: './clockout.component.html',
  styleUrls: ['./clockout.component.sass']
})
export class ClockoutComponent implements OnInit {

  public psName: string;
  public DcsName: string;
  public procedureCode: string;
  public scheduleStartDate: string;
  public scheduleEndDate: string;
  public scheduleStartTime: string;
  public scheduleEndTime: string;
  public JsonData: any;
  // public userId: number = 1164;
  public unLinkedArrivalDepartureList: Array<any> = [];
  public getResponseData: any;
  public createresponseData: any;

  //create function variables
  public unLinkedArrivalDepartureId: number;
  public linkedArrivalDepartureId: number;
  public travelTime: number;
  public mileage: number;
  public manualDate: any;
  public manualTime;
  public manualmileage: number;
  public manualinput = true;
  public savebutton = true;
  public useraccount: any;
  public userId: number;
  public templatebeginDate: Date;
  public templateendDate: Date;
  public templateStartdateseconds;
  public templatedEnddateseconds;
  public defaultinput: boolean = true;
  public linkdepartureDate;


  public hours: Array<any> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public minutes: Array<any> = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
  public meridian: Array<any> = ['AM', 'PM']

  public manualhours: string;
  public manualminutes: string;
  public manualmeridian: string;

  // mytime: Date = new Date()


  constructor(public datepipe: DatePipe, public apiservice: ApiserviceService, public bsmodelRef: BsModalRef) { }

  ngOnInit(): void {

    console.log("clockout component called");
    this.displayData();
    this.getUnLinkedArrivalDeparture();
  }
  public displayData() {

    var userlist = localStorage.getItem('userlist');
    var useraccount = sessionStorage.getItem('useraccount');
    this.useraccount = JSON.parse(useraccount);
    this.userId = this.useraccount.userId;
    this.JsonData = JSON.parse(userlist);
    console.log(this.JsonData)
    this.DcsName = this.JsonData.dcsName;
    this.psName = this.JsonData.psName;
    this.procedureCode = this.JsonData.procedureCode;
    this.scheduleStartDate = this.JsonData.scheduledBeginDateTime;
    //  this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'MM/dd/yyyy');
    // this.scheduleStartTime = this.datepipe.transform(this.JsonData.scheduledBeginDateTime, 'shortTime');
    this.scheduleEndDate = this.JsonData.scheduledEndDateTime;
    // this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'MM/dd/yyyy');
    // this.scheduleEndTime = this.datepipe.transform(this.JsonData.scheduledEndDateTime, 'shortTime');
    this.manualDate = this.datepipe.transform(this.scheduleEndDate, 'MM/dd/yyyy')
    this.manualhours = this.datepipe.transform(this.scheduleEndDate, 'hh');
    this.manualminutes = this.datepipe.transform(this.scheduleEndDate, 'mm');
    this.manualmeridian = this.datepipe.transform(this.scheduleEndDate, 'a')
    this.linkedArrivalDepartureId = this.JsonData.arrivalDepartureId;
  }

  public getUnLinkedArrivalDeparture() {
    var jsonObj = { "vsistDetailsId": this.JsonData.visitDetailsId, "psId": this.JsonData.psId, "dcsId": this.JsonData.dcsId, "serviceId": this.JsonData.serviceId, "officeId": this.JsonData.officeId, "userId": this.userId, "visitDate": this.scheduleStartDate, "txnFlag": "DEPARTURE" }
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
    var departureDateTime = manualDate + " " + this.manualhours+":"+this.manualminutes+" "+this.manualmeridian;
    this.manualmileage=this.manualmileage==undefined||null||''?0:this.manualmileage;
    var manualObj = { "scheduledBeginDateTime": this.JsonData.scheduledBeginDateTime, "scheduledEndDateTime": this.JsonData.scheduledBeginDateTime, "visitDetailsId": this.JsonData.visitDetailsId, "unLinkedArrivalDepartureId": 0, "linkedArrivalDepartureId": 0, "txnType": "", "psId": this.JsonData.psId, "dcsId": this.JsonData.dcsId, "serviceId": this.JsonData.serviceId, "officeId": this.JsonData.officeId, "arrivalDateTime": "", "departureDateTime": departureDateTime, "mileage": this.manualmileage, "traveltime": 0, "userId": this.userId }
    var linkobj = { "scheduledBeginDateTime": this.JsonData.scheduledBeginDateTime, "scheduledEndDateTime": this.JsonData.scheduledEndDateTime, "visitDetailsId": this.JsonData.visitDetailsId, "unLinkedArrivalDepartureId": this.unLinkedArrivalDepartureId, "linkedArrivalDepartureId": this.linkedArrivalDepartureId, "txnType": "DEPARTURE", "psId": 0, "dcsId": 0, "serviceId": 0, "officeId": this.JsonData.officeId, "arrivalDateTime": "", "departureDateTime": "", "mileage": this.mileage, "traveltime": this.travelTime, "userId": this.userId }
    var jsonObj = this.manualinput ? manualObj : linkobj;
    var parameters = JSON.stringify(jsonObj);
    console.log(parameters);
    try {
      this.apiservice.createArrivalDeparture(parameters).subscribe(
        response => {
          console.log(response);
          var response2 = JSON.stringify(response);
          this.createresponseData = response;
          if (this.createresponseData.validtaeFlag == 0) {

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
    this.mileage = link.mileage;
    this.travelTime = link.travelTime;
    this.linkdepartureDate = Date.parse(link.departureAdjustedTime);


  }

  public validation() {

    console.log("MILeage",this.manualmileage)

    let manualentry =  this.datepipe.transform(this.manualDate, 'MM/dd/yyyy') + ' ' + this.manualhours + ":" + this.manualminutes + " " + this.manualmeridian ;
    let manualDateseconds = Date.parse(this.datepipe.transform(this.manualDate, 'MM/dd/yyyy'));
    let manualseconds = Date.parse(manualentry);
    let arrivalseconds = Date.parse(this.JsonData.arrivalDateTime);
    let dateFlag: boolean = false;
    let mileageFlag: boolean = false;
    let dateafterFlag: boolean = manualseconds < arrivalseconds ? true : false;
    let differnce = (((manualseconds - arrivalseconds) / 1000) / 60) / 60;
    let differnceFlag =( differnce <= 24 && differnce >= 0) ? false : true;
    let todaysdate:any=new Date();
    let todaysseconds=Date.parse(todaysdate);
    let todayflag:boolean=false;


    if (this.manualDate == undefined || null) {
      dateFlag = true;
      this.alertbox('Invalid Departure', 'Departure Date and Time cannot be Empty');
    }
    else {
      dateFlag = false;
      if (manualDateseconds <= this.templatedEnddateseconds && manualDateseconds >= this.templateStartdateseconds) {

        if (manualDateseconds > todaysseconds) {
          todayflag = true;
          this.alertbox('Invalid Departure', 'Departure Date time should not be greater than current Date');
        }
        if ((this.manualmileage >= 0 && this.manualmileage <= 999.99) || this.manualmileage == undefined) {
          mileageFlag = false;
        }
        else {
          mileageFlag = true;
          this.alertbox('Invalid Departure Mileage', 'Mileage Value cannot  be  greater  than 999.99');
        }
        if (dateafterFlag == true) {
          this.alertbox('Invalid Departure', ' Departure Date should be After  ' + this.JsonData.arrivalDateTime)
        }
        else {
          dateafterFlag = false;
          if (differnceFlag == true) {
            this.alertbox('Invalid Departure', 'Arrival Date Time and Departure Date Time must be in 24 hours Time Span');
          }
        }

        if (dateFlag == false && mileageFlag == false && dateafterFlag == false && differnceFlag == false && todayflag==false) {
          this.createArrivalDeparture();
        }
      }
      else {
        this.alertbox('Invalid Departure', "Departure Date time should be in between template start date " + this.datepipe.transform(this.templatebeginDate, 'MM/dd/yyyy') + ' and template end date ' + this.datepipe.transform(this.templateendDate, 'MM/dd/yyyy'))
      }
    }
  }

  public linkValidation() {



    if (this.linkdepartureDate >= this.templateStartdateseconds && this.linkdepartureDate <= this.templatedEnddateseconds) {
      // if(this.JsonData.arrivalDateTime !='' ||this.JsonData.arrivalDateTime !=undefined||this.JsonData.arrivalDateTime !=null)
      if(this.JsonData.arrivalDateTime.length>0)
      {
        var arrivaleseconds = Date.parse(this.JsonData.arrivalDateTime)
        var differnce = (((this.linkdepartureDate - arrivaleseconds) / 1000) / 60) / 60;
        if ((arrivaleseconds <= this.linkdepartureDate && differnce <= 24 && differnce >= 0)) {
          this.createArrivalDeparture();
        }
        else {
          this.alertbox('Invalid Link', "Departure Date should After " + this.JsonData.arrivalDateTime)

        }
      }else{
        this.createArrivalDeparture();
      }


    }
    else {
      this.alertbox('Invalid Link', "Departure Date time should be in between template start date " + this.datepipe.transform(this.templatebeginDate, 'MM/dd/yyyy') + ' and template end date ' + this.datepipe.transform(this.templateendDate, 'MM/dd/yyyy'))

    }
  }
   public alertbox(message, string) {
    swal.fire(message, string, 'warning')
  }

}
