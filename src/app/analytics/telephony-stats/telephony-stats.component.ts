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
  public telephonyStatsList: Array<any> =[];
    public userData: any;
  ngOnInit(): void {
    this.getJobSuccessRunDate();
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
