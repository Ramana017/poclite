import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class PSRegistrationService {
  public getbasic = new BehaviorSubject<any>(null);
  public lookUpDetails: string;
  public url;
  public getUrl(): void {
    this.url = localStorage.getItem('webserviceURL');
    this.lookUpDetails = this.url + '/dashboard'
  }
  public zip;
  public dismissId;
  constructor(private http: HttpClient,private toastr: ToastrService,) {
   }
  public showSuccess(message) {
    this.toastr.success('',message, {
      timeOut:1500
    });
  }
  public getLookupDetails(params): Observable<any> {
    this.getUrl()
    return this.http.get(this.lookUpDetails + "/getUserOfficeList?jsonObj=" + params).pipe(catchError(this.errorHandler));
  }
  public getLookupDetails1(params): Observable<any> {
    this.getUrl()
    return this.http.get(this.lookUpDetails + "/getLookupDetails?jsonObj=" + params).pipe(catchError(this.errorHandler));
  }
  public getZipcodeDetails(zipCode): Observable<any> {
    this.getUrl()
    this.zip = { 'zipCode': zipCode };
    return this.http.get(this.lookUpDetails + '/getZipCodeDetails?jsonObj=' + JSON.stringify(this.zip)).pipe(catchError(this.errorHandler));
  }

  public savePs(params): Observable<any> {
    return this.http.post(this.lookUpDetails + '/savePSDetails', params).pipe(catchError(this.errorHandler))

  }
  public saveGuarantor(params): Observable<any> {
    return this.http.post(this.lookUpDetails + '/saveGuarantorDetails', params).pipe(catchError(this.errorHandler))

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

    return this.http.post(this.url + '/dashboard/savePSAdmission', params1).pipe(catchError(this.errorHandler));
  }
  public getPayorPlanList(params1): Observable<any> {
    this.getUrl();
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.url + '/dashboard/getPayorPlanList?jsonObj=' + params1).pipe(catchError(this.errorHandler));
  }
  public savePSAdmissionPayorPlan(params): Observable<any> {
    this.getUrl();
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.url + '/dashboard/savePSAdmissionPayorPlan?jsonObj=', params).pipe(catchError(this.errorHandler));
  }

  public getLookupsData(): Observable<any> {
    this.getUrl();
    return this.http.get(this.url + '/common/getLookupsData?lookupNames=case_manager,temp_authz_day_span,rate_type').pipe(catchError(this.errorHandler));
  }
  public getAuthBasicDetails(params): Observable<any> {
    this.getUrl();
    return this.http.get(this.url + '/dashboard/getAuthBasicDetails?jsonObj=' + params).pipe(catchError(this.errorHandler));
  }
  public savePSAuthorization(params): Observable<any> {
    this.getUrl();
    return this.http.post(this.url + '/dashboard/savePSAuthorization', params).pipe(catchError(this.errorHandler));
  }


  public getLookupsData2(params:number): Observable<any> {
    this.getUrl();
    return this.http.get(this.url + '/common/getLookupsData?lookupNames=referral_source&officeId='+params).pipe(catchError(this.errorHandler));


  }
  //basic lookup details
  public getLookupsDataBasic(): Observable<any> {
    this.getUrl();
    return this.http.get(this.url + '/common/getLookupsData?lookupNames=gender,salutation,race,maritial_status,address_type,phone_type,language').pipe(catchError(this.errorHandler));


  }
  // basic gurantor details
  public getLookupsDataGurantor(): Observable<any> {
    this.getUrl();
    return this.http.get(this.url + '/common/getLookupsData?lookupNames=address_type,phone_type,relationship,occupation,gender').pipe(catchError(this.errorHandler));
  }
  public getContactLookups(): Observable<any> {
    this.getUrl();
    return this.http.get(this.url + '/common/getLookupsData?lookupNames=address_type,salutation,maritial_status,phone_type,relationship,occupation,gender').pipe(catchError(this.errorHandler));
  }
  public getEditGuarantorLookups(): Observable<any> {
    this.getUrl();
    return this.http.get(this.url + '/common/getLookupsData?lookupNames=address_type,salutation,phone_type,relationship,occupation').pipe(catchError(this.errorHandler));
  }
  public validateSSNNumber(params){
    this.getUrl();
    return this.http.get(this.url + '/common/validateSSNNumber?jsonObj='+params).pipe(catchError(this.errorHandler));

  }
  public isPolicyNumRequired(params){
    this.getUrl();
    return this.http.get(this.url + '/common/isPolicyNumRequired?jsonObj='+params).pipe(catchError(this.errorHandler));

  }
  public getUserId(mappedsites?){
    var token = JSON.parse(sessionStorage.getItem('useraccount'));
    if(mappedsites){
        return token.siteList;
    }else
    return token.userId;
  }
  public PhoneNumFormat(input, length) {
    if (input != undefined) {
      let trimmed = input.replace(/\D/g, '');
      if (trimmed.length > length) {
        trimmed = trimmed.substr(0, length);
      }
      trimmed = trimmed.replace(/-/g, '');
      let numbers = [];
      numbers.push(trimmed.substr(0, 3));
      if (trimmed.substr(3, 2) !== '') numbers.push(trimmed.substr(3, 3));
      if (trimmed.substr(5, 4) != '' && trimmed.length >= 7)
        numbers.push(trimmed.substr(6, 4));

        return numbers.join('-');
    }
  }

  // public getNotifications() {
  //   return this.http.get('http://poc.aquilasoftware.com/pocextacc-notiwebservices/telephony/getNotifications').pipe(catchError(this.errorHandler))

  // }
  // public stopNotifications(id) {
  //   this.dismissId ={ "id" : id}
  //   return this.http.get('http://poc.aquilasoftware.com/pocextacc-notiwebservices/telephony/dismissNotifications?jsonObject=' + JSON.stringify(this.dismissId)).pipe(catchError(this.errorHandler))

  // }
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('error in API service', error);
    return throwError(error);
  }
}
