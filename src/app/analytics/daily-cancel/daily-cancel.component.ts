import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-daily-cancel',
  templateUrl: './daily-cancel.component.html',
  styleUrls: ['./daily-cancel.component.sass']
})
export class DailyCancelComponent implements OnInit {
  public userData: any;
  public cancelledHoursList=[];
  public lowerBound:number=1;
  public upperBound:number=20;
  public perpage:number=20;
  public totalRecordsCount:number=0;

  constructor(private http: HttpClient, private dashboardService: DashboardService, public modalService: BsModalService, public datePipe: DatePipe) {
    this.userData = JSON.parse(sessionStorage.getItem('useraccount'));
    this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');
  }
  ngOnInit(): void {
    this.getRVPList();
    this.getCancelledVisits();
  }


  public getCancelledVisits() {
    try {
      let obj={"userId":this.userData.userId,"userTypeId":0,"siteIds":this.appliedSitelist.toString(),"rvpIds":this.appliedRvpList.toString(),"edIds":this.appliedEdsList.toString(),"bmIds":this.appliedBrancheslist.toString(),"jobRunDate":this.applyjobDate,"lowerBound":this.lowerBound,"upperBound":this.upperBound};

      this.dashboardService.getCancelledVisits(JSON.stringify(obj)).subscribe(res=>{
        this.cancelledHoursList=res.cancelledHoursList;
        this.totalRecordsCount=res.totalCount;
      })

    } catch (error) {

    }
  }


  public perpageChange(){
    this.lowerBound=1;
    this.upperBound=this.perpage;
    this.getCancelledVisits();

  }
  public nextPage(){
    this.lowerBound=this.lowerBound+this.perpage;
    this.upperBound=this.upperBound+this.perpage;
    this.getCancelledVisits();

  }
  public prevPage(){
    this.lowerBound=this.lowerBound-this.perpage;
    this.upperBound=this.upperBound-this.perpage;
    this.getCancelledVisits();

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

    this.appliedRvpList = this.selectedRvpList.map(x => x.operationOfficer);
    this.appliedEdsList = this.selectedEdList.map(x => x.executiveDirector);
    this.appliedBrancheslist = this.selectedBranches.map(x => x.branchManager);
    this.appliedSitelist = this.selectedSites.map(x => x.siteId);
    this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');
    this.modelRef.hide();
    this.getCancelledVisits();

  }


  public openFilter(template: TemplateRef<any>) {
    this.modelRef = this.modalService.show(template, {
      class: 'stats-filter modal-lg mb-0',
    })
  }

}
