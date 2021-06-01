import { Component, OnInit } from '@angular/core';
import { PsServiceService } from '../ps-service.service';

@Component({
  selector: 'app-ps-admissions',
  templateUrl: './ps-admissions.component.html',
  styleUrls: ['./ps-admissions.component.sass']
})
export class PsAdmissionsComponent implements OnInit {
  public psListArray: Array<any>;
  public widgetArray: Array<boolean> = [false, false, false, false];
  public admissionsList: any = [];
  private userId: number;
  public admissionLowerBound: number = 1;
  public admissionUpperBound: number = 20;
  public admissionPerPage: number = 20;
  public admissionId: number = null;
  public admissiontotalRecordsCount: number;


  constructor(public psService: PsServiceService) {
    let data: any = JSON.parse(sessionStorage.getItem('useraccount'));
    this.userId = data.userId;

   }

  ngOnInit(): void {
    this.getAdmissionsList()
  }
  public getAdmissionsList() {
    let params = {
      userId: this.userId,psId: this.admissionId==null?0:this.admissionId,lowerBound: this.admissionLowerBound,upperBound: this.admissionUpperBound,
    };
    this.psService
      .getAdmissionsList(JSON.stringify(params))
      .subscribe((res) => {
        console.log(res);
        let data: any = res;
        this.admissionsList = data.admissionList;
        this.admissiontotalRecordsCount = data.totalRecordsCount;
      });
  }
  public admissionPageNext() {
    this.admissionLowerBound = this.admissionLowerBound + this.admissionPerPage;
    this.admissionUpperBound = this.admissionUpperBound + this.admissionPerPage;
    this.getAdmissionsList();
  }
  public admissionPagePrev() {
    this.admissionLowerBound = this.admissionLowerBound - this.admissionPerPage;
    this.admissionUpperBound = this.admissionUpperBound - this.admissionPerPage;
    console.log(
      this.admissionUpperBound,
      this.admissionLowerBound,
      this.admissionPerPage
    );
    this.getAdmissionsList();
  }
  public admissionpagereset(): void {
    this.admissionLowerBound = 1;
    this.admissionUpperBound = this.admissionPerPage;
    this.getAdmissionsList();
  }

}
