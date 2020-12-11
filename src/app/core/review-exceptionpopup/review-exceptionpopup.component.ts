import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-review-exceptionpopup',
  templateUrl: './review-exceptionpopup.component.html',
  styleUrls: ['./review-exceptionpopup.component.sass']
})
export class ReviewExceptionpopupComponent implements OnInit {
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
  public modalRef: BsModalRef;

  constructor(private router: Router, private _apiService: ApiserviceService, public modalService: BsModalService,public bsmodelRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.displayArray[this.display] = true;
    this.currentexceptionName = this.exceptionnames[this.display];
    console.log("correctionHeader")
    var data = localStorage.getItem('userlist');
    if (data) {
      this.data = JSON.parse(data);
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


  }






public parentChild(){
  console.log("parent component called");
  var data:any = JSON.parse(localStorage.getItem('userlist'));
  if (data) {
    console.log("data came in heder", data.depMileageException)
    if (data.ArrGpsException == 1 || data.DepGpsException == 1) {
      this.display=0;
    }
    else if (data.arrCallerIdException == 1 || data.depCallerIdException == 1) {
      this.display=2;
    }
    else if (data.scheduleVarException == 1) {
      this.display=1;
    }
    else if (data.arrTravelTimeException == 1) {
      this.display=3;
    }
    else if (data.depMileageException == 1 || data.arrMileageException == 1) {
      // console.log("mileage verified")
      this.display=4;
    }
    this.displayArray = [false, false, false, false, false,false];

    this.ngOnInit();
  }


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
    this.bsmodelRef.hide();
    //  this._apiService.updateTable.next(true);
  }

}
