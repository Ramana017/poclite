import { Component, OnInit, TemplateRef } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IDataOptions } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-daily-evv',
  templateUrl: './daily-evv.component.html',
  styleUrls: ['./daily-evv.component.sass']
})
export class DailyEvvComponent implements OnInit {
  public display = [true, false, false];
  public userData: any;
  public jobsuccessrunDate = '';
  constructor(private http: HttpClient, private dashboardService: DashboardService, public modalService: BsModalService, public datePipe: DatePipe) {
    this.userData = JSON.parse(sessionStorage.getItem('useraccount'));
    this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');
  }

  ngOnInit(): void {
    this.getJobSuccessRunDate();
    this.getRVPList();
  }
  public getJobSuccessRunDate() {
    try {
      this.dashboardService.getJobSuccessRunDate().subscribe(res => {
        this.jobsuccessrunDate = res.evvStatsJobDate
        this.applyjobDate =this.datePipe.transform(res.evvStatsJobDate, 'MM/dd/yyyy');
        this.jobRunDate = new Date(res.evvStatsJobDate)
        this.getTelephonyByCareGiver();
      })
    } catch (error) {

    }
  }
  public dataSourceSettings: IDataOptions;
  public gridSettings: GridSettings;
  public sample() {
    this.gridSettings = {
      // columnWidth: 140,
      // height:500
      // height:10000
    } as GridSettings;
    this.dataSourceSettings = {
      enableSorting: true,
      expandAll: true,
      columns: [{ name: 'complianceStatus' }],
      values: [{ name: 'complianceStatus', caption: 'complianceStatus' }],
      dataSource: this.telephonyByCareGiver,
      rows: [{ name: 'branch', caption: 'Branch' }],
      filters: [],
      showRowGrandTotals: false,
      showColumnGrandTotals: false,
      showGrandTotals: false,


    };
  }
  exportexcel2(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    let element2 = document.getElementById('PivotView');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const ws2:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element2);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Telephony by Caregiver');
    XLSX.utils.book_append_sheet(wb, ws2, 'Branch Compliance status');

    /* save to file */
    let name='EVV Stats by Caregiver_Updated_'+this.datePipe.transform(this.applyjobDate,'MM_dd_yyyy')+'.xlsx'
    XLSX.writeFile(wb, name);

  }

  public telephonyByCareGiver = [];

  public getTelephonyByCareGiver() {
    let obj = { "userId": this.userData.userId, "userTypeId": 0, "siteIds": this.appliedSitelist.toString(), "rvpIds": this.appliedRvpList.toString(), "edIds": this.appliedEdsList.toString(), "bmIds": this.appliedBrancheslist.toString(), "jobRunDate": this.applyjobDate }
    try {
      this.dashboardService.getEVVStats(JSON.stringify(obj)).subscribe(res => {
        this.telephonyByCareGiver = res.EVVStatsList;
        this.sample();

        console.log(this.telephonyByCareGiver)
      }, err => {

      })
    } catch (error) {

    }
  }
  configs: any = {
    'rows': 'branch',
    'columns': 'complianceStatus'
  }
  config3: any = {
    rows: 'dcsCoordinator',
    columns: 'manualPlusMissing'
  };
  configs2: any = {
    'columns': 'branch,',
    'rows': this.config3
  };


  //filter Related variables and functionality.

  public jobRunDate: Date = new Date();
  public rvpList = [];
  public selectedRvpList = [];
  public edsList = [];
  public selectedEdList = [];
  public bmList = [];
  public selectedBranches = [];
  public siteList = [];
  public selectedSites = [];
  public modelRef: BsModalRef;
  public payorClass = [{ value: 'MD' }, { value: 'OG' }, { value: 'VA' }];
  public selectedPayorClass: Array<any> = this.payorClass;



  private appliedRvpList = [];
  private appliedEdsList = [];
  private appliedBrancheslist = [];
  private appliedSitelist = [];
  public applyjobDate: string = '';

  public getRVPList() {
    let obj = { "userId": this.userData.userId, "userTypeId": 0, "name": "" };
    try {
      this.dashboardService.getRVPList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.rvpList = res.rvpList;
      })
    } catch (error) {

    }
  }
  public getEDList() {
    this.selectedEdList = [];
    this.selectedBranches = [];
    this.selectedSites = [];
    console.log(this.selectedRvpList.map(x => x.operationOfficer).toString())
    if (this.selectedRvpList.length > 0) {
      try {
        let obj = { "userId": this.userData.userId, "userTypeId": 0, "name": "", "rvpIds": this.selectedRvpList.map(x => x.operationOfficer).toString() }

        this.dashboardService.getEDList(JSON.stringify(obj)).subscribe(res => {
          console.log(res);
          this.edsList = res.edList;

        })
      } catch (error) {

      }
    } else {
      this.edsList = [];

    }
  }
  public getBMList() {
    this.selectedBranches = [];
    this.selectedSites = [];
    if (this.selectedEdList.length > 0) {

      let obj = { "userId": this.userData.userId, "userTypeId": 0, "name": "", "rvpIds": this.selectedRvpList.map(x => x.operationOfficer).toString(), "edIds": this.selectedEdList.map(x => x.executiveDirector).toString() }
      try {
        this.dashboardService.getBMList(JSON.stringify(obj)).subscribe(res => {
          console.log(res);
          this.bmList = res.bmList;

        })
      } catch (error) {

      }
    }
  }
  public getSiteList() {
    this.selectedSites = [];

    if (this.selectedBranches.length > 0) {
      let obj = { "userId": this.userData.userId, "userTypeId": 0, "name": "", "rvpIds": this.selectedRvpList.map(x => x.operationOfficer).toString(), "edIds": this.selectedEdList.map(x => x.executiveDirector).toString(), "bmIds": this.selectedBranches.map(x => x.branchManager).toString() }
      try {
        this.dashboardService.getSiteList(JSON.stringify(obj)).subscribe(res => {
          console.log(res);
          this.siteList = res.siteList;

        })
      } catch (error) {

      }
    }
  }

  public onApply() {

    this.appliedRvpList = this.selectedRvpList.map(x => x.operationOfficer);
    this.appliedEdsList = this.selectedEdList.map(x => x.executiveDirector);
    this.appliedBrancheslist = this.selectedBranches.map(x => x.branchManager);
    this.appliedSitelist = this.selectedSites.map(x => x.siteId);
    this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');
    this.getTelephonyByCareGiver();
    this.modelRef.hide();

  }


  public openFilter(template: TemplateRef<any>) {
    this.modelRef = this.modalService.show(template, {
      class: 'stats-filter modal-lg mb-0',
    })
  }
}
export interface EVVStatsList {
  "EVVStatsList": Array<EVVStatsListobject>
}
export interface EVVStatsListobject {

  "period": string,
  "dcsHomeSite": number,
  "dcsCoordinator": string,
  "manualPunches": number,
  "missingPunchesPercent": number,
  "dcsName": string,
  "jobTitle": string,
  "telephonyLandlinePunches": number,
  "siteName": string,
  "complianceStatus": string,
  "totalPunches": number,
  "manualPlusMissing": number,
  "rvp": string,
  "branch": string,
  "telephonyAppPunches": number,
  "telephonyAppPercent": number,
  "telephonyLandlinePercent": number,
  "evvCompliant": number,
  "missingPunches": number,
  "enterpriseId": number,
  "telephonyManualPercent": number,
  "totalExpectedPunches": number,
  "ed": string

}
