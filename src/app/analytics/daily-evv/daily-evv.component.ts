import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-daily-evv',
  templateUrl: './daily-evv.component.html',
  styleUrls: ['./daily-evv.component.sass']
})
export class DailyEvvComponent implements OnInit {
public display=[true,false,false]
  constructor(private dashBoardService:DashboardService) { }

  ngOnInit(): void {
this.getTelephonyByCareGiver();
  }

  public telephonyByCareGiver:Array<telephonyByCareGiver>=[];

public getTelephonyByCareGiver(){
  try {
    this.dashBoardService.getTelephonyByCareGiver().subscribe(res=>{
      this.telephonyByCareGiver=res.telephonyByCaregiver;
      //this code to contral border styles its mandatory
      this.display[0]=false;
      setTimeout(()=>{
        this.display[0]=true;
      },1)
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
