import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PSRegistrationService } from 'src/app/services/PS-registarion.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';
import { PsServiceService } from '../ps-service.service';

@Component({
  selector: 'app-ps-home',
  templateUrl: './ps-home.component.html',
  styleUrls: ['./ps-home.component.sass']
})
export class PsHomeComponent implements OnInit {

  public psList: any = [];

  public psLowerBound: number = 1;
  public psUpperBound: number = 20;
  public psPerPage: number = 20;
  public pstotalRecordsCount: number = 0;
  private userId: number;
  public psId = null;
  public widgetArray: Array<boolean> = [false, false, false, false];
  public psListArray: Array<any>;



  constructor( public psService: PsServiceService,
    public apiService: ApiserviceService,
    public userDetailService:UserdetailsService,
   ) {
      let data: any = JSON.parse(sessionStorage.getItem('useraccount'));
      this.userId = data.userId;
     }

  ngOnInit(): void {
    this.getPsList();
    this.getPsListFilter();
  }
  public getPsList() {
    console.log(this.psId==null,this.psId)
    this.psList = [];
    let parameters = {userId: this.userId,lowerBound: this.psLowerBound, psId: this.psId != null?this.psId:0,upperBound: this.psUpperBound };
    console.log(parameters);
    this.psService.getPSList(JSON.stringify(parameters)).subscribe((res) => {
        let data: any = res;
        this.psList = data.psList;
        this.pstotalRecordsCount = data.totalRecordsCount;
        console.log(this.psList);
      });
  }
  public getPsListFilter() {
    this.psList = [];
    let parameters = {userId: this.userId};
    console.log(parameters);
    this.psService.getPSList(JSON.stringify(parameters)).subscribe((res) => {
        let data: any = res;
        this.psService.PsList = data.psList;
        console.log(this.psList);
      });
  }
  public psPageNext() {
    this.psLowerBound = this.psLowerBound + this.psPerPage;
    this.psUpperBound = this.psUpperBound + this.psPerPage;
    this.getPsList();
  }
  public psPagePrev() {
    this.psLowerBound = this.psLowerBound - this.psPerPage;
    this.psUpperBound = this.psUpperBound - this.psPerPage;
    console.log(this.psUpperBound, this.psLowerBound, this.psPerPage);
    this.getPsList();
  }
  public pspagereset(): void {
    this.psLowerBound = 1;
    this.psUpperBound = this.psPerPage;
    this.getPsList();
  }
 // minimize and maximize screens
 public widgetReSize(flag, widgetName) {
  if (widgetName == 'ps') {
    flag
      ? (this.widgetArray = [true, false, false, false])
      : (this.widgetArray = [false, false, false, false]);
  }
  if (widgetName == 'admissions') {
    flag
      ? (this.widgetArray = [false, true, false, false])
      : (this.widgetArray = [false, false, false, false]);
  }
  if (widgetName == 'authorization') {
    flag
      ? (this.widgetArray = [false, false, true, false])
      : (this.widgetArray = [false, false, false, false]);
  }
  if (widgetName == 'dcs') {
    flag
      ? (this.widgetArray = [false, false, false, true])
      : (this.widgetArray = [false, false, false, false]);
  }
}
}
