import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain'

  }),
};
@Injectable({
  providedIn: 'root'
})
export class AmsAlertsServiceService {

  constructor(private http: HttpClient, private toastr: ToastrService,) {
    this.getUrl()
  }
  public amsAlertUrl;
  public loginDetails;
  public getUrl() {
    this.amsAlertUrl = localStorage.getItem('webserviceURL');
    console.log("++++++++++++++", this.amsAlertUrl)
  }

  public authenticateUserForDevices(): Observable<any> {
    this.loginDetails = JSON.parse(atob(sessionStorage.getItem(btoa('logindetils'))));
    let obj={username:this.loginDetails.username,password:this.loginDetails.password,deviceId:"IA2B3C4D5E6F7G8H"}
    return this.http.post(`${this.amsAlertUrl}/communicationDashboard/authenticateUserForDevices`,obj,httpOptions).pipe(catchError(this.errorHandler));
  }
  public getApplicationList(userId, userTypeId, sessionId,): Observable<any> {
    return this.http.get(`${this.amsAlertUrl}/communicationDashboard/getApplicationList?userId=${userId}&userTypeId=${userTypeId}&sessionId=${sessionId}`).pipe(catchError(this.errorHandler));
  }

public processDynamicActions(userId,applicationId,captions,actions,amsActions,ids,alertIds,aggregateAlertIds,sessionId):Observable<any>{
  return this.http.get(`${this.amsAlertUrl}/communicationDashboard/processDynamicActions?&userId=${userId}&applicationId=${applicationId}&captions=${captions}&actions=${actions}&amsActions=${amsActions}&ids=${ids}&alertIds=${alertIds}&aggregateAlertIds=${aggregateAlertIds}&sessionId=${sessionId}`).pipe(catchError(this.errorHandler));
}

  public getAlertDefinitionList(applicationId, alertFlag, sessionId): Observable<any> {
    return this.http.get(`${this.amsAlertUrl}/communicationDashboard/getAlertDefinitionList?applicationId=${applicationId}&alertFlag=${alertFlag}&sessionId=${sessionId}`).pipe(catchError(this.errorHandler));
  }

  public getAlertsForDevices(userId, startDate, endDate, searchBy, viewByFlag, applicationId, alertDefinitionId, sessionId): Observable<any> {
    console.log("wwwwwwwwwwwwwwww", this.amsAlertUrl)
    return this.http.get(`${this.amsAlertUrl}/communicationDashboard/getAlertsForDevices?userId=${userId}&startDate=${startDate}&endDate=${endDate}&searchByKeyword=${searchBy}&viewByFlag=0&applicationId=${applicationId}&alertDefinitionId=${alertDefinitionId}&sessionId=${sessionId}`).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("error in AMS  service Alerts", error);
    return throwError(error);
  }
  public errtoast() {
    this.toastr.error('', 'Failed to Authenticate AMS', {
      timeOut: 1500
    });
  }

}

export interface amsLogin {
  userTypeId: number,
  fname: string,
  loginId: string,
  flag: number,
  active: number,
  sessionId: string,
  userId: number,
  applicationIds: string,
  lname: string,
  id: number,
  emailNotifFlag: number,
  pwdExpiryFlag: number,
  email: string
}
export interface alertForDevices {

  alertSendDate: string,
  subject: string
  errorCode: number
  alertDefId: number
  groupBy: string
  message: any
  userId: number
  buttonDetails: any
  aggregateAlertId: string
  messageTypeId: number
  id: number
  alertId: number
  applicationId: number
  status: number,
  buttonsNameArray?:Array<any>;
  buttonsActionIdsArray?:Array<any>,
  buttonsActionArray?:Array<any>,
  confirmPromptArray?:string

}

export interface amsButton {
  confirmPrompt: string
  AmsActionIds: string
  errorCode: number
  actions: string
  captions: string
}

