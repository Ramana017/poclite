import { Injectable, ErrorHandler, OnInit } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { httpOptions } from './ams-alerts-service.service';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  public responseData: any;
  public baseURL: string;
  public webserviceurl: string;
  // settingObservable$: any;
  public geturl() {
    this.webserviceurl = localStorage.getItem('webserviceURL');
    this.baseURL = this.webserviceurl + '/callmanagement'
  }

  public updateTable = new Subject();
  public updateTable$ = this.updateTable.asObservable();

  public updatePopup = new Subject();
  public updatePopup$ = this.updatePopup.asObservable();

  constructor(private _http: HttpClient, private toastr: ToastrService,) {
    this.geturl();
    console.log("API service")
  }


  public showSuccess(message) {
    this.toastr.success('', message, {
      timeOut: 1000
    });
  }
  // calling Table APi
  public authenticateUser(jsondata: string): Observable<any> {
    this.geturl()
    return this._http.post(this.baseURL + "/authenticateUser", jsondata).pipe(catchError(this.errorHandler));
  }
  public tableData(jsondata: string): Observable<object> {
    this.geturl();
    return this._http.get<object>(this.baseURL + "/getCallMgmtExceptionsList?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public tableFilterData(userid): Observable<object> {
    // console.log("+++++++++",this.baseURL);
    this.geturl()
    return this._http.get(this.baseURL + "/getFilterData?jsonObj="+userid).pipe(catchError(this.errorHandler))
  }

  // mileage exception Api
  public getMileageException(jsondata: string): Observable<object> {
    this.geturl();

    return this._http.get(this.baseURL + "/getMilegeExceptionData?jsonObj=" + jsondata).pipe(catchError(this.errorHandler))
  }

  public acceptMilegeException(jsondata: string): Observable<any> {
    this.geturl();

    console.log(jsondata)
    return this._http.get(this.baseURL + "/acceptMilegeException?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public updateMilege(jsondata: string): Observable<any> {
    this.geturl();

    return this._http.get(this.baseURL + "/updateMilege?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }

  // invaidCaller exception Api
  public getCallerIdExceptionData(jsondata: string): Observable<any> {
    // this.geturl()
    return this._http.get(this.baseURL + "/getCallerIdExceptionData?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public acceptCallerIdException(jsondata: string): Observable<any> {
    this.geturl();
    // return this._http.post("http://poc.aquilasoftware.com/poclite" + "_test/callmanagement/acceptCallerIdException" , jsondata).pipe(catchError(this.errorHandler));

    return this._http.post(this.baseURL + "/acceptCallerIdException", jsondata).pipe(catchError(this.errorHandler));
  }

  public updatePSPhone(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/updatePSPhone?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }

  //GPS exception Apis
  public getGpsExceptionData(jsondata: string): Observable<any> {
    // this.geturl()
    return this._http.get(this.baseURL + "/getGpsExceptionData?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }

  public acceptGpsException(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.post(this.baseURL + "/acceptGpsException", jsondata).pipe(catchError(this.errorHandler));
  }
  public updateGpsException(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/updateGpsException?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public saveFormatAddress(jsondata): Observable<any> {
    this.geturl();
    return this._http.post(this.baseURL + "/saveFormatAddress",jsondata,httpOptions).pipe(catchError(this.errorHandler));
  }
   public getPSAddressData(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/getPSAddressData?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public getZipcodeDetails(zipCode): Observable<any> {
    this.geturl()
    let zip = { 'zipCode': zipCode };
    return this._http.get(this.webserviceurl + '/dashboard/getZipCodeDetails?jsonObj=' + JSON.stringify(zip)).pipe(catchError(this.errorHandler));
  }


  //public schedule variance
  public getScheduleVarExceptionData(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/getScheduleVarExceptionData?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public acceptScheduleVarException(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/acceptScheduleVarException?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public updateReportedTimes(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/updateReportedTimes?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }

  //public travel time
  public getTravelTimeExceptionData(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/getTravelTimeExceptionData?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public acceptTravelTimeException(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/acceptTravelTimeException?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public updateTravelTime(jsondata: string): Observable<any> {
    this.geturl();

    return this._http.get(this.baseURL + "/updateTravelTime?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }


  // methods for clockin OR out exceptions

  public getUnLinkedArrivalDeparture(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/getUnLinkedArrivalDeparture?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public createArrivalDeparture(jsondata: string): Observable<any> {
    this.geturl();

    return this._http.get(this.baseURL + "/createArrivalDeparture?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }

  //methods for clockIn AND clockOut exceptions
  public getUnLinkedPunches(jsondata: string): Observable<any> {
    this.geturl();

    return this._http.get(this.baseURL + "/getUnLinkedPunches?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public createPunchForSchedule(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/createPunchForSchedule?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }

  public getUserSites(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/getUserSites?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public getVisitsCountsToCSSLevel(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/getVisitsCountsToCSSLevel?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public getPSVisitDetails(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/getPSVisitDetails?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public getVisitsCountsToPSLevel(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/getVisitsCountsToPSLevel?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }

  public getVisitsDashboardDetails(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/getVisitsDashboardDetails?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public getInvalidTokenCodeExceptionData(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/getInvalidTokenCodeExceptionData?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public acceptInvalidTokenCodeException(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/acceptInvalidTokenCodeException?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public updateTokenCode(jsondata: string): Observable<any> {
    this.geturl();
    return this._http.get(this.baseURL + "/updateTokenCode?jsonObj=" + jsondata).pipe(catchError(this.errorHandler));
  }
  public getVisitReviewList(params) {
    return this._http.get(this.webserviceurl + "/supervisory/getVisitReviewList?jsonObj=" + params).pipe(catchError(this.errorHandler));
  }

  public getVisitTimes(params) {
    return this._http.get(this.webserviceurl+"/supervisory/getVisitTimes?jsonObj="+params).pipe(catchError(this.errorHandler));
  }
  public getTaskList(params) {
    return this._http.get(this.webserviceurl+"/supervisory/getTaskList?jsonObj="+params).pipe(catchError(this.errorHandler));
  }
  public getSignatures(params) {
    return this._http.get(this.webserviceurl+"/supervisory/getSignatures?jsonObj="+params).pipe(catchError(this.errorHandler));
  }
  public getProgressNotes(params) {
    return this._http.get(this.webserviceurl+"/supervisory/getProgressNotes?jsonObj="+params).pipe(catchError(this.errorHandler));
  }
  // method for error handling

  private errorHandler(error: HttpErrorResponse) {
    console.log("error in API service", error);
    return throwError(error);
  }

  //public
  public checkUser(): boolean {
    var data = sessionStorage.getItem('useraccount');
    var token = JSON.parse(data);
    if (token != undefined) {
      // return false;
      if (token.priviledFlag == 'schedule') {
        return true;
      }
      else {
        return false;
      }
    }

  }
  public checkAll(): boolean {
    var data = sessionStorage.getItem('useraccount');
    var token = JSON.parse(data);
    if (token != undefined) {
      if (token.priviledFlag == 'all') {
        return true;
      } else {
        return false;
      }
    }

  }
  public loggedIn(): boolean {

    return !!sessionStorage.getItem('useraccount');
  }

  //To check exceptions is their or not
  public checkException(data): boolean {
    console.log(data)
    if (data.ArrGpsException == 1 || data.DepGpsException == 1 || data.scheduleVarException == 1 || data.arrCallerIdException == 1 || data.depCallerIdException == 1 || data.depMileageException == 1 || data.arrMileageException == 1 || data.depTokenCodeException == 1 || data.arrTokenCodeException == 1 || data.arrTravelTimeException == 1) {
      localStorage.setItem("userlist", JSON.stringify(data))
      return true;
    } else {
      localStorage.removeItem("userlist")
      console.log("exceptions are not more than one")
      return false;
    }
  }

}
