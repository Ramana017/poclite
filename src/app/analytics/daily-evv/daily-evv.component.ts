import { Component, OnInit ,TemplateRef} from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-daily-evv',
  templateUrl: './daily-evv.component.html',
  styleUrls: ['./daily-evv.component.sass']
})
export class DailyEvvComponent implements OnInit {
public display=[true,false,false];
public userData:any;
  constructor(private dashboardService:DashboardService,public modalService:BsModalService,public datePipe:DatePipe) {
    this.userData = JSON.parse(sessionStorage.getItem('useraccount'));
    this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');
  }

  ngOnInit(): void {
this.getTelephonyByCareGiver();
this.getRVPList();
  }

  public telephonyByCareGiver:Array<EVVStatsListobject>=[];

public getTelephonyByCareGiver(){
  let obj={"userId":this.userData.userId,"userTypeId":0,"siteIds":this.appliedSitelist.toString(),"rvpIds":this.appliedRvpList.toString(),"edIds":this.appliedEdsList.toString(),"bmIds":this.appliedBrancheslist.toString(),"jobRunDate":this.applyjobDate}
  try {
    this.dashboardService.getEVVStats(JSON.stringify(obj)).subscribe(res=>{
      this.telephonyByCareGiver=res.EVVStatsList;

      console.log(this.telephonyByCareGiver)
    },err=>{
      this.telephonyByCareGiver=[{
        "period": "June     ",
        "dcsHomeSite": 30017,
        "dcsCoordinator": "Blakely, Casey",
        "manualPunches": 0,
        "missingPunchesPercent": 100,
        "dcsName": "ADAMS, TONYA",
        "jobTitle": "Caregiver",
        "telephonyLandlinePunches": 0,
        "siteName": "RCHC GA TOCCOA",
        "complianceStatus": "Non Compliant",
        "totalPunches": 0,
        "manualPlusMissing": 100,
        "rvp": "COASTAL",
        "branch": "BR: RCHC GA TOCCOA",
        "telephonyAppPunches": 0,
        "telephonyAppPercent": 0,
        "telephonyLandlinePercent": 0,
        "evvCompliant": 0,
        "missingPunches": 20,
        "enterpriseId": 587185,
        "telephonyManualPercent": 0,
        "totalExpectedPunches": 20,
        "ed": "ED: RCHC GA EAST"
        }]
    })
  } catch (error) {

  }
}
configs: any = {
  'rows': 'branch',
  'columns': 'complianceStatus'
}
config3:any={
  rows:'dcsCoordinator',
  columns:'manualPlusMissing'
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

     this.appliedRvpList = this.selectedRvpList.map(x => x.operationOfficer);
     this.appliedEdsList = this.selectedEdList.map(x => x.executiveDirector);
     this.appliedBrancheslist = this.selectedBranches.map(x => x.branchManager);
     this.appliedSitelist = this.selectedSites.map(x => x.siteId);
     this.applyjobDate = this.datePipe.transform(this.jobRunDate, 'MM/dd/yyyy');
     this.getTelephonyByCareGiver();
     this.modelRef.hide();

 }


public openFilter(template:TemplateRef<any>){
  this.modelRef=this.modalService.show(template,{class:'stats-filter modal-lg mb-0',
})
}
}
export interface EVVStatsList {
  "EVVStatsList":Array<EVVStatsListobject>}
 export interface EVVStatsListobject{

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
