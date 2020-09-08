import { Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZipcodeService {

  public lookUpDetails:string;
  public getUrl():void {
    let url = localStorage.getItem('webserviceURL');
    this.lookUpDetails=url+'pocextacc-webservices_9.2/telephony'
  }
  public zip;

  constructor(private http: HttpClient) { }
  public getLookupDetails(params): Observable<any> {
    this.getUrl()
    return this.http.get(this.lookUpDetails + "/getLookupDetails?jsonObj=" +params).pipe(catchError(this.errorHandler));
  }
  public getZipcodeDetails(zipCode): Observable<any> {
    this.getUrl()
    this.zip = { 'zipCode': zipCode }
    return this.http.get(this.lookUpDetails + '/getZipCodeDetails?jsonObj=' + JSON.stringify(this.zip)).pipe(catchError(this.errorHandler));
  }

  public savePs(params): Observable<any> {
    return this.http.get(this.lookUpDetails + '/savePsDetails?jsonObj=' + params).pipe(catchError(this.errorHandler))

  }
  public saveGuarantor(params): Observable<any> {
    return this.http.get(this.lookUpDetails + '/saveGuarantorDetails?jsonObj=' + params).pipe(catchError(this.errorHandler))

  }

  public getPsDetails(getPs): Observable<any> {
    this.getUrl();
    return this.http.get(this.lookUpDetails + '/getPsDetails?jsonObj=' + getPs).pipe(catchError(this.errorHandler));

  }

  public getGuarantorDetails(params): Observable<any> {
    this.getUrl();

    return this.http.get(this.lookUpDetails + '/getGuarantorDetails?jsonObj=' + params).pipe(catchError(this.errorHandler));
  }

  public getPSListForCEAT(params): Observable<any> {
    this.getUrl();
    return this.http.get(this.lookUpDetails + '/getPSListForCEAT?jsonObj=' + params).pipe(catchError(this.errorHandler));
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
    //this.getUrl();
   // return this.http.get("assets/1.json")

    return this.http.post(' http://poc.aquilasoftware.com/poclite/dashboard/savePSAdmission' , params1).pipe(catchError(this.errorHandler));
  }
  public getPayorPlanList(params1): Observable<any> {
    //this.getUrl();
   // return this.http.get("assets/1.json")

    // tslint:disable-next-line: max-line-length
    return this.http.get('http://poc.aquilasoftware.com/poclite/dashboard/getPayorPlanList?jsonObj=' + params1).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('error in API service', error);
    return throwError(error);
  }

}
