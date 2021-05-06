import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AmsAlertsServiceService {

  constructor(private http: HttpClient,private toastr: ToastrService,) {
    this.getUrl()
  }
  public amsAlertUrl;
  public loginDetails;
  public getUrl() {
    this.amsAlertUrl = sessionStorage.getItem('amsAlertUrl');
    console.log("++++++++++++++",this.amsAlertUrl)
  }

  public authenticateUserForDevices(): Observable<any> {
    this.loginDetails = JSON.parse(atob(sessionStorage.getItem(btoa('logindetils'))));
    return this.http.get(`${this.amsAlertUrl}/authenticateUserForDevices?username=${this.loginDetails.username}&password=${this.loginDetails.password}&deviceId=""`).pipe(catchError(this.errorHandler));
  }
  public getApplicationList(userId, userTypeId, sessionId,): Observable<any> {
    return this.http.get(`${this.amsAlertUrl}/getApplicationList?userId=${userId}&userTypeId=${userTypeId}&sessionId=${sessionId}`).pipe(catchError(this.errorHandler));
  }



  public getAlertDefinitionList(applicationId, alertFlag, sessionId): Observable<any> {
    return this.http.get(`${this.amsAlertUrl}/getAlertDefinitionList?applicationId=${applicationId}&alertFlag=${alertFlag}&sessionId=${sessionId}`).pipe(catchError(this.errorHandler));
  }

  public getAlertsForDevices(userId,startDate,endDate,searchBy,viewByFlag,applicationId,alertDefinitionId,sessionId): Observable<any> {
    console.log("wwwwwwwwwwwwwwww",this.amsAlertUrl)
    return this.http.get(`${this.amsAlertUrl}getAlertsForDevices?userId=${userId}&startDate=${startDate}&endDate=${endDate}&searchByKeyword=${searchBy}&viewByFlag=${viewByFlag}&applicationId=${applicationId}&alertDefinitionId=${alertDefinitionId}&sessionId=${sessionId}`).pipe(catchError(this.errorHandler));
  }
  public getAlertButtonDetails(applicationId,alertDefId,userId,sessionId): Observable<any> {
    return this.http.get(`${this.amsAlertUrl}/getAlertButtonDetails?applicationId=${applicationId}&alertDefId=${alertDefId}&userId=${userId}&sessionId=${sessionId}`).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse) {
    console.log("error in AMS  service Alerts", error);
    return throwError(error);
  }
  public errtoast() {
    this.toastr.error('','Failed to Authenticate AMS', {
      timeOut:1500
    });
  }

}
