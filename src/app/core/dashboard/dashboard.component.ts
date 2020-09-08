import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
declare var $: any;
import * as d3 from 'd3';
import * as  GaugeChart from 'gauge-chart';
import { ZipcodeService } from 'src/app/services/zipcode.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService, private zipcode: ZipcodeService) {
    let data: any = this.userId = JSON.parse(sessionStorage.getItem("useraccount"));
    this.userId = data.userId;
  }
  @ViewChild('autops') autops;

  public dcsList: any;
  public visitsData = [];
  public authorizationList: any;
  public psList: any;
  public admissionsList: any;
  public pskeyword = 'PSName';
  public authorizationkeyword = 'PSName';
  public dcskeyword = 'dcsName';
  private userId: number;
  public visitsList: any;
  private arrayData = ['scrolling alert message', 'sample text message scrolling', 'alert scrolling text']
  public scrollData: any;
  //paginationVariables
  public psLowerBound = 1;
  public psUpperBound = 20;
  public psPerPage = 20;
  public pstotalRecordsCount=0;
  public dcsLowerBound = 1;
  public dcsUpperBound = 20;
  public dcsPerPage = 5;
  public admissionLowerBound = 1;
  public admissionUpperBound = 20;
  public admissionPerPage = 5;
  public authorizationLowerBound = 1;
  public authorizationUpperBound = 20;
  public authorizationPerPage = 5;
  public dcstotalRecordsCount:number;
  public admissiontotalRecordsCount:number;
  public authorizationtotalRecordsCount:number



  public psId=0;

  ngOnInit() {
    this.scrollDataFun();
    this.resize();
    this.getPsList();
    this.getAdmissionsList();
    this.getAuthorizationList();
    this.getDcsList();
    // this.getVisitsList();
    // this.plotGaugeChat1();
  }

  public getVisitsByDcsId(e) {
    const userData = { psId: '0', dcsId: e.dcsId, fromDate: '', toDate: '', userId: this.userId };
    this.dashboardService.getVisitsList(JSON.stringify(userData)).subscribe((res) => {
      this.visitsList = res;
    });
  }

  getVisitsByPsId(e) {
    const userData = { psId: e.PSId, dcsId: '0', fromDate: '', toDate: '', userId: this.userId };
    this.dashboardService.getVisitsList(JSON.stringify(userData)).subscribe((res) => {
      this.visitsList = res;
    });
  }

  // dcs
  selectDcsListByDcsId(dcsId) {
    const userData = { dcsId: dcsId.dcsId, userId: this.userId };
    this.dashboardService.getDcsListByDcsId(JSON.stringify(userData)).subscribe((res) => {
      this.dcsList = res;
    });
  }
  getDcsList() {
    const userData = { "userId": this.userId, "lowerBound": this.psLowerBound, "upperBound": this.psUpperBound }
    this.dashboardService.getDcsList(JSON.stringify(userData)).subscribe((res) => {
      let data:any=res;
      console.log(res)
      this.dcsList = data.dcsList;
      this.dcstotalRecordsCount=data.totalRecordsCount;

    });
  }
  clearDcsList() {
    this.getDcsList();
  }
  // Authorization
  getAuthorizationList() {
    const userData = { "userId": this.userId, "lowerBound": "1", "upperBound": "10" }
    this.dashboardService.getAuthorizationsList(JSON.stringify(userData)).subscribe((res) => {
      // this.authorizationList = res;
      console.log(res)
    });
  }

  selectAuthorizationByPsId(PsId) {
    const userData = { psId: PsId.PSId, userId: this.userId };
    this.dashboardService.getAuthorizationsListByPsId(JSON.stringify(userData)).subscribe((res) => {
      this.authorizationList = res;
    });
  }
  clearAuthorizationList() {
    this.getAuthorizationList();
  }
  getPsList() {
    this.psList=[];
    let parameters = { 'userId': this.userId, 'lowerBound': this.psLowerBound,"psId":this.psId, 'upperBound': this.psUpperBound };
    console.log(parameters)
    this.zipcode.getPSListForCEAT(JSON.stringify(parameters)).subscribe((res) => {
      let data: any = res
      this.psList = data.psList;
      this.pstotalRecordsCount=data.totalRecordsCount;
      console.log(this.psList)
    });
  }
  // Admissions
  getAdmissionsList() {
    let params = { "userId": this.userId, "lowerBound": "1", "upperBound": "10" }
    this.dashboardService.getAdmissionsList(JSON.stringify(params)).subscribe((res) => {
      this.admissionsList = res;
    });
  }
  selectFilterEvent(e?,flag?) {
    flag ?this.psId=e.PSId:this.psId=0;
    flag?'':this.autops.close();
    this.getPsList();
  }
  inputClean() {
    this.getAdmissionsList();
  }

  resize() {
    $('.max-1,.max-2,.max-3,.max-4').click(function () {
      $(this).parent().parent().parent().parent().parent().siblings().hide();
      $(this).parent().parent().parent().parent().parent().parent().siblings().hide();
      $(this).parent().parent().parent().parent().css({ height: '83vh' });
      $('.widget-block').find('.table-responsive').addClass('table-resize');
      $('.cms-widget,.scrolling-alerts').hide();

      if ($(this).parent().parent().parent().parent().parent().hasClass('col-md-6')) {
        $(this).parent().parent().parent().parent().parent().addClass('col-md-12');
        $(this).parent().parent().parent().parent().parent().removeClass('col-md-6');
      }
    });

    $('.min-1,.min-2,.min-3,.min-4').click(function () {
      $(this).parent().parent().parent().parent().parent().siblings().show();
      $(this).parent().parent().parent().parent().parent().parent().siblings().show();
      $(this).parent().parent().parent().parent().css({ height: '', width: '' });
      $('.widget-block').find('.table-responsive').removeClass('table-resize');
      $('.cms-widget,.scrolling-alerts').show();

      if ($(this).parent().parent().parent().parent().parent().hasClass('col-md-12')) {
        $(this).parent().parent().parent().parent().parent().addClass('col-md-6');
        $(this).parent().parent().parent().parent().parent().removeClass('col-md-12');
      }
    });

    // $('.icon-toggle').click(function () {
    //   if ($(this).parent().siblings().hasClass('show')) {
    //     $(this).parent().siblings().addClass('hide');
    //     $(this).parent().siblings().removeClass('show');

    //   } else if ($(this).parent().siblings().hasClass('hide')) {
    //     $(this).parent().siblings().addClass('show');
    //     $(this).parent().siblings().removeClass('hide');
    //   }
    // });


    // var $slider = document.getElementById('slider');
    //     var $toggle = document.getElementById('toggle');
    //     $toggle.addEventListener('click', function() {
    //     var isOpen = $slider.classList.contains('slide-in');
    //     $slider.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
    // });
  }
// plotGaugeChat1() {
  //     GaugeChart.gaugeChart(document.getElementById('gpsGuage1'), 150, {
  //     hasNeedle: true,
  //     needleColor: 'gray',
  //     needleUpdateSpeed: 1000,
  //     arcColors: ['green', 'orange', 'red'],
  //     arcDelimiters: [10, 20],
  //   }).updateNeedle(43);
  //     this.plotGaugeChat2();
  // }

  // plotGaugeChat2() {
  //   GaugeChart.gaugeChart(document.getElementById('gpsGuage2'), 150, {
  //   hasNeedle: true,
  //   needleColor: 'gray',
  //   needleUpdateSpeed: 1000,
  //   arcColors: ['green', 'orange', 'red'],
  //   arcDelimiters: [10, 20],
  // }).updateNeedle(62);
  //   this.plotGaugeChat3();
  // }
  // plotGaugeChat3() {
  //   GaugeChart.gaugeChart(document.getElementById('gpsGuage3'), 150, {
  //   hasNeedle: true,
  //   needleColor: 'gray',
  //   needleUpdateSpeed: 1000,
  //   arcColors: ['green', 'orange', 'red'],
  //   arcDelimiters: [10, 20],
  // }).updateNeedle(45);
  //   this.plotGaugeChat4();
  // }
  // plotGaugeChat4() {
  //   GaugeChart.gaugeChart(document.getElementById('gpsGuage4'), 150, {
  //   hasNeedle: true,
  //   needleColor: 'gray',
  //   needleUpdateSpeed: 1000,
  //   arcColors: ['green', 'orange', 'red'],
  //   arcDelimiters: [10, 20],
  // }).updateNeedle(89);
  //   this.plotGaugeChat5();
  // }
  // plotGaugeChat5() {
  //   GaugeChart.gaugeChart(document.getElementById('gpsGuage5'), 150, {
  //   hasNeedle: true,
  //   needleColor: 'gray',
  //   needleUpdateSpeed: 1000,
  //   arcColors: ['green', 'orange', 'red'],
  //   arcDelimiters: [10, 20],
  // }).updateNeedle(32);
  //   this.plotGaugeChat6();
  // }
  // plotGaugeChat6() {
  //   GaugeChart.gaugeChart(document.getElementById('gpsGuage6'), 150, {
  //   hasNeedle: true,
  //   needleColor: 'gray',
  //   needleUpdateSpeed: 1000,
  //   arcColors: ['green', 'orange', 'red'],
  //   arcDelimiters: [10, 20],
  // }).updateNeedle(59);
  // }

  // visits
  // getVisitsList() {
  //   const userData = { psId: '0', dcsId: '0', fromDate: '', toDate: '', userId: this.userId };
  //   this.dashboardService.getVisitsList(JSON.stringify(userData)).subscribe((res) => {
  //     console.log(res)
  //     this.visitsList = res;
  //   });
  // }
  // clearVisits() {
  //   // this.getVisitsList();
  // }

  // getVisitsByData(e) {
  //   console.log(this.visitsData[0])
  //   const userData = { psId: '0', dcsId: '0', fromDate: this.visitsData[0], toDate: this.visitsData[1], userId: this.userId };
  //   this.dashboardService.getVisitsList(JSON.stringify(userData)).subscribe((res) => {
  //     this.visitsList = res;
  //   });

  // }
  icontoggle(i) {
    $('.icon-toggle').eq(i).parent().siblings("span").toggleClass('hide');
  }
  scrollDataFun() {
    const str = this.arrayData.join('  |  ');
    this.scrollData = str;
  }


  //pagination methods
  public psPageNext(){
   this.psLowerBound=this.psLowerBound+this.psPerPage;
   this.psUpperBound=this.psUpperBound+this.psPerPage;
   this.getPsList();
  }
  public psPagePrev(){
    this.psLowerBound=this.psLowerBound-this.psPerPage;
    this.psUpperBound=this.psUpperBound-this.psPerPage;
    console.log(this.psUpperBound,this.psLowerBound,this.psPerPage)
    this.getPsList();
   }
   public pspagereset(): void {
    this.psLowerBound = 1;
    this.psUpperBound = this.psPerPage;
    this.getPsList();
  }
  public dcsPageNext(){
    this.dcsLowerBound=this.dcsLowerBound+this.dcsPerPage;
    this.dcsUpperBound=this.dcsUpperBound+this.dcsPerPage;
    this.getDcsList();
   }
   public dcsPagePrev(){
     this.dcsLowerBound=this.dcsLowerBound-this.dcsPerPage;
     this.dcsUpperBound=this.dcsUpperBound-this.dcsPerPage;
     console.log(this.dcsUpperBound,this.dcsLowerBound,this.dcsPerPage)
     this.getDcsList();
    }
    public dcspagereset(): void {
     this.dcsLowerBound = 1;
     this.dcsUpperBound = this.dcsPerPage;
     this.getDcsList();
   }


}
