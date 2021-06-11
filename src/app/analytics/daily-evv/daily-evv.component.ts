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

  public telephonyByCareGiver:Array<telephonyByCareGiver>=[];

public getTelephonyByCareGiver(){
  try {
    this.dashBoardService.getTelephonyByCareGiver().subscribe(res=>{
      this.telephonyByCareGiver=res.telephonyByCaregiver;
      //this code to contral border styles its mandatory
      // this.display[0]=false;
      // setTimeout(()=>{
      //   this.display[0]=true;
      // },1)
      //*********************************** */
      console.log(this.telephonyByCareGiver)
    })
  } catch (error) {

  }
}
source= [
  {'author': 'Deba', 'book': 'Angular'},
  {'author': 'Deba', 'book': 'Physics'},
  {'author': 'Aditya', 'book': 'Angular'}
];
configs: any = {
  'rows': 'branch',
  'columns': 'complianceStatus'
};
public openFilter(template:TemplateRef<any>){
  this.modelRef=this.modalService.show(template,{class:'stats-filter modal-lg mb-0',
})
}
}

interface telephonyByCareGiver {
  "rvp": string,
  "ed": string,
  "branch":string,
  "dcsHomeSite":number,
  "siteName": string,
  "dcsName": string,
  "dcsCoordinator": string,
  "enterpriseId": number,
  "jobTitle": string,
  "period": string,
  "totalExpectedPunches":number,
  "totalPunches": number,
  "missingPunches": number,
  "missingPunchesPercent":number,
  "telephonyLandlinePunches": number,
  "telLandLinePercent": number,
  "telephonyAppPunches#": number,
  "telAppPercent": number,
  "manualPunches": number,
  "telManualPercent":number,
  "ManualMissing": string,
  "evvCompliant": string,
  "complianceStatus": string

}
