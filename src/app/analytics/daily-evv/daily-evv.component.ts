import { Component, OnInit ,TemplateRef} from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-daily-evv',
  templateUrl: './daily-evv.component.html',
  styleUrls: ['./daily-evv.component.sass']
})
export class DailyEvvComponent implements OnInit {
public display=[true,false,false];
public modelRef:BsModalRef;
public header=['RVP','ED','Branch','DCS Home Site#','Site Name','DCS Name','Dcs Coordinator','Enterprise Id','Job Title','Period','Total Expected Punches','Total Punches#','Missing Punches','Missing Punches Percent '
,'Telephony Landline Punches#','Tel Landline Percent','Telephony App Punches#','Tel App Percent','Manual Punches#','Tel Manual Percent ',' Manual + missing','EVV compliant','Compliance Status']
  constructor(private dashBoardService:DashboardService,public modalService:BsModalService) { }

  ngOnInit(): void {
this.getTelephonyByCareGiver();
  }

  public telephonyByCareGiver:Array<EVVStatsListobject>=[];

public getTelephonyByCareGiver(){
  let obj={"userId":7068,"userTypeId":0,"siteIds":"","rvpIds":"","edIds":"","bmIds":"","jobRunDate":"06/10/2021"}
  try {
    this.dashBoardService.getEVVStats(JSON.stringify(obj)).subscribe(res=>{
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
// interface telephonyByCareGiver {
//   "rvp": string,
//   "ed": string,
//   "branch":string,
//   "dcsHomeSite":number,
//   "siteName": string,
//   "dcsName": string,
//   "dcsCoordinator": string,
//   "enterpriseId": number,
//   "jobTitle": string,
//   "period": string,
//   "totalExpectedPunches":number,
//   "totalPunches": number,
//   "missingPunches": number,
//   "missingPunchesPercent":number,
//   "telephonyLandlinePunches": number,
//   "telLandLinePercent": number,
//   "telephonyAppPunches#": number,
//   "telAppPercent": number,
//   "manualPunches": number,
//   "telManualPercent":number,
//   "ManualMissing": string,
//   "evvCompliant": string,
//   "complianceStatus": string

// }
