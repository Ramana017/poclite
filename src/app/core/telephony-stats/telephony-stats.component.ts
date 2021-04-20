import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-telephony-stats',
  templateUrl: './telephony-stats.component.html',
  styleUrls: ['./telephony-stats.component.sass']
})
export class TelephonyStatsComponent implements OnInit {

  constructor(private dashboardService: DashboardService) {
    this.userData = JSON.parse(sessionStorage.getItem('useraccount'));
  }
  public telephonyStatsList: Array<any> = [];
  public userData: any;
  ngOnInit(): void {
    this.getTelephonyStats();
    this.getRVPList();
  }

  public getTelephonyStats() {
    let obj = { "userId": this.userData.userId, "userTypeId": 1, "siteIds": "", "rvpIds": "", "edIds": "", "bmIds": "", "jobRunDate": "04/19/2021" }
    try {
      this.dashboardService.getTelephonyStats(JSON.stringify(obj)).subscribe(res => {
        this.telephonyStatsList = res.telephonyStatsList;
      })
    } catch (error) {

    }
  }








  //filter Related variables and functionality.

  public jobRunDate: Date = new Date();
  public rvpList = [];
  public selectedRvpList=[];
  public edsList = [];
  public selectedEdList=[];
  public selectedBranches = [];
  public selectedSites = [];


  public getRVPList() {
    let obj = { "userId": 1, "userTypeId": 1, "name": "" };
    try {
      this.dashboardService.getRVPList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.rvpList=res.rvpList;
      })
    } catch (error) {

    }
  }
  public getEDList() {
    let obj = {"userId":1,"userTypeId":1,"name":"","rvpIds":"08701"}
    try {
      this.dashboardService.getEDList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.edsList=res.edList;

      })
    } catch (error) {

    }
  }
  public getBMList() {
    let obj = {"userId":1,"userTypeId":1,"name":"","rvpIds":"08701","edIds":"08658,08834"}
    try {
      this.dashboardService.getBMList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.selectedBranches=res.bmList;

      })
    } catch (error) {

    }
  }
  public getSiteList() {
    let obj ={"userId":1,"userTypeId":1,"name":"","rvpIds":"08701","edIds":"08658,08834","bmIds":"09140,09138"}
    try {
      this.dashboardService.getSiteList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.selectedSites=res.siteList;

      })
    } catch (error) {

    }
  }

}
