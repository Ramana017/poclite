import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
declare var $: any;
import * as d3 from 'd3';
import * as  GaugeChart from 'gauge-chart';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  public dcsList: any;
  public visitsData=[];
  public authorizationList: any;
  public psList: any;
  public admissionsList: any;
  public pskeyword = 'PSName';
  public authorizationkeyword = 'PSName';
  public dcskeyword = 'dcsName';
  private userData: any;
  public visitsList: any;
  private arrayData =['scrolling alert message','sample text message scrolling','alert scrolling text']
  public scrollData: any;
  ngOnInit() {
    this.scrollDataFun();
    this.userData = { userId: '47' };
    this.resize();
    this.getPsList();
    this.getAdmissionsList();
    this.getAuthorizationList();
    this.getDcsList();
    // this.getVisitsList();
    this.plotGaugeChat1();
  }
plotGaugeChat1() {
    GaugeChart.gaugeChart(document.getElementById('gpsGuage1'), 150, {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['green', 'orange', 'red'],
    arcDelimiters: [10, 20],
  }).updateNeedle(43);
    this.plotGaugeChat2();
}

plotGaugeChat2() {
  GaugeChart.gaugeChart(document.getElementById('gpsGuage2'), 150, {
  hasNeedle: true,
  needleColor: 'gray',
  needleUpdateSpeed: 1000,
  arcColors: ['green', 'orange', 'red'],
  arcDelimiters: [10, 20],
}).updateNeedle(62);
  this.plotGaugeChat3();
}
plotGaugeChat3() {
  GaugeChart.gaugeChart(document.getElementById('gpsGuage3'), 150, {
  hasNeedle: true,
  needleColor: 'gray',
  needleUpdateSpeed: 1000,
  arcColors: ['green', 'orange', 'red'],
  arcDelimiters: [10, 20],
}).updateNeedle(45);
  this.plotGaugeChat4();
}
plotGaugeChat4() {
  GaugeChart.gaugeChart(document.getElementById('gpsGuage4'), 150, {
  hasNeedle: true,
  needleColor: 'gray',
  needleUpdateSpeed: 1000,
  arcColors: ['green', 'orange', 'red'],
  arcDelimiters: [10, 20],
}).updateNeedle(89);
  this.plotGaugeChat5();
}
plotGaugeChat5() {
  GaugeChart.gaugeChart(document.getElementById('gpsGuage5'), 150, {
  hasNeedle: true,
  needleColor: 'gray',
  needleUpdateSpeed: 1000,
  arcColors: ['green', 'orange', 'red'],
  arcDelimiters: [10, 20],
}).updateNeedle(32);
  this.plotGaugeChat6();
}
plotGaugeChat6() {
  GaugeChart.gaugeChart(document.getElementById('gpsGuage6'), 150, {
  hasNeedle: true,
  needleColor: 'gray',
  needleUpdateSpeed: 1000,
  arcColors: ['green', 'orange', 'red'],
  arcDelimiters: [10, 20],
}).updateNeedle(59);
}

  // visits
getVisitsList() {
const userData = {psId: '0', dcsId: '0', fromDate: '', toDate: '', userId: '47' };
this.dashboardService.getVisitsList(JSON.stringify(userData)).subscribe((res) => {
  console.log(res)
  this.visitsList = res;
});
}

getVisitsByDcsId(e) {
  const userData = {psId: '0', dcsId: e.dcsId, fromDate: '', toDate: '', userId: '47' };
  this.dashboardService.getVisitsList(JSON.stringify(userData)).subscribe((res) => {
    this.visitsList = res;
  });
}

getVisitsByPsId(e) {
  const userData = {psId: e.PSId, dcsId: '0', fromDate: '', toDate: '', userId: '47' };
  this.dashboardService.getVisitsList(JSON.stringify(userData)).subscribe((res) => {
    this.visitsList = res;
  });
}
clearVisits() {
  this.getVisitsList();
}
getVisitsByData(e) {
  console.log(this.visitsData[0])
  const userData = {psId:'0', dcsId: '0', fromDate: this.visitsData[0], toDate: this.visitsData[1], userId: '47' };
  this.dashboardService.getVisitsList(JSON.stringify(userData)).subscribe((res) => {
    this.visitsList = res;
  });

}
  // dcs
  selectDcsListByDcsId(dcsId) {
    const userData = { dcsId: dcsId.dcsId, userId: '47' };
    this.dashboardService.getDcsListByDcsId(JSON.stringify(userData)).subscribe((res) => {
      this.dcsList = res;
    });
  }
getDcsList() {
  const userData = { dcsId: '0', userId: '47' };
  this.dashboardService.getDcsList(JSON.stringify(userData)).subscribe((res) => {
    this.dcsList = res;
  });
}
clearDcsList() {
  this.getDcsList();
}
// Authorization
getAuthorizationList() {
  const userData = { userId: '47' };
  this.dashboardService.getAuthorizationsList(JSON.stringify(userData)).subscribe((res) => {
    this.authorizationList = res;
  });
}

selectAuthorizationByPsId(PsId) {
    const userData = { psId: PsId.PSId, userId: '47' };
    this.dashboardService.getAuthorizationsListByPsId(JSON.stringify(userData)).subscribe((res) => {
      this.authorizationList = res;
    });
  }
  clearAuthorizationList() {
    this.getAuthorizationList();
  }
  // PsList
  getPsList() {
    this.dashboardService.getPSList(JSON.stringify(this.userData)).subscribe((res) => {
      this.psList = res;
    });
  }
// Admissions
  getAdmissionsList() {
    this.dashboardService.getAdmissionsList(JSON.stringify(this.userData)).subscribe((res) => {
      this.admissionsList = res;
    });
  }
  selectFilterEvent(e) {
    const userData = { userId: '47', psId: e.PSId };
    this.dashboardService.getAdmissionsListbypsId(JSON.stringify(userData)).subscribe((res) => {
      this.admissionsList = res;
    });
  }
  inputClean() {
    this.getAdmissionsList();
  }

  resize() {
    $('.max-1,.max-2,.max-3,.max-4').click(function () {
      $(this).parent().parent().parent().parent().siblings().hide();
      $(this).parent().parent().parent().parent().parent().siblings().hide();
      $(this).parent().parent().parent().css({ height: '530px' });
      $('.widget-block').find('.table-responsive').addClass('table-resize');
      $('.cms-widget,.scrolling-alerts').hide();

      if ($(this).parent().parent().parent().parent().hasClass('col-md-6')) {
        $(this).parent().parent().parent().parent().addClass('col-md-12');
        $(this).parent().parent().parent().parent().removeClass('col-md-6');
      }
    });

    $('.min-1,.min-2,.min-3,.min-4').click(function () {
      $(this).parent().parent().parent().parent().siblings().show();
      $(this).parent().parent().parent().parent().parent().siblings().show();
      $(this).parent().parent().parent().css({ height: '', width: '' });
      $('.widget-block').find('.table-responsive').removeClass('table-resize');
      $('.cms-widget,.scrolling-alerts').show();

      if ($(this).parent().parent().parent().parent().hasClass('col-md-12')) {
        $(this).parent().parent().parent().parent().addClass('col-md-6');
        $(this).parent().parent().parent().parent().removeClass('col-md-12');
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

  icontoggle(i){
      $('.icon-toggle').eq(i).parent().siblings("span").toggleClass('hide');
  }
  scrollDataFun() {
    const str = this.arrayData.join('  |  ');
    this.scrollData = str;
}


}
