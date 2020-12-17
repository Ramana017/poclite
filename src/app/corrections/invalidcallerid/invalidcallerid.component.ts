import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';



@Component({
  selector: 'app-invalidcallerid',
  templateUrl: './invalidcallerid.component.html',
  styleUrls: ['./invalidcallerid.component.sass']
})
export class InvalidcalleridComponent implements OnInit {
  @Output()
  popupUpdate: EventEmitter<any> = new EventEmitter<any>();
  public psName: string;
  public DcsName: string;
  public procedureCode: string;
  public scheduleStartDate: string;
  public scheduleEndDate: string;
  public scheduleStartTime: string;
  public scheduleEndTime: string;
  public JsonData: any;
  public userId: number;
  public responseData: any;
  public updateresponseData: any;
  public clockInCallerID: number;
  public clockOutCallerId: number;
  public phoneTypelist: Array<any>;
  public psPhones;
  public phoneType1: string;
  public phoneType2: string;
  public phoneType3: string;
  public phone1: any;
  public phone2: any;
  public phone3: any;

  public arrInvalidErr: boolean = false;
  public depInvalidErr: boolean = false;
  public arrInvalidErrView: boolean = false;
  public depInvalidErrView: boolean = false;
  public useraccount: any;
  public clockInComments:string="";
  public clockOutComments:String="";
  public  clockInDCSPhoneType:string="";
  public clockOutDCSPhoneType:string='';

  constructor(public datepipe: DatePipe, private _apiService: ApiserviceService, public bsmodelRef: BsModalRef) { }

  ngOnInit(): void {
    console.log('invalid caller oninit working');
    this.displayData();
    this.getCallerIdExceptionData();

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
     // this.scheduleStartDate = this.datepipe.transform(this.jsonData.scheduledBeginDateTime, 'MM/dd/yyyy');
    // this.scheduleStartTime = this.datepipe.transform(this.jsonData.scheduledBeginDateTime, 'shortTime');
    // this.scheduleEndDate = this.datepipe.transform(this.jsonData.scheduledEndDateTime, 'MM/dd/yyyy');
    // this.scheduleEndTime = this.datepipe.transform(this.jsonData.scheduledEndDateTime, 'shortTime');
    this.scheduleStartDate=this.JsonData.scheduledBeginDateTime;
    this.scheduleEndDate=this.JsonData.scheduledEndDateTime;
    if (this.JsonData.arrCallerIdException == 1) {
      this.arrInvalidErr = true;
      this.arrInvalidErrView = true;
    }
    if (this.JsonData.depCallerIdException == 1) {
      this.depInvalidErr = true;
      this.depInvalidErrView = true;
    }
  }

  public getCallerIdExceptionData() {

    // {"psAddressId":22595,"arrivalId":863638,"departureId":815701,"arrCallerIdException":1,"depCallerIdException":1}

    let JsonData = {
      "psAddressId": this.JsonData.psAddressId, "arrivalId": this.JsonData.arrivalId, "departureId": this.JsonData.departureId,
      "arrCallerIdException": this.JsonData.arrCallerIdException, "depCallerIdException": this.JsonData.depCallerIdException
    }
    let parameters = JSON.stringify(JsonData);
    try {
      this._apiService.getCallerIdExceptionData(parameters).subscribe(
        response => {
          console.log(response)
          this.responseData = response;
          this.clockInCallerID = this.responseData.clockInCallerId;
          this.clockOutCallerId = this.responseData.clockOutCallerId;
          console.log(this.responseData.phoneTypeList)
          this.phoneTypelist = this.responseData.phoneTypeList;
          this.psPhones = this.responseData.psPhones;
          this.phoneType1 = this.psPhones.phoneType1;
          this.phoneType2 = this.psPhones.phoneType2;
          this.phoneType3 = this.psPhones.phoneType3;
          this.phone1 = this.psPhones.phone1;
          this.phone2 = this.psPhones.phone2;
          this.phone3 = this.psPhones.phone3;
          this.phone1!==undefined?this.PhoneNumFormat(this.phone1,'phone1'):undefined;
          this.phone2!==undefined?this.PhoneNumFormat(this.phone2,'phone2'):undefined;
          this.phone3!==undefined?this.PhoneNumFormat(this.phone3,'phone3'):undefined;
          this.clockInDCSPhoneType=this.responseData.clockInDCSPhoneType;
          this.clockOutDCSPhoneType=this.responseData.clockOutDCSPhoneType;
        }
      ), error => {

        console.log(error);
      }

    } catch (error) {

      console.log(error);
    }
  }

  public acceptCallerIdException(event) {
    let clockInFlag = event == 'clockin' ? 1 : 0;
    let clockOutFlag = event == "clockout" ? 1 : 0;
    let commentLength=event=='clockin'?this.clockInComments.trim().length:this.clockOutComments.trim().length;
    if(commentLength>0){
    let JsonData = { "id": this.JsonData.id, "visitDetailsId": this.JsonData.visitDetailsId,"clockInComments":event=='clockin'?this.clockInComments:'',"clockOutComments":event == "clockout"?this.clockOutComments:"", "clockInFlag": clockInFlag, "clockOutFlag": clockOutFlag, "userId": this.userId }
    let parameters = JSON.stringify(JsonData);
    console.log(JsonData)
    try {
      this._apiService.acceptCallerIdException(parameters).subscribe(
        response => {
          console.log(response)
          this.arrInvalidErr = event == "clockin" ? false : this.arrInvalidErr;
          this.depInvalidErr = event == "clockout" ? false : this.depInvalidErr;
          if (this.arrInvalidErr == false && this.depInvalidErr == false) {
            swal.fire({
              text: "Accepted successfully",
              icon: "success",
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then(ok => {
              let merged = { ...this.JsonData, ...response }
                if (this._apiService.checkException(merged)) {
                  this.popupUpdate.emit();
                } else {
                  this._apiService.updateTable.next(true);
                  this.bsmodelRef.hide();
                }
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
  }else{
    let data= event=="clockin"?" Clock In":" Clock Out";
    swal.fire({
      title: "Invalid Comments",
      text:"Please Enter"+ data +" comments before Accept",
      icon: "warning",
      confirmButtonText: 'OK',
    })
  }
  }

  public updatePSPhone() {

    console.log(this.phoneType2, this.phoneType3)

    let phoneType1 = this.phoneType2 !== undefined || null ? this.phoneType1 : "";
    let phoneType2 = this.phoneType2 !== undefined || null ? this.phoneType2 : "";
    let phoneType3 = this.phoneType3 !== undefined || null ? this.phoneType3 : "";
    let phone1 = this.phone1 !== undefined || null ? this.phone1.replace(/-/g, '') : '';
    let phone2 = this.phone2 !== undefined || null ? this.phone2.replace(/-/g, '') : '';
    let phone3 = this.phone3 !== undefined || null ? this.phone3.replace(/-/g, '') : '';



    //{"addressId":593519,"visitDetailsId":4636570,"phoneType2":"Work","phone2":"666688789","phoneType3":"Other","phone3":"676876876","userId":1}
    let parametersUpdate =
      { "id": this.JsonData.id, "addressId": this.responseData.psPhones.addressId, "visitDetailsId": this.JsonData.visitDetailsId, "phoneType1": phoneType1, "phone1": phone1,"phoneType2": phoneType2, "phone2": phone2, "phoneType3": phoneType3, "phone3": phone3, "userId": this.userId }
    // {"addressId":593519,"visitDetailsId":4636570,"phoneType2":"Work","phone2":"666688789","phoneType3":"Other","phone3":"676876876","userId":1}
    let JsonData = JSON.stringify(parametersUpdate);
    console.log(JsonData)
    try {
      this._apiService.updatePSPhone(JsonData).subscribe(
        response => {
          console.log(response);
          this.updateresponseData = response;
          if (this.updateresponseData.validateFlag == 0) {
            swal.fire({
              text: "Updated successfully",
              icon: "success",
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then(ok => {
              let merged = { ...this.JsonData, ...response }
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
              text: "Updated failed",
              icon: "error",
              confirmButtonText: 'OK',
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
  public PhoneNumFormat(event, phone) {

    console.log("++++++++++")
    var input = event;
    if (input != undefined) {
      let trimmed = input.replace(/\s+/g, '');
      if (trimmed.length > 12) {
        trimmed = trimmed.substr(0, 12);
      }
      trimmed = trimmed.replace(/-/g, '');
      let numbers = [];
      numbers.push(trimmed.substr(0, 3));
      if (trimmed.substr(3, 2) !== "")
        numbers.push(trimmed.substr(3, 3));
      if (trimmed.substr(5, 4) != "" && trimmed.length >= 7)
        numbers.push(trimmed.substr(6, 4));

      if (phone == 'phone2') {
        this.phone2 = numbers.join('-');
      }
      if (phone == 'phone3') {
        this.phone3 = numbers.join('-')
      }
      if (phone == 'phone1') {
        this.phone1 = numbers.join('-')
      }
    }
  }

  public validation() {
    var phone1Flag:boolean=false;
    var phone1typeFlag=false;
    var phone2Flag: boolean = false;
    var phone3Flag: boolean = false;
    var phone2typeFlag: boolean = false;
    var phone3typeFlag: boolean = false;
    if (this.phone1 != undefined && this.phone1.length > 0) {

      console.log("phone1", this.phone1.length)
      if (this.phone1.length == 12) {
        var phone1areacode = this.phone1.slice(0, 3);
        var phone1exchangecode = this.phone1.slice(4, 7)
        if ((phone1areacode >= 1 && phone1areacode >= 199) && (phone1exchangecode >= 1 && phone1exchangecode >= 199)) {
          phone1Flag = false;
        }
        else {
          phone1Flag = true;
          if(phone1areacode <= 1 || phone1areacode <= 199)
          {
            this.alertbox("Area Code (first 3 digits) should not be in between 001 and 199 for Phone  or Phone 3")
          }
          if(phone1exchangecode <= 1 || phone1exchangecode <= 199){
            this.alertbox("Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone  or Phone 3")
          }

        }
        console.log("phone1 flag is", phone1Flag)
      }
      else {
        phone1Flag = true;
        this.alertbox('Phone1 should be 10 digits')
      }
      if (this.phoneType1 == undefined) {
        this.typealert("Phone1 type was not select")
        phone1typeFlag = true;
      }
      // for(let i=0;i<this.phone2.length;i++)
      // {
      //   if(this.phone2[i]!="-")
      //   {
      //      trimmedphone2=trimmedphone2+this.phone2[i]
      //   }
      // }


    }

    if (this.phone2 != undefined && this.phone2.length > 0) {

      console.log("phone2", this.phone2.length)
      if (this.phone2.length == 12) {
        var phone2areacode = this.phone2.slice(0, 3);
        var phone2exchangecode = this.phone2.slice(4, 7)
        if ((phone2areacode >= 1 && phone2areacode >= 199) && (phone2exchangecode >= 1 && phone2exchangecode >= 199)) {
          phone2Flag = false;
        }
        else {
          phone2Flag = true;
          if(phone2areacode <= 1 ||phone2areacode <= 199)
          {
            this.alertbox("Area Code (first 3 digits) should not be in between 001 and 199 for Phone2 ")
          }
          if(phone2exchangecode <= 1 || phone2exchangecode <= 199){
            this.alertbox("Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone2  ")
          }
        }
        console.log("phone2 flag is", phone2Flag)
      }
      else {
        phone2Flag = true;
        this.alertbox('Phone2 should be 10 digits')
      }
      if (this.phoneType2 == undefined) {
        this.typealert("Phone2 type was not select")
        phone2typeFlag = true;
      }



    }
    if ((this.phone3 != undefined || null) && this.phone3.length > 0) {
      console.log("phone3", this.phone3)
      if (this.phone3.length == 12) {
        var phone3areacode = this.phone3.slice(0, 3)
        var phone3exchangecode = this.phone3.slice(4, 7)
        if ((phone3areacode >= 1 && phone3areacode >= 199) && (phone3exchangecode >= 1 && phone3exchangecode >= 199)) {
          phone3Flag = false;
        }
        else {
          phone3Flag = true;
          if(phone3areacode <= 1 ||phone3areacode <= 199)
          {
            this.alertbox("Area Code (first 3 digits) should not be in between 001 and 199 for Phone 3")
          }
          if(phone3exchangecode <= 1 || phone3exchangecode <= 199){
            this.alertbox("Exchange (middle 3 digits)  should not be in between 001 and 199 for Phone 3")
          }
        }

      } else {
        this.alertbox('Phone3 should be 10 digits')
        phone3Flag = true;
      }
      //   for(let i=0;i<this.phone3.length;i++)
      //   {
      //     if(this.phone3[i]!="-")
      //     {
      //        trimmedphone3=trimmedphone3+this.phone3[i]
      //     }
      //   }
      if (this.phoneType3 == undefined) {
        this.typealert("Phone3 type was not select")
        phone3typeFlag = true;

      }
    }

    if (phone2Flag == false && phone3Flag == false && phone2typeFlag == false && phone2typeFlag == false && phone1Flag==false && phone1typeFlag==false) {

      this.updatePSPhone();
    }

  }




  public alertbox(string) {
    var message = 'Invalid Number'
    swal.fire(message, string, 'warning')
  }
  public typealert(string) {
    var message = 'Invalid Type'
    swal.fire(message, string, 'warning')
  }

}



