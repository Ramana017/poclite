import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';

@Component({
  selector: 'app-invalid-token',
  templateUrl: './invalid-token.component.html',
  styleUrls: ['./invalid-token.component.sass']
})
export class InvalidTokenComponent implements OnInit {
  @Output()
  popupUpdate: EventEmitter<any> = new EventEmitter<any>();
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
  public clockoutOtp:number;
  public clockinOtp:number;

  public clockInException:boolean=true;
  public clockOutException:boolean=true;

  constructor(public _apiService:ApiserviceService, public bsmodelRef: BsModalRef) { }

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
    if (this.JsonData.arrTokenCodeException == 1) {
      this.clockInException = true;
    }
    if (this.JsonData.depTokenCodeException == 1) {
      this.clockOutException = true;
    }

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
  public acceptInvalidTokenCodeException(eventFlag) {

    let jsonObj={"id":this.JsonData.id,"visitDetailsId":this.JsonData.visitDetailsId,"clockInFlag":eventFlag=='clockin'?1:0,"clockOutFlag":eventFlag=='clockout'?1:0,"userId":this.userId}
    let parameters = JSON.stringify(jsonObj);
    console.log(parameters)
    try {
      this._apiService.acceptInvalidTokenCodeException(parameters).subscribe(
        response => {
          let data:any=response;
          console.log(response)
          this.clockInException = eventFlag == "clockin" ? false : this.clockInException;
          this.clockOutException = eventFlag == "clockout" ? false : this.clockOutException;
          console.log(this.clockInException,this.clockOutException)
          if (this.clockInException == false && this.clockOutException == false) {
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
        }
      ), error => {

        console.log(error);
      }

    } catch (error) {

      console.log(error);
    }
  }

  public updateTokenCode(eventFlag) {
    let jsonObj={"id":this.JsonData.id,"visitDetailsId":this.JsonData.visitDetailsId,"psId":this.JsonData.psId,"arrivalTokenCode":eventFlag=='clockin'?this.clockinOtp:'',"departureTokenCode":eventFlag=="clockout"?this.clockoutOtp:'',"userId":this.userId}
    let parameters = JSON.stringify(jsonObj);
    try {
      this._apiService.updateTokenCode(parameters).subscribe(
        response => {
          console.log(response);
          let data:any = response;
          if (data.validateFlag == 0) {
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
              title: "Updated failed",
              text: data.result,
              icon: "error",
              confirmButtonText: 'OK',
              allowOutsideClick: false
            })
          }
        }, error => {
          console.log(error);
        }
      )
    } catch (error) {

      console.log(error);
    }
  }
}
