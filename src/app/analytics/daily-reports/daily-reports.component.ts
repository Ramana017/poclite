import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.sass']
})
export class DailyReportsComponent implements OnInit {
  public userData: any;
  public monthFlag = 0;
  public months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
  public currentMonth = new Date().getMonth();

  public navbuttons: Array<boolean> = [false, true, false];
  constructor(private dashboardService: DashboardService, private datePipe: DatePipe, private modalService: BsModalService) {
    this.userData = JSON.parse(sessionStorage.getItem('useraccount'));
    this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');

  }
  public grandtotal: any;
  public dailyStatsList = [];
  public jobsuccessrunDate = '';

  ngOnInit(): void {
    console.log(this.currentMonth, this.months[this.currentMonth])
    this.getRVPList();
    this.getJobSuccessRunDate();
  }

  public getJobSuccessRunDate() {
    try {
      this.dashboardService.getJobSuccessRunDate().subscribe(res => {
        this.jobsuccessrunDate = res.dailyUtilStatsJobDate
        this.applyjobDate = this.datePipe.transform(res.dailyUtilStatsJobDate, 'MM/dd/yyyy');
        this.jobRunDate = new Date(res.dailyUtilStatsJobDate)
        this.getDailyUtilStats();
      })
    } catch (error) {

    }
  }
  public getDailyUtilStats() {

    try {
      let obj = { "userId": this.userData.userId, "monthFlag": this.monthFlag, "userTypeId": 0, "siteIds": this.appliedSitelist.toString(), "rvpIds": this.appliedRvpList.toString(), "edIds": this.appliedEdsList.toString(), "bmIds": this.appliedBrancheslist.toString(), "jobRunDate": this.applyjobDate, "payorClass": this.appliedPayorClass.toString() };
      this.dashboardService.getDailyUtilStats(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.dailyStatsList = res.dailyStatsList;
        this.grandtotal = res?.gradndTotal;
      })
    } catch (error) {

    }
  }

  public onMonthChange(flag) {
    if (this.monthFlag != flag) {
      this.monthFlag = flag
      this.getDailyUtilStats();
    }

  }

  // file saving functionality

  exportexcel2(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet2');
    let name = 'Branch Scheduled Hours Breakdown_' + this.datePipe.transform(this.applyjobDate, 'MM_dd_yyyy') + '.xlsx'
    /* save to file */
    XLSX.writeFile(wb, name);

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
  public selectedPayorClass: Array<any> = []



  private appliedRvpList = [];
  private appliedEdsList = [];
  private appliedBrancheslist = [];
  private appliedSitelist = [];
  public applyjobDate: string = '';
  public appliedPayorClass = []


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
      Swal.fire('', `Job run date cannot be greater than ${this.jobsuccessrunDate}`, 'warning')
    } else {
      this.appliedRvpList = this.selectedRvpList.map(x => x.operationOfficer);
      this.appliedEdsList = this.selectedEdList.map(x => x.executiveDirector);
      this.appliedBrancheslist = this.selectedBranches.map(x => x.branchManager);
      this.appliedSitelist = this.selectedSites.map(x => x.siteId);
      this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');
      this.appliedPayorClass = this.selectedPayorClass.map(x => x.value);
      this.getDailyUtilStats();
      this.modelRef.hide();
    }
  }


  public openFilter(template: TemplateRef<any>) {
    this.modelRef = this.modalService.show(template, {
      class: 'stats-filter modal-lg mb-0',
    })
  }

}
