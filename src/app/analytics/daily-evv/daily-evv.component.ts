import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IDataOptions, PivotView } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-daily-evv',
  templateUrl: './daily-evv.component.html',
  styleUrls: ['./daily-evv.component.sass']
})
export class DailyEvvComponent implements OnInit {
  @ViewChild('pivotview')
  public pivotObj: PivotView;
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
      showGrandTotals: true,


    };
  }



  public downloadArray = []
  public downLoad() {

    try {
      let mappedJson = [];

        this.downloadArray = this.telephonyByCareGiver;
        mappedJson = this.downloadArray.map(item => {
          return {
            "RVP": item.rvp,
            "ED": item.ed,
            "BRANCH": item.branch,
            "DCS_HOME_SITE#": item.dcsHomeSite,
            "SITE_NAME": item.siteName,
            "DCS_NAME":item.dcsName,
            "DCS_COORDINATOR": item.dcsCoordinator,
            "ENTERPRISE_ID": item.enterpriseId,
            "JOB_TITLE": item.jobTitle,
            "PERIOD": item.period,
            "TOTAL_EXPECTED_PUNCHES":item.totalExpectedPunches,
            "TOTAL_PUNCHES#": item.totalPunches,
            "MISSING_PUNCHES": item.missingPunches,
            "MISSING_PUNCHES_PERCENT":item.missingPunchesPercent,
            "TELEPHONY_LANDLINE_PUNCHES#": item.telephonyLandlinePunches,
            "TEL_LANDLINE_PERCENT": item.telephonyLandlinePercent,
            "TELEPHONY_APP_PUNCHES#":  item.telephonyAppPunches,
            "TEL_APP_PERCENT":item.telephonyAppPercent,
            "MANUAL_PUNCHES#":  item.manualPunches,
            "TEL_MANUAL_PERCENT": item.telephonyManualPercent,
            "Manual + missing":   item.manualPlusMissing,
            "EVV compliant": item.evvCompliant,
            "Compliance Status": item.complianceStatus,
        }
        })
        var wscols = [
          { wch: 22 },
          { wch: 20 },
          { wch: 22 },
          { wch: 10 },
          { wch: 22 },
          { wch: 22 },
          { wch: 20 },
          { wch: 20 },
          { wch: 15 },
          { wch: 30 },
          { wch: 30 },
          { wch: 25 },
          { wch: 10 },
          { wch: 25 },

        ];
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mappedJson);
        worksheet["!cols"]=wscols
        const workbook: XLSX.WorkBook = { Sheets: { 'Telephony by Caregiver': worksheet }, SheetNames: ['Telephony by Caregiver'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        let name='EVV Stats by Caregiver_Updated '+ this.datePipe.transform(this.applyjobDate,'MM_dd_yyy')
        this.saveAsExcelFile(excelBuffer, name);



    } catch (error) {

    }

  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'string' });
    /***********`
    *YOUR EXCEL FILE'S NAME
    */
    FileSaver.saveAs(data, fileName + '.xlsx');
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
    let date = new Date(this.jobsuccessrunDate);
    if (this.jobRunDate > date) {
      Swal.fire('', `Job run date cannot be greater than ${this.datePipe.transform(this.jobsuccessrunDate,'MM/dd/yyyy')}`, 'warning')
    } else {
    this.appliedRvpList = this.selectedRvpList.map(x => x.operationOfficer);
    this.appliedEdsList = this.selectedEdList.map(x => x.executiveDirector);
    this.appliedBrancheslist = this.selectedBranches.map(x => x.branchManager);
    this.appliedSitelist = this.selectedSites.map(x => x.siteId);
    this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');
    this.getTelephonyByCareGiver();
    this.modelRef.hide();
    }
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
