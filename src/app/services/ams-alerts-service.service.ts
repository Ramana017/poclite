import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmsAlertsServiceService {

  constructor(private http: HttpClient) {
    console.log("##########ams alerts")
    this.getUrl()
  }
  public amsAlertUrl;
  public loginDetails;
  public getUrl() {
    console.log("##########ams alerts")
    this.loginDetails=JSON.parse(atob(sessionStorage.getItem(btoa('logindetils'))));
    console.log(this.loginDetails);

  }

  public authenticateUserForDevices(): Observable<any>{
    return this.http.get(`/authenticateUserForDevices?username=${this.loginDetails.username}&password=${this.loginDetails.password}&deviceId=""`)
  }
  // http://pcdvlweb01.rescare.ad:7004/pocextacc-webservices_ams/ams/webservice/getApplicationList?userId=52171&userTypeId=4&sessionId=52171_FHG3E390D2N13SZV

  // http://pocwebservices.rescare.com:7004/pocextacc-webservices/ams/webservice/authenticateUserForDevices?username=administrator&password=louisville&deviceId=%22%22
}
