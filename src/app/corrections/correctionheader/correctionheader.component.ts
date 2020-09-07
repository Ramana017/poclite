import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiserviceService } from 'src/app/services/apiservice.service';




@Component({
  selector: 'app-correctionheader',
  templateUrl: './correctionheader.component.html',
  styleUrls: ['./correctionheader.component.sass']
})
export class CorrectionheaderComponent implements OnInit {
  display = null;

  public gps: boolean = false;
  public invalidCaller: boolean = false;
  public ScheduleVariance: boolean = false;
  public travelTime: boolean = false;
  public mileage: boolean = false;
  public data:any;
  public exceptionnames: Array<string> = ['GPS Discrepancy ', 'Scheduled Variance', 'Invalid Caller ID', 'Travel Time Exception', 'Mileage Exception','Invalid Token'];
  public currentexceptionName: string;

  public displayArray :Array<boolean>= [false, false, false, false, false,false];
  public userId:number;
  public exceptionCount;


  constructor(private router: Router, public modalRef: BsModalRef, private _apiService: ApiserviceService, public modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.exceptionCount=0;
    this.displayArray[this.display] = true;
    this.currentexceptionName = this.exceptionnames[this.display];
    console.log("correctionHeader")
    var data = localStorage.getItem('userlist');
    if (data) {
      this.data = JSON.parse(data);
      this.userId=this.data
      console.log("data came in heder", this.data.depMileageException)
      if (this.data.ArrGpsException == 1 || this.data.DepGpsException == 1) {
        this.gps == true;
      }
      if (this.data.arrCallerIdException == 1 || this.data.depCallerIdException == 1) {
        this.invalidCaller == true;
      }
      if (this.data.scheduleVarException == 1) {
        this.ScheduleVariance == true;
      }
      if (this.data.arrTravelTimeException == 1) {
        this.travelTime == true;
      }
      if (this.data.depMileageException == 1 || this.data.arrMileageException == 1) {
        // console.log("mileage verified")
        this.mileage == true;
      }

    }
    this.exceptionCount=this.data.exceptionCount;


  }







  public SelectorDisplay(i) {
    this.displayArray.length = 0;
    this.display = null;

    for (let j = 0; j < 6; j++) {

      if (j == i) {
        this.displayArray.push(true)
        this.currentexceptionName = this.exceptionnames[i];
      } else {
        this.displayArray.push(false)
      }

    }
    console.log(this.displayArray)


  }

  public closeModel() {
    this.modalRef.hide();
    this._apiService.updateTable.next(true);
  }
}
