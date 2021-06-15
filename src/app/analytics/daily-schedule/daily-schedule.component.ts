import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.sass']
})
export class DailyScheduleComponent implements OnInit {
  public userData:any;
  public lowerBound:number=1;
  public upperBound:number=20;
  public perpage:number=20;
  public totalRecordsCount:number=0;
  public jobsuccessrunDate='';

  constructor(private dashboardService:DashboardService,public modalService:BsModalService,public datePipe:DatePipe) {
    this.userData = JSON.parse(sessionStorage.getItem('useraccount'));
  }
  public scheduledHoursList=[];

  ngOnInit(): void {
    this.getRVPList();
    this.getJobSuccessRunDate();
  }
  public getJobSuccessRunDate() {
    try {
      this.dashboardService.getJobSuccessRunDate().subscribe(res => {
        this.jobsuccessrunDate = res.scheduledHoursJobDate;
        this.applyjobDate =this.datePipe.transform(res.scheduledHoursJobDate, 'MM/dd/yyyy');
        this.jobRunDate = new Date(res.scheduledHoursJobDate)
        this.getScheduledHours();
      })
    } catch (error) {

    }
  }
  public downloadArray = []
  public downLoad() {

    try {
      let mappedJson = [];
      let obj={"userId":this.userData.userId,"userTypeId":0,"siteIds":this.appliedSitelist.toString(),"rvpIds":this.appliedRvpList.toString(),"edIds":this.appliedEdsList.toString(),"bmIds":this.appliedBrancheslist.toString(),"jobRunDate":this.applyjobDate,"lowerBound":this.lowerBound,"upperBound":this.upperBound};

      this.dashboardService.getScheduledHours(JSON.stringify(obj)).subscribe(res => {
        this.downloadArray = res.scheduledHoursList;
        mappedJson = this.downloadArray.map(item => {
          return {
            "RVP": item?.rvp,
            "ED": item?.ed,
            "Branch": item?.branch,
            "Site": item?.site,
            "SiteName": item?.siteName,
            "PS": item?.ps,
            "MRN": item?.mrn,
            "Payor Plan": item?.payorPlan,
            "Fiscal Period Number":item?.fiscalPeriodNumber,
            "Scheduled Begin Date Time":item.scheduledBeginDateTime,
            "Scheduled End Date Time":item.scheduledEndDateTime,
            "Fiscal Day Name":item.fiscalDayName,
            "SCH Hours":item.scheduledHours,
            "Revenue Status":item.revenueStatus
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
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        let name='ScheduledHours_' + this.datePipe.transform(this.applyjobDate,'MM_dd_yyy')
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
public getScheduledHours(){
  try {
    let obj={"userId":this.userData.userId,"userTypeId":0,"siteIds":this.appliedSitelist.toString(),"rvpIds":this.appliedRvpList.toString(),"edIds":this.appliedEdsList.toString(),"bmIds":this.appliedBrancheslist.toString(),"jobRunDate":this.applyjobDate,"lowerBound":this.lowerBound,"upperBound":this.upperBound};

    this.dashboardService.getScheduledHours(JSON.stringify(obj)).subscribe(res=>{
      this.scheduledHoursList=res.scheduledHoursList;
      this.totalRecordsCount=res.totalRecordsCount;
    })

  } catch (error) {

  }
}

public perpageChange(){
  this.lowerBound=1;
  this.upperBound=this.perpage;
  this.getScheduledHours();

}
public nextPage(){
  this.lowerBound=this.lowerBound+this.perpage;
  this.upperBound=this.upperBound+this.perpage;
  this.getScheduledHours();

}
public prevPage(){
  this.lowerBound=this.lowerBound-this.perpage;
  this.upperBound=this.upperBound-this.perpage;
  this.getScheduledHours();

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
public payorClass=[{value:'MD'},{value:'OG'},{value:'VA'}];
public selectedPayorClass:Array<any>=this.payorClass;



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
    this.perpageChange();
    this.modelRef.hide();
  }
}


public openFilter(template:TemplateRef<any>){
 this.modelRef=this.modalService.show(template,{class:'stats-filter modal-lg mb-0',
})
}



}
