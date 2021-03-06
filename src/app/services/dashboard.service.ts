import { Injectable, ErrorHandler, OnInit } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import isThisHour from 'date-fns/isThisHour';
import Swal from 'sweetalert2';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain',
    }),
};

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  public baseURL: string;
  public webserviceUrl = '';
  constructor(private http: HttpClient) {
    this.geturl();
  }


  geturl() {
    console.log(localStorage.getItem('webserviceURL'))
    this.webserviceUrl = localStorage.getItem('webserviceURL')
    this.baseURL = this.webserviceUrl + '/dashboard/';
  }
  public getPSList(data: any): Observable<object> {
    this.geturl()
    return this.http.get<object>(this.baseURL + 'getPSList?jsonObj=' + data, { responseType: 'json' });
  }
  public getAdmissionsListbypsId(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>(this.baseURL + 'getAdmissionsList?jsonObj=' + data, { responseType: 'json' });
  }
  public getAdmissionsList(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>(this.baseURL + 'getAdmissionsList?jsonObj=' + data, { responseType: 'json' });
  }

  public getDashboardConfiguration(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>(this.baseURL + 'getDashboardConfiguration?jsonObj=' + data, { responseType: 'json' });
  }

  public saveDashboardConfiguration(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>(this.baseURL + 'saveDashboardConfiguration?jsonObj=' + data, { responseType: 'json' });
  }

  public getAuthorizationsListByPsId(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>(this.baseURL + 'getAuthorizationsList?jsonObj=' + data, { responseType: 'json' });
  }
  public getAuthorizationsList(data: any): Observable<object> {
    this.geturl()
    return this.http.get<object>(this.baseURL + 'getAuthorizationsList?jsonObj=' + data, { responseType: 'json' });
  }
  public getDcsListByDcsId(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>(this.baseURL + 'getDcsList?jsonObj=' + data, { responseType: 'json' });
  }
  public getDcsList(data: any): Observable<object> {
    this.geturl()
    return this.http.get<object>(this.baseURL + 'getDcsList?jsonObj=' + data, { responseType: 'json' });
  }

  public getVisitsList(data: any): Observable<object> {
    this.geturl();
    return this.http.get<object>(this.baseURL + 'getVisitsList?jsonObj=' + data, { responseType: 'json' });
  }

  public getDashBoardVisitsCount(obj): Observable<any> {
    return this.http.get(this.webserviceUrl + `/cmsdashboard/getDashBoardVisitsCount?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }
  public getFilterData(userId): Observable<any> {
    return this.http.get(this.webserviceUrl + `/cmsdashboard/getFilterData?jsonObj={"userId" : ${userId}}`).pipe(catchError(this.errorHandler));
  }
  public getDashBoardVisitsDetails(data): Observable<any> {
    return this.http.get(this.webserviceUrl + `/cmsdashboard/getDashBoardVisitsDetails?jsonObj=${data}`).pipe(catchError(this.errorHandler));
  }
  public getDashBoardClientsCount(data): Observable<any> {
    return this.http.get(this.webserviceUrl + `/cmsdashboard/getDashBoardClientsCount?jsonObj=${data}`).pipe(catchError(this.errorHandler));
  }

  public getDashBoardClientsData(data): Observable<any> {
    return this.http.get(this.webserviceUrl + `/cmsdashboard/getDashBoardClientsData?jsonObj=${data}`).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("error in API service", error);
    Swal.fire({
      html:error.error,
      icon:'error'
    })
    return throwError(error);

  }

  public getTelephonyStats(data): Observable<any> {
    return this.http.get(this.webserviceUrl + `/analytics/getTelephonyStats?jsonObj=${data}`).pipe(catchError(this.errorHandler))
  }
  public getDailyUtilStats(data): Observable<any> {
    return this.http.get(this.webserviceUrl + `/analytics/getDailyUtilStats?jsonObj=${data}`).pipe(catchError(this.errorHandler))
  }
  public getEDList(data): Observable<any> {
    return this.http.get(this.webserviceUrl + `/analytics/getEDList?jsonObj=${data}`).pipe(catchError(this.errorHandler))
  }
  public getBMList(data): Observable<any> {
    return this.http.get(this.webserviceUrl + `/analytics/getBMList?jsonObj=${data}`).pipe(catchError(this.errorHandler))
  }
  public getSiteList(data): Observable<any> {
    return this.http.get(this.webserviceUrl + `/analytics/getSiteList?jsonObj=${data}`).pipe(catchError(this.errorHandler))
  }
  public getRVPList(data): Observable<any> {
    return this.http.get(this.webserviceUrl + `/analytics/getRVPList?jsonObj=${data}`).pipe(catchError(this.errorHandler))
  }

  public getPocReleaseNotesList(data): Observable<any> {
    return this.http.get(this.webserviceUrl + `/communicationDashboard/getPocReleaseNotesList?jsonObj=${data}`).pipe(catchError(this.errorHandler))
  }
  public getPocReleaseNotesFile(id): Observable<any> {
    return this.http.get(this.webserviceUrl + `/communicationDashboard/getPocReleaseNotesFile?jsonObj={"attachmentId":${id}}`).pipe(catchError(this.errorHandler))
  }

  public getAppApprovals(obj): Observable<any> {
    return this.http.get(this.webserviceUrl + `/communicationDashboard/getAppApprovals?jsonObj=${obj}`).pipe(catchError(this.errorHandler))
  }
  public getLookupsData(): Observable<any> {
    return this.http.get(this.webserviceUrl + `/common/getLookupsData?lookupNames=app_approval_type,approval_status`).pipe(catchError(this.errorHandler))
  }

  public approvingEditPunch(obj): Observable<any> {
    return this.http.post(this.webserviceUrl + `/communicationDashboard/approvingEditPunch`,obj,httpOptions).pipe(catchError(this.errorHandler))
  }
  public getAppEditPunchList(obj): Observable<any> {
    return this.http.get(this.webserviceUrl + `/communicationDashboard/getAppEditPunchList?jsonObj=${obj}`).pipe(catchError(this.errorHandler))
  }
  public getAppAvailabilityList(obj): Observable<any> {
    return this.http.get(this.webserviceUrl + `/communicationDashboard/getAppAvailabilityList?jsonObj=${obj}`).pipe(catchError(this.errorHandler))
  }
  public getAppExceptionList(obj): Observable<any> {
    return this.http.get(this.webserviceUrl + `/communicationDashboard/getAppExceptionList?jsonObj=${obj}`).pipe(catchError(this.errorHandler))
  }
  public getAppAvailabilityEffectedVisits(obj): Observable<any> {
    return this.http.get(this.webserviceUrl + `/communicationDashboard/getAppAvailabilityEffectedVisits?jsonObj=${obj}`).pipe(catchError(this.errorHandler))
  }
  public approveAppDCSAvailability(obj): Observable<any> {
    return this.http.post(this.webserviceUrl + `/communicationDashboard/approveAppDCSAvailability`,obj,httpOptions).pipe(catchError(this.errorHandler))
  }
  public getAppExceptionEffectedVisits(obj): Observable<any> {
    return this.http.get(this.webserviceUrl + `/communicationDashboard/getAppExceptionEffectedVisits?jsonObj=${obj}`).pipe(catchError(this.errorHandler))
  }
  public approveAppDCSException(obj): Observable<any> {
    return this.http.post(this.webserviceUrl + `/communicationDashboard/approveAppDCSException`,obj,httpOptions).pipe(catchError(this.errorHandler))
  }
  public getAllDcsWithRecentMessage(obj): Observable<any> {
    return this.http.get(this.webserviceUrl + `/communicationDashboard/getAllDcsWithRecentMessage?jsonObj=${obj}`).pipe(catchError(this.errorHandler))
  }
  public getDcsMessagesForUser(obj): Observable<any> {
    return this.http.get(this.webserviceUrl + `/communicationDashboard/getDcsMessagesForUser?jsonObj=${obj}`).pipe(catchError(this.errorHandler))
  }
  public saveDcsMessage(obj): Observable<any> {
    return this.http.post(this.webserviceUrl + `/communicationDashboard/saveDcsMessage`, obj, httpOptions).pipe(catchError(this.errorHandler))
  }
  public getDcsList2(obj): Observable<any> {
    return this.http.get<any>(this.webserviceUrl + `/communicationDashboard/getDcsList?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }
}
