import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
declare var $: any;
import * as d3 from 'd3';
import * as GaugeChart from 'gauge-chart';
import { PSRegistrationService } from 'src/app/services/PS-registarion.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    public apiService: ApiserviceService,
    private zipcode: PSRegistrationService,
    public userDetailService:UserdetailsService,
    private _router:Router
  ) {
    let data: any = JSON.parse(sessionStorage.getItem('useraccount'));
    this.userId = data.userId;
    let useraccount = sessionStorage.getItem('useraccount');
    let mapkey=sessionStorage.getItem('mapsApiKey');
    let logindata=sessionStorage.getItem(btoa('logindetils'));

    sessionStorage.clear();
    sessionStorage.setItem('useraccount', useraccount);
    sessionStorage.setItem('mapsApiKey',mapkey);
    sessionStorage.setItem(btoa('logindetils'),logindata);
  }
  @ViewChild('autops') autops;
  @ViewChild('autodcs') autodcs;
  @ViewChild('autoauth') autoauth;
  @ViewChild('autoadm') autoadm;

  public AdmissonAutoFill: string;
  public AuthorizationsFill: string;

  public dcsList: any = [];
  public visitsData = [];
  public authorizationList: any = [];
  public psList: any = [];
  public admissionsList: any = [];
  public pskeyword = 'PSName';
  public authorizationkeyword = 'PSName';
  public dcskeyword = 'dcsName';
  private userId: number;
  public visitsList: any;
  public scrollData: any;
  //paginationVariables
  public psLowerBound: number = 1;
  public psUpperBound: number = 20;
  public psPerPage: number = 20;
  public dcsLowerBound: number = 1;
  public dcsUpperBound: number = 20;
  public dcsPerPage: number = 20;
  public admissionLowerBound: number = 1;
  public admissionUpperBound: number = 20;
  public admissionPerPage: number = 20;
  public authorizationLowerBound = 1;
  public authorizationUpperBound: number = 20;
  public authorizationPerPage: number = 20;
  public pstotalRecordsCount: number = 0;

  public dcstotalRecordsCount: number;
  public admissiontotalRecordsCount: number;
  public authorizationtotalRecordsCount: number;

  public dcsId: number = 0;
  public psId = 0;
  public authorizationId: number = 0;
  public admissionId: number = 0;
  public psListArray: Array<any>;
  public dcsListArray: Array<any>;
  public widgetArray: Array<boolean> = [false, false, false, false];

  ngOnInit() {
    this.resize();
    this.getPsList();
    this.getAdmissionsList();
    this.getAuthorizationList();
    this.getDcsList();
    this.getPsListFilter();
    this.getDcsListFilter();

  }

  // dcs
  public selectAdmissionListByDcsId(e, flag) {
    flag ? (this.admissionId = e.PSId) : (this.admissionId = 0);
    flag ? '' : this.autoadm.close();
    flag ? (this.AdmissonAutoFill = e.PSName) : '';

    this.getAdmissionsList();
  }

  public selectDcsListByDcsId(e, flag) {
    flag ? (this.dcsId = e.dcsId) : (this.dcsId = 0);
    flag ? '' : this.autodcs.close();
    this.getDcsList();
  }
  public getDcsList() {
    const userData = {
      userId: this.userId,
      dcsId: this.dcsId,
      lowerBound: this.dcsLowerBound,
      upperBound: this.dcsUpperBound,
    };
    this.dashboardService
      .getDcsList(JSON.stringify(userData))
      .subscribe((res) => {
        let data: any = res;
        console.log(res);
        this.dcsList = data.dcsList;
        this.dcstotalRecordsCount = data.totalRecordsCount;
      });
  }
  // Authorization
 public  getAuthorizationList() {
    const userData = {
      userId: this.userId,
      psId: this.authorizationId,
      lowerBound: '1',
      upperBound: '10',
    };
    this.dashboardService
      .getAuthorizationsList(JSON.stringify(userData))
      .subscribe((res) => {
        let data: any = res;
        this.authorizationList = data.authServiceList;
        this.authorizationtotalRecordsCount = data.totalRecordsCount;
      });
  }

  public selectAuthorizationByPsId(e, flag) {
    flag ? (this.authorizationId = e.PSId) : (this.authorizationId = 0);
    flag ? '' : this.autoauth.close();
    flag ? (this.AuthorizationsFill = e.PSName) : '';
    this.getAuthorizationList();
  }

  public getPsList() {
    this.psList = [];
    let parameters = {
      userId: this.userId,
      lowerBound: this.psLowerBound,
      psId: this.psId,
      upperBound: this.psUpperBound,
    };
    console.log(parameters);
    this.zipcode
      .getPSListForCEAT(JSON.stringify(parameters))
      .subscribe((res) => {
        let data: any = res;
        this.psList = data.psList;
        this.pstotalRecordsCount = data.totalRecordsCount;
        console.log(this.psList);
      });
  }
  // Admissions
  public getAdmissionsList() {
    let params = {
      userId: this.userId,
      psId: this.admissionId,
      lowerBound: this.admissionLowerBound,
      upperBound: this.admissionUpperBound,
    };
    this.dashboardService
      .getAdmissionsList(JSON.stringify(params))
      .subscribe((res) => {
        console.log(res);
        let data: any = res;
        this.admissionsList = data.admissionList;
        this.admissiontotalRecordsCount = data.totalRecordsCount;
      });
  }
  public selectFilterEvent(e?, flag?) {
    flag ? (this.psId = e.PSId) : (this.psId = 0);
    flag ? '' : this.autops.close();
    this.getPsList();
  }
  public getPsListFilter() {
    this.psList = [];
    let parameters = { userId: this.userId };
    console.log(parameters);
    this.zipcode
      .getPSListForCEAT(JSON.stringify(parameters))
      .subscribe((res) => {
        let data: any = res;
        this.psListArray = data.psList;
      });
  }
  public getDcsListFilter() {
    const userData = { userId: this.userId };
    this.dashboardService
      .getDcsList(JSON.stringify(userData))
      .subscribe((res) => {
        let data: any = res;
        console.log(res);
        this.dcsListArray = data.dcsList;
      });
  }
// for UI maximize and minimize
 public  resize() {
    $('.max-1,.max-2,.max-3,.max-4').click(function () {
      $(this).parent().parent().parent().parent().parent().siblings().hide();
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .siblings()
        .hide();
      $(this).parent().parent().parent().parent().css({ height: '87vh' });
      $('.widget-block').find('.table-responsive').addClass('table-resize');
      $('.cms-widget,.scrolling-alerts').hide();

      if (
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .hasClass('col-md-6')
      ) {
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('col-md-12');
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .removeClass('col-md-6');
      }
    });

    $('.min-1,.min-2,.min-3,.min-4').click(function () {
      $(this).parent().parent().parent().parent().parent().siblings().show();
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .siblings()
        .show();
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .css({ height: '', width: '' });
      $('.widget-block').find('.table-responsive').removeClass('table-resize');
      $('.cms-widget,.scrolling-alerts').show();

      if (
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .hasClass('col-md-12')
      ) {
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('col-md-6');
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .removeClass('col-md-12');
      }
    });
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

  //pagination methods
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
  public dcsPageNext() {
    this.dcsLowerBound = this.dcsLowerBound + this.dcsPerPage;
    this.dcsUpperBound = this.dcsUpperBound + this.dcsPerPage;
    this.getDcsList();
  }
  public dcsPagePrev() {
    this.dcsLowerBound = this.dcsLowerBound - this.dcsPerPage;
    this.dcsUpperBound = this.dcsUpperBound - this.dcsPerPage;
    console.log(this.dcsUpperBound, this.dcsLowerBound, this.dcsPerPage);
    this.getDcsList();
  }
  public dcspagereset(): void {
    this.dcsLowerBound = 1;
    this.dcsUpperBound = this.dcsPerPage;
    this.getDcsList();
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
  public authorizationPageNext() {
    this.authorizationLowerBound =
      this.authorizationLowerBound + this.authorizationPerPage;
    this.authorizationUpperBound =
      this.authorizationUpperBound + this.authorizationPerPage;
    this.getAuthorizationList();
  }
  public authorizationPagePrev() {
    this.authorizationLowerBound =
      this.authorizationLowerBound - this.authorizationPerPage;
    this.authorizationUpperBound =
      this.authorizationUpperBound - this.authorizationPerPage;
    console.log(
      this.authorizationUpperBound,
      this.authorizationLowerBound,
      this.authorizationPerPage
    );
    this.getAuthorizationList();
  }
  public authorizationpagereset(): void {
    this.authorizationLowerBound = 1;
    this.authorizationUpperBound = this.authorizationPerPage;
    this.getAuthorizationList();
  }
  public updatePS(index){

    this._router.navigateByUrl('update/ps');
    console.log(this.psList[index])
  }
}
