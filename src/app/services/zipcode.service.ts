import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZipcodeService {
  public getbasic = new BehaviorSubject<any>(null);
  public lookUpDetails: string;
  public url
  public getUrl(): void {
    this.url = localStorage.getItem('webserviceURL');
    this.lookUpDetails = this.url + 'poclitetest/dashboard'
  }
  public zip;

  constructor(private http: HttpClient) { }
  public getLookupDetails(params): Observable<any> {
    this.getUrl()
    return this.http.get(this.lookUpDetails + "/getLookupDetails?jsonObj=" + params).pipe(catchError(this.errorHandler));
  }
  public getZipcodeDetails(zipCode): Observable<any> {
    this.getUrl()
    this.zip = { 'zipCode': zipCode }
    return this.http.get(this.lookUpDetails + '/getZipCodeDetails?jsonObj=' + JSON.stringify(this.zip)).pipe(catchError(this.errorHandler));
  }

  public savePs(params): Observable<any> {
    return this.http.post(this.lookUpDetails + '/savePSDetails' , params).pipe(catchError(this.errorHandler))

  }
  public saveGuarantor(params): Observable<any> {
    return this.http.post(this.lookUpDetails + '/saveGuarantorDetails',params).pipe(catchError(this.errorHandler))

  }

  public getPsDetails(getPs): Observable<any> {
    this.getUrl();
    return this.http.get(this.lookUpDetails + '/getPSDetails?jsonObj=' + getPs).pipe(catchError(this.errorHandler));

  }

  public getGuarantorDetails(params): Observable<any> {
    this.getUrl();

    return this.http.get(this.lookUpDetails + '/getGuarantorDetails?jsonObj=' + params).pipe(catchError(this.errorHandler));
  }

  public getPSListForCEAT(params): Observable<any> {
    this.getUrl();
    return this.http.get(this.lookUpDetails + '/getPSList?jsonObj=' + params).pipe(catchError(this.errorHandler));
  }
  public getAdmissionLookups(params): Observable<any> {
    this.getUrl();
    // return this.http.get("assets/1.json")

    return this.http.get(this.lookUpDetails + '/getAdmissionLookups?jsonObj=' + params).pipe(catchError(this.errorHandler));
  }
  public getDiagnosisDetails(params1): Observable<any> {
    this.getUrl();
    // return this.http.get("assets/1.json")

    return this.http.get(this.lookUpDetails + '/getDiagnosisDetails?jsonObj=' + params1).pipe(catchError(this.errorHandler));
  }
  public saveAdmissionDetails(params1): Observable<any> {
    this.getUrl();
    // return this.http.get("assets/1.json")

    return this.http.post(this.url + 'poclitetest/dashboard/savePSAdmission', params1).pipe(catchError(this.errorHandler));
  }
  public getPayorPlanList(params1): Observable<any> {
    this.getUrl();
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.url+ '/poclite/dashboard/getPayorPlanList?jsonObj=' + params1).pipe(catchError(this.errorHandler));
  }
  public savePSAdmissionPayorPlan(params): Observable<any> {
    this.getUrl();
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.url+ 'poclite/dashboard/savePSAdmissionPayorPlan?jsonObj=' , params).pipe(catchError(this.errorHandler));
  }

  public getLookupsData():Observable<any>{
    this.getUrl();
    return this.http.get(this.url+'poclite/common/getLookupsData?lookupNames=case_manager,temp_authz_day_span,rate_type').pipe(catchError(this.errorHandler));
  }
  public getAuthBasicDetails(params):Observable<any>{
    this.getUrl();
    return this.http.get(this.url+'poclite/dashboard/getAuthBasicDetails?jsonObj='+params).pipe(catchError(this.errorHandler));
  }
  public savePSAuthorization(params):Observable<any>{
    this.getUrl();
    return this.http.post(this.url+'poclite/dashboard/savePSAuthorization',params).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('error in API service', error);
    return throwError(error);
  }

}
