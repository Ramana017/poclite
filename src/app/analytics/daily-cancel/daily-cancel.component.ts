import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-daily-cancel',
  templateUrl: './daily-cancel.component.html',
  styleUrls: ['./daily-cancel.component.sass']
})
export class DailyCancelComponent implements OnInit {
  public userData: any;
  public cancelledHoursList = [];
  public lowerBound: number = 1;
  public upperBound: number = 20;
  public perpage: number = 20;
  public totalRecordsCount: number = 0;
  public jobsuccessrunDate = '';

  constructor(private http: HttpClient, private dashboardService: DashboardService, public modalService: BsModalService, public datePipe: DatePipe) {
    this.userData = JSON.parse(sessionStorage.getItem('useraccount'));
  }
  ngOnInit(): void {
    this.getRVPList();
    this.getJobSuccessRunDate();
  }
  public getJobSuccessRunDate() {
    try {
      this.dashboardService.getJobSuccessRunDate().subscribe(res => {
        this.jobsuccessrunDate = res.cancelledVisitsJobDate;
        this.applyjobDate = this.datePipe.transform(res.cancelledVisitsJobDate, 'MM/dd/yyyy');
        this.jobRunDate = new Date(res.cancelledVisitsJobDate)
        this.getCancelledVisits();
      })
    } catch (error) {

    }
  }

  public getCancelledVisits() {
    try {
      let obj = { "userId": this.userData.userId, "userTypeId": 0, "siteIds": this.appliedSitelist.toString(), "rvpIds": this.appliedRvpList.toString(), "edIds": this.appliedEdsList.toString(), "bmIds": this.appliedBrancheslist.toString(), "jobRunDate": this.applyjobDate, "lowerBound": this.lowerBound, "upperBound": this.upperBound };

      this.dashboardService.getCancelledVisits(JSON.stringify(obj)).subscribe(res => {
        this.cancelledHoursList = res.cancelledHoursList;
        this.totalRecordsCount = res.totalRecordsCount;
      })

    } catch (error) {

    }
  }


  public perpageChange() {
    this.lowerBound = 1;
    this.upperBound = this.perpage;
    this.getCancelledVisits();

  }
  public nextPage() {
    this.lowerBound = this.lowerBound + this.perpage;
    this.upperBound = this.upperBound + this.perpage;
    this.getCancelledVisits();

  }
  public prevPage() {
    this.lowerBound = this.lowerBound - this.perpage;
    this.upperBound = this.upperBound - this.perpage;
    this.getCancelledVisits();

  }
  public downloadArray = []

  private downLoadLowerbound: number = 1;
  private downLoadUpperbound: number = 10;
  public onDownload() {
    this.downLoadLowerbound = 1;
    this.downLoadUpperbound = 25000;
    this.downloadArray = [];
    this.mappedJson = []
    this.downLoad();
  }
  public mappedJson = []
  public downLoad() {



    try {

      let obj = { "userId": this.userData.userId, "userTypeId": 0, "siteIds": this.appliedSitelist.toString(), "rvpIds": this.appliedRvpList.toString(), "edIds": this.appliedEdsList.toString(), "bmIds": this.appliedBrancheslist.toString(), "jobRunDate": this.applyjobDate, "lowerBound": this.downLoadLowerbound, "upperBound": this.downLoadUpperbound };
      this.dashboardService.getCancelledVisits(JSON.stringify(obj)).subscribe(res => {
        this.downloadArray = res.cancelledHoursList;
        let data = []
        data = this.downloadArray.map(item => {
          return {
            "RVP": item?.rvp,
            "ED": item?.ed,
            "BRANCH": item?.branch,
            "OPERATION#": item?.operation,
            "OPERATION_NAME": item?.operationName,
            "SITE#": item?.site,
            "SITE_NAME": item?.siteName,
            "MRN": item?.mrn,
            "PS_ACCT#": item?.psAccountNumber,
            "PS_LAST_NAME": item?.psLastName,
            "PS_FIRST_NAME": item?.psFirstName,
            "PS_MI": item?.psMidleName,
            "PS_COORDINATOR": item?.psCoordinator,
            "SERVICE_CODE": item?.serviceCode,
            "SERVICE_CODE_DESCRIPTION": item?.serviceCodeDescription,
            "PAYOR_PLAN": item?.payorPlan,
            "PAYOR_PLAN_DESCRIPTION": item?.payorPlanDescription,
            "VISIT_START_DATE_TIME": item?.visitStartDateTime,
            "VISIT_END_DATE_TIME": item?.visitEndDateTime,
            "VISIT_DURATION_IN_HRS": item?.visitDurationInHrs,
            "CANCELLATION_REASON": item?.cancellationReason,
            "VISIT_COMMENTS": item?.visitComments,
            "CANCELLATION_DATE_TIME": item?.cancellationDateTime,
            "VISIT_STATUS": item?.visitStatus,
            "SCHEDULED_REVENUE": item?.scheduledRevenue,
            "CLIENT_CLASS": item?.clientClass,
            "CLIENT_CLASS_DESC": item?.clientClassDesc
          }
        })
        console.log("data", data);
        console.log("mappedJson", this.mappedJson)
        this.mappedJson = [...this.mappedJson, ...data]

        if (this.downLoadUpperbound >= this.totalRecordsCount) {
          var wscols = [
            { wch: 25 },
            { wch: 25 },
            { wch: 25 },
            { wch: 10 },
            { wch: 22 },
            { wch: 8 },
            { wch: 25 },
            { wch: 25 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },

          ];

          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.mappedJson);
          worksheet["!cols"] = wscols
          const workbook: XLSX.WorkBook = { Sheets: { 'ALL_Cancelled_Visits': worksheet }, SheetNames: ['ALL_Cancelled_Visits'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          let name = 'ALL_Cancelled_Visits_' + this.datePipe.transform(this.applyjobDate, 'MM_dd_yyyy')
          this.saveAsExcelFile(excelBuffer, name);
        }
        else {
          if (this.downLoadUpperbound < this.totalRecordsCount) {
            this.downLoadLowerbound = this.downLoadUpperbound + 1;
            this.downLoadUpperbound = this.downLoadUpperbound + 25000;
            if (this.downLoadUpperbound > this.totalRecordsCount) {
              this.downLoadUpperbound = this.totalRecordsCount;
            }
          }
          this.downLoad();
        }
      })

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
      Swal.fire('', `Job run date cannot be greater than ${this.datePipe.transform(this.jobsuccessrunDate, 'MM/dd/yyyy')}`, 'warning')
    } else {
      this.appliedRvpList = this.selectedRvpList.map(x => x.operationOfficer);
      this.appliedEdsList = this.selectedEdList.map(x => x.executiveDirector);
      this.appliedBrancheslist = this.selectedBranches.map(x => x.branchManager);
      this.appliedSitelist = this.selectedSites.map(x => x.siteId);
      this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');
      this.modelRef.hide();
      this.getCancelledVisits();
    }
  }


  public openFilter(template: TemplateRef<any>) {
    this.modelRef = this.modalService.show(template, {
      class: 'stats-filter modal-lg mb-0',
    })
  }

}
