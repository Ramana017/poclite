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
    this.lookUpDetails = localStorage.getItem('webServiceUrl');
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
    return this.http.get(this.lookUpDetails + '/getAdmissionLookups?jsonObj=' + params).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('error in API service', error);
    return throwError(error);
  }

}
