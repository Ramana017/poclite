import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/services/dashboard.service';
import { isObject } from 'util';

@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.sass']
})
export class DailyReportsComponent implements OnInit {
public userData:any;
public monthFlag=0;
  public navbuttons:Array<boolean>=[false,true,false];
  constructor(private dashboardService: DashboardService,private datePipe:DatePipe,private modalService:BsModalService) {
    this.userData = JSON.parse(sessionStorage.getItem('useraccount'));
    this.applyjobDate=this.datePipe.transform(this.jobRunDate,'MM/dd/yyyy');

  }
public dailyStatsList=[];

  ngOnInit(): void {
    this.getRVPList();
    this.getDailyUtilStats()
  }

public getDailyUtilStats(){

  try {
    let obj={ "userId": this.userData.userId, "monthFlag":this.monthFlag, "userTypeId": 0, "siteIds": this.appliedSitelist.toString(), "rvpIds": this.appliedRvpList.toString(), "edIds": this.appliedEdsList.toString(), "bmIds": this.appliedBrancheslist.toString(), "jobRunDate": this.applyjobDate };
    this.dashboardService.getDailyUtilStats(JSON.stringify(obj)).subscribe(res=>{
      console.log(res);
      this.dailyStatsList=res.dailyStatsList;
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
   public modelRef:BsModalRef;



   private appliedRvpList = [];
   private appliedEdsList = [];
   private appliedBrancheslist = [];
   private appliedSitelist = [];
   private applyjobDate:string='';

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
     this.selectedEdList=[];
     this.selectedBranches=[];
     this.selectedSites=[];
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
     }else{
     this.edsList=[];

     }
   }
   public getBMList() {
     this.selectedBranches=[];
     this.selectedSites=[];
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
     this.selectedSites=[];

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

   public onApply(){
     this.appliedRvpList= this.selectedRvpList;
    this.appliedEdsList= this.selectedEdList;
    this.appliedBrancheslist= this.selectedBranches;
    this.appliedSitelist= this.selectedSites;
     this.applyjobDate=this.datePipe.transform(this.jobRunDate,'MM/dd/yyyy');
     this.getDailyUtilStats();
     this.modelRef.hide();

   }


   public openFilter(template:TemplateRef<any>){
    this.modelRef=this.modalService.show(template,{class:'stats-filter modal-lg mb-0',
   })
   }

}
