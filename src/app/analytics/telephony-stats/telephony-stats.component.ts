import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import * as FileSaver from 'file-saver';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';
declare var $: any;
import * as XLSX from 'xlsx';
import * as moment from 'moment';


@Component({
  selector: 'app-telephony-stats',
  templateUrl: './telephony-stats.component.html',
  styleUrls: ['./telephony-stats.component.sass']
})
export class TelephonyStatsComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private datePipe: DatePipe, public modalService: BsModalService) {
    this.userData = JSON.parse(sessionStorage.getItem('useraccount'));
    this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');

  }
  public telephonyStatsList: Array<any> = [
    {
      "period": "July     2020",
      "manualPunches": 2614,
      "missingPunchesPercent": "0.0",
      "telephonyLandlinePunches": 2355,
      "siteName": "RCHC GA AUGUSTA REG",
      "totalPunches": 10221,
      "rvp": "COASTAL",
      "branch": "BR: RCHC GA AUGUSTA",
      "telephonyAppPunches": 5252,
      "site": 1244,
      "missingPunches": -327,
      "state": "GA",
      "totalExpectedPunches": 9894,
      "ed": "ED: RCHC GA EAST"
      },
      {
      "period": "August   2020",
      "manualPunches": 2125,
      "missingPunchesPercent": "0.0",
      "telephonyLandlinePunches": 2115,
      "siteName": "RCHC GA AUGUSTA REG",
      "totalPunches": 9327,
      "rvp": "COASTAL",
      "branch": "BR: RCHC GA AUGUSTA",
      "telephonyAppPunches": 5087,
      "site": 1244,
      "missingPunches": -205,
      "state": "GA",
      "totalExpectedPunches": 9122,
      "ed": "ED: RCHC GA EAST"
      },
      {
      "period": "September2020",
      "manualPunches": 2312,
      "missingPunchesPercent": "0.0",
      "telephonyLandlinePunches": 1796,
      "siteName": "RCHC GA AUGUSTA REG",
      "totalPunches": 9166,
      "rvp": "COASTAL",
      "branch": "BR: RCHC GA AUGUSTA",
      "telephonyAppPunches": 5058,
      "site": 1244,
      "missingPunches": -268,
      "state": "GA",
      "totalExpectedPunches": 8898,
      "ed": "ED: RCHC GA EAST"
      },
      {
      "period": "October  2020",
      "manualPunches": 1998,
      "missingPunchesPercent": "0.0",
      "telephonyLandlinePunches": 1457,
      "siteName": "RCHC GA AUGUSTA REG",
      "totalPunches": 9025,
      "rvp": "COASTAL",
      "branch": "BR: RCHC GA AUGUSTA",
      "telephonyAppPunches": 5570,
      "site": 1244,
      "missingPunches": -127,
      "state": "GA",
      "totalExpectedPunches": 8898,
      "ed": "ED: RCHC GA EAST"
      },
      {
      "period": "November 2020",
      "manualPunches": 1622,
      "missingPunchesPercent": "0.0",
      "telephonyLandlinePunches": 1416,
      "siteName": "RCHC GA AUGUSTA REG",
      "totalPunches": 8307,
      "rvp": "COASTAL",
      "branch": "BR: RCHC GA AUGUSTA",
      "telephonyAppPunches": 5269,
      "site": 1244,
      "missingPunches": -127,
      "state": "GA",
      "totalExpectedPunches": 8180,
      "ed": "ED: RCHC GA EAST"
      },
      {
      "period": "December 2020",
      "manualPunches": 1370,
      "missingPunchesPercent": "0.0",
      "telephonyLandlinePunches": 1435,
      "siteName": "RCHC GA AUGUSTA REG",
      "totalPunches": 8163,
      "rvp": "COASTAL",
      "branch": "BR: RCHC GA AUGUSTA",
      "telephonyAppPunches": 5358,
      "site": 1244,
      "missingPunches": -29,
      "state": "GA",
      "totalExpectedPunches": 8134,
      "ed": "ED: RCHC GA EAST"
      },
      {
      "period": "January  2021",
      "manualPunches": 1228,
      "missingPunchesPercent": "1.2",
      "telephonyLandlinePunches": 1240,
      "siteName": "RCHC GA AUGUSTA REG",
      "totalPunches": 7542,
      "rvp": "COASTAL",
      "branch": "BR: RCHC GA AUGUSTA",
      "telephonyAppPunches": 5074,
      "site": 1244,
      "missingPunches": 90,
      "state": "GA",
      "totalExpectedPunches": 7632,
      "ed": "ED: RCHC GA EAST"
      },
      {
      "period": "February 2021",
      "manualPunches": 1128,
      "missingPunchesPercent": "0.0",
      "telephonyLandlinePunches": 1150,
      "siteName": "RCHC GA AUGUSTA REG",
      "totalPunches": 7086,
      "rvp": "COASTAL",
      "branch": "BR: RCHC GA AUGUSTA",
      "telephonyAppPunches": 4808,
      "site": 1244,
      "missingPunches": -102,
      "state": "GA",
      "totalExpectedPunches": 6984,
      "ed": "ED: RCHC GA EAST"
      },
      {
      "period": "March    2021",
      "manualPunches": 1184,
      "missingPunchesPercent": "0.0",
      "telephonyLandlinePunches": 1187,
      "siteName": "RCHC GA AUGUSTA REG",
      "totalPunches": 7466,
      "rvp": "COASTAL",
      "branch": "BR: RCHC GA AUGUSTA",
      "telephonyAppPunches": 5095,
      "site": 1244,
      "missingPunches": -6,
      "state": "GA",
      "totalExpectedPunches": 7460,
      "ed": "ED: RCHC GA EAST"
      },
      {
      "period": "April    2021",
      "manualPunches": 1025,
      "missingPunchesPercent": "0.0",
      "telephonyLandlinePunches": 1179,
      "siteName": "RCHC GA AUGUSTA REG",
      "totalPunches": 6937,
      "rvp": "COASTAL",
      "branch": "BR: RCHC GA AUGUSTA",
      "telephonyAppPunches": 4733,
      "site": 1244,
      "missingPunches": -71,
      "state": "GA",
      "totalExpectedPunches": 6866,
      "ed": "ED: RCHC GA EAST"
      },
  ];
    public userData: any;
  ngOnInit(): void {
    // this.getJobSuccessRunDate();
    this.getRVPList();
  }

  public getTelephonyStats() {
    let obj = { "userId": this.userData.userId, "userTypeId": 0, "siteIds": this.appliedSitelist.toString(), "rvpIds": this.appliedRvpList.toString(), "edIds": this.appliedEdsList.toString(), "bmIds": this.appliedBrancheslist.toString(), "jobRunDate": this.applyjobDate };
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
  public selectedRvpList = [];
  public edsList = [];
  public selectedEdList = [];
  public bmList = [];
  public selectedBranches = [];
  public siteList = [];
  public selectedSites = [];
  public modelRef: BsModalRef;



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
      Swal.fire('', `Job run date cannot be greater than ${this.datePipe.transform(this.jobsuccessrunDate, 'MM/dd/yyyy')}`, 'warning')
    } else {
      this.appliedRvpList = this.selectedRvpList.map(x => x.operationOfficer);
      this.appliedEdsList = this.selectedEdList.map(x => x.executiveDirector);
      this.appliedBrancheslist = this.selectedBranches.map(x => x.branchManager);
      this.appliedSitelist = this.selectedSites.map(x => x.siteId);
      this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');
      this.getTelephonyStats();
      this.modelRef.hide();
    }
  }


  public openFilter(template: TemplateRef<any>) {
    this.modelRef = this.modalService.show(template, {
      class: 'stats-filter modal-lg mb-0',
    })
  }

  exportexcel2(): void {
    let mappedJson = [];
    mappedJson = this.telephonyStatsList.map(item => {
      return {
        "SITE #": item?.site,
        "Site Name": item?.siteName,
        "RVP": item?.rvp,
        "ED": item?.ed,
        "Branch": item?.branch,
        "State": item?.state,
        "Period":item?.period?moment(item.period).format('MMMM  yyyy'):'',
        "Total Expected Punches": item?.totalExpectedPunches,
        "Total Punches": item?.totalPunches,
        "Missing Punches": item?.missingPunches,
        "Missing Punches Percent": item?.missingPunchesPercent,
        "Telephony Landline": item?.telephonyLandlinePunches,
        "Telephony App": item?.telephonyAppPunches,
        "Manual": item?.manualPunches,
      }
    });
    var wscols = [
      { wch: 10 },
      { wch: 25 },
      { wch: 15 },
      { wch: 25 },
      { wch: 25 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },

    ];
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mappedJson);
    worksheet["!cols"] = wscols
    const workbook: XLSX.WorkBook = { Sheets: { '2020&2021 TeleStats': worksheet }, SheetNames: ['2020&2021 TeleStats'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });


    // /* table id is passed over here */
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    let name = 'Telephony_Stats_ ' + this.datePipe.transform(this.applyjobDate, 'MM_dd_yyyy') ;
    this.saveAsExcelFile(excelBuffer, name);

    // XLSX.writeFile(wb, name);

  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'string' });
    /***********`
    *YOUR EXCEL FILE'S NAME
    */
    FileSaver.saveAs(data, fileName + '.xlsx');
  }
  public jobsuccessrunDate = '';
  public getJobSuccessRunDate() {
    try {
      this.dashboardService.getJobSuccessRunDate().subscribe(res => {
        this.jobsuccessrunDate = res.telephonyStatsJobDate
        this.applyjobDate = this.datePipe.transform(res.telephonyStatsJobDate, 'MM/dd/yyyy');
        this.jobRunDate = new Date(res.telephonyStatsJobDate)
        this.getTelephonyStats();
      })
    } catch (error) {

    }
  }
}
