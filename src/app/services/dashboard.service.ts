import { Injectable, ErrorHandler, OnInit } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import baseUrl from '../../assets/url.json';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  public baseURL: string;
  public url:string = '/dashboard/';
  constructor(private http: HttpClient) { }


  geturl(){
    this.baseURL=localStorage.getItem('webserviceURL')
    this.baseURL=this.baseURL+this.url
  }
  public getPSList(data: any): Observable<object> {
    this.geturl()
    return this.http.get<object>( this.baseURL + 'getPSList?jsonObj=' + data , { responseType: 'json' });
  }
  public getAdmissionsListbypsId(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>( this.baseURL + 'getAdmissionsList?jsonObj=' + data , { responseType: 'json' });
  }
  public getAdmissionsList(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>( this.baseURL + 'getAdmissionsList?jsonObj=' + data , { responseType: 'json' });
  }

  public getDashboardConfiguration(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>( this.baseURL + 'getDashboardConfiguration?jsonObj=' + data , { responseType: 'json' });
  }

  public saveDashboardConfiguration(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>( this.baseURL + 'saveDashboardConfiguration?jsonObj=' + data , { responseType: 'json' });
  }

  public getAuthorizationsListByPsId(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>( this.baseURL + 'getAuthorizationsList?jsonObj=' + data , { responseType: 'json' });
  }
  public getAuthorizationsList(data: any): Observable<object> {
    this.geturl()
    return this.http.get<object>( this.baseURL + 'getAuthorizationsList?jsonObj=' + data , { responseType: 'json' });
  }
  public getDcsListByDcsId(data: any): Observable<object> {
    this.geturl()

    return this.http.get<object>( this.baseURL + 'getDcsList?jsonObj=' + data , { responseType: 'json' });
  }
  public getDcsList(data: any): Observable<object> {
    this.geturl()
    return this.http.get<object>( this.baseURL + 'getDcsList?jsonObj=' + data , { responseType: 'json' });
  }

  public getVisitsList(data: any): Observable<object> {
    this.geturl();
    return this.http.get<object>( this.baseURL + 'getVisitsList?jsonObj=' + data , { responseType: 'json' });
  }
}
