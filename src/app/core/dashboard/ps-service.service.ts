import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PsServiceService {
public PsList=[];
public dcsList=[];
public psAdmissionId=null;
public psAuthorizationid=null;
  constructor(private http: HttpClient) {
    this.geturl();
  }
  public webserviceUrl = '';

  geturl() {
    console.log(localStorage.getItem('webserviceURL'))
    this.webserviceUrl = localStorage.getItem('webserviceURL')
  }

  public getPSList(obj): Observable<any> {
        return this.http.get(`${this.webserviceUrl}/dashboard/getPSList?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }
  public getDcsList(obj): Observable<any> {
    return this.http.get(`${this.webserviceUrl}/dashboard/getDcsList?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }
  public getAuthorizationsList(obj): Observable<any> {
    return this.http.get(`${this.webserviceUrl}/dashboard/getAuthorizationsList?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }
  public getAdmissionsList(obj): Observable<any> {
    return this.http.get(`${this.webserviceUrl}/dashboard/getAdmissionsList?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse) {
    console.log("error in API service", error);
    Swal.fire({
      html: error.error,
      icon: 'error'
    })
    return throwError(error);

  }
}
