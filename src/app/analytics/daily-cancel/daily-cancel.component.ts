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
  public downLoad() {

    try {
      let mappedJson = [];
      let obj = { "userId": this.userData.userId, "userTypeId": 0, "siteIds": this.appliedSitelist.toString(), "rvpIds": this.appliedRvpList.toString(), "edIds": this.appliedEdsList.toString(), "bmIds": this.appliedBrancheslist.toString(), "jobRunDate": this.applyjobDate, "lowerBound": 0, "upperBound": 0 };

      this.dashboardService.getCancelledVisits(JSON.stringify(obj)).subscribe(res => {
        this.downloadArray = res.cancelledHoursList;
        mappedJson = this.downloadArray.map(item => {
          return {
            "RVP": item?.rvp,
            "ED": item?.ed,
            "Branch": item?.branch,
            "Operation": item?.operation,
            "Operation Name": item?.operationName,
            "Site": item?.site,
            "SiteName": item?.siteName,
            "MRN": item?.mrn,
            "PS AccountNumber": item?.psAccountNumber,
            "PS LastName": item?.psLastName,
            "PS FirstName": item?.psFirstName,
            "PS MiddleName": item?.psMidleName,
            "PS Coordinator": item?.psCoordinator,
            "Service Code": item?.serviceCode,
            "Service Code Description": item?.serviceCodeDescription,
            "Payor Plan": item?.payorPlan,
            "Payor Plan Description": item?.payorPlanDescription,
            "VisitStart DateTime": item?.visitStartDateTime,
            "visit EndDateTime": item?.visitEndDateTime,
            "Visit DurationInHrs": item?.visitDurationInHrs,
            "Cancellation Reason": item?.cancellationReason,
            "Visit Comments": item?.visitComments,
            "Cancellation DateTime": item?.cancellationDateTime,
            "Visit Status": item?.visitStatus,
            "Scheduled Revenue": item?.scheduledRevenue,
            "Client Class": item?.clientClass,
            "Client ClassDesc": item?.clientClassDesc
          }
        })
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mappedJson);
        const workbook: XLSX.WorkBook = { Sheets: { 'ALL_Cancelled_Visits': worksheet }, SheetNames: ['ALL_Cancelled_Visits'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        let name='ALL_Cancelled_Visits_' + this.datePipe.transform(this.applyjobDate,'MM_dd_yyyy')
        this.saveAsExcelFile(excelBuffer, name);

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
      Swal.fire('', `Job run date cannot be greater than ${this.datePipe.transform(this.jobsuccessrunDate,'MM/dd/yyyy')}`, 'warning')
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
