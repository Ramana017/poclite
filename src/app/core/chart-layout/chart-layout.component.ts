import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
declare var $: any;
@Component({
  selector: 'app-chart-layout',
  templateUrl: './chart-layout.component.html',
  styleUrls: ['./chart-layout.component.sass'],
})
export class ChartLayoutComponent implements OnInit {
  public cssdropdownSettings = {
    singleSelection: false,
    text: 'Css',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    // enableFilterSelectAll	:true,
    noDataLabel: 'No Data Available',
    classes: 'myclass custom-class',
    showCheckbox: true,
    labelKey: 'cssName',
    // limitSelection: 3,
    primaryKey: 'cssId',
    escapeToClose: false,
    searchBy: ['cssName'],
    position: 'top',
  };
  public sitedropdownSettings = {
    singleSelection: false,
    text: 'Code',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    // enableFilterSelectAll	:true,
    noDataLabel: 'No Data Available',
    classes: 'myclass custom-class',
    showCheckbox: true,
    labelKey: 'siteCode',
    // limitSelection: 3,
    primaryKey: 'siteCode',
    escapeToClose: false,
    searchBy: ['siteCode'],
    position: 'top',
  };
  public dropdownSettingsFilter = {
    singleSelection: false,
    text: 'Code',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    // enableFilterSelectAll	:true,
    noDataLabel: 'No Data Available',
    classes: 'myclass custom-class',
    showCheckbox: true,
    labelKey: 'site',
    // limitSelection: 3,
    primaryKey: 'site',
    escapeToClose: false,
    searchBy: ['site'],
    position: 'top',
  };

  public siteList = [];

  public cssList = [];
  public officeIds = [];
  public cssIds = [];

  public archiveDate: Date = new Date();
  public scheduleStart: Date = new Date();
  public scheduleEnd: Date = new Date();

  public psFilter = [];
  public dcsFilter = [];
  public siteFilter = [];
  public cssFilter = [];
  public serviceFilter = [];
  public visitData = [];
  private defaultstartdate: Date = new Date();
  public cancelledVisitsCount: number = 0;
  public missedVisitsCount: number = 0;
  public openVisitsCount: number = 0;

  public siteFilterName=''
  animationState = 'out';

  single = [
    {
      name: '10/28/2020',
      value: 9,
    },
    {
      name: '10/29/2020',
      value: 50,
    },
  ];
  multi: any[];
  view: any[] = [650, 400];
  public displayVisitCards: boolean = true;
  public displyHighlightCard = '';
  public highlightcardcount: number = 0;

  colorScheme = {
    domain: ['#4472c3'],
  };

  public userData: any;

  constructor(
    private dashboardService: DashboardService,
    public datePipe: DatePipe
  ) {
    this.userData = JSON.parse(sessionStorage.getItem('useraccount'));
    this.defaultstartdate.setDate(new Date().getDate() - 7);
    this.scheduleStart.setDate(new Date().getDate() - 7);
    // Object.assign(this.single, { single2 })
  }
  public psList: Array<any> = [];
  public pskeyword: string = '';
  public tableData: Array<any> = [];
  public clientVisitCount: number = 0;
  public displayClientVisits: boolean = false;
  public displayClientTable:boolean=false;

  ngOnInit(): void {
    this.getFilterData();
    this.getDashBoardVisitsCount();
  }
  visits() {
    $('.divA').toggleClass('hide');
    this.displayVisitCards = true;
    this.displayClientVisits=false
  }

  onSelect(event) {
    console.log(event);
  }


  public getDashBoardClientsCount(flag: boolean) {
    this.displayClientTable=false;
    this.displayClientVisits = true;
    this.displayVisitCards=false;
    flag ? (this.officeIds = []) : '';
    this.defaultstartdate.setDate(new Date().getDate() - 7);
   this.scheduleStart.setDate(new Date().getDate() - 7);
    this.scheduleEnd = new Date();

    let officelist = [];
    this.officeIds.map((y) => {
      officelist.push(y.siteId);
    });
    try {
      let jsonObj = {
        userId: this.userData.userId,
        startDate: this.datePipe.transform(this.scheduleStart, 'MM/dd/yyyy'),
        endDate: this.datePipe.transform(this.scheduleEnd, 'MM/dd/yyyy'),
        officeIds: officelist.toString(),
      };
      this.dashboardService
        .getDashBoardClientsCount(JSON.stringify(jsonObj))
        .subscribe((res) => {
          console.log(res);
          this.clientVisitCount = res.psWithNoTemplate;
        });
    } catch (error) {}
  }

  public getDashBoardClientsData() {
    let officelist = [];
    this.officeIds.map((y) => {
      officelist.push(y.siteId);
    });
    let jsonObj = {
      userId: this.userData.userId,
      startDate: this.datePipe.transform(this.scheduleStart, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(this.scheduleEnd, 'MM/dd/yyyy'),
      officeIds: officelist.toString(),
    };
    try {
      this.dashboardService.getDashBoardClientsData(JSON.stringify(jsonObj)).subscribe(res=>{
        console.log(res);
        this.visitData=res.clientData;
        this.displayClientTable=true;
      })
    } catch (error) {

    }
  }
  public getFilterData() {
    try {
      this.dashboardService
        .getFilterData(this.userData.userId)
        .subscribe((res) => {
          console.log(res);
          this.siteList = res.siteList;
          this.cssList = res.cssList;
          this.archiveDate = new Date(res.archiveDate);
        });
    } catch (error) {}
  }
  public getDashBoardVisitsCount() {
    this.displayVisitCards = true;
    this.displayClientVisits=false

    console.log('$$$$$$$$$$$$$########', this.officeIds.toString());
    let officelist = [];
    this.officeIds.map((y) => {
      officelist.push(y.siteId);
    });
    let obj = {
      userId: this.userData.userId,
      startDate: this.datePipe.transform(this.scheduleStart, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(this.scheduleEnd, 'MM/dd/yyyy'),
      officeIds: officelist.length > 0 ? officelist.toString() : '',
      cssId: 0,
    };

    try {
      this.dashboardService
        .getDashBoardVisitsCount(JSON.stringify(obj))
        .subscribe((res) => {
          this.cancelledVisitsCount = res.cancelledVisitsCount;
          this.openVisitsCount = res.openVisitsCount;
          this.missedVisitsCount = res.missedVisitsCount;
        });
    } catch (error) {}
  }
  public getDashBoardVisitsDetails(str, count) {
    this.single = [];
    this.displyHighlightCard = str;
    this.displayClientVisits = false;
    this.displayVisitCards=false;
    this.highlightcardcount = count;
    let officelist = [];
    this.officeIds.map((y) => {
      officelist.push(y.siteId);
    });

    let jsonObj = {
      userId: this.userData.userId,
      startDate: this.datePipe.transform(this.scheduleStart, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(this.scheduleEnd, 'MM/dd/yyyy'),
      officeIds: officelist.length > 0 ? officelist.toString() : '',
      visitScenario:
        str == 'Open Visits'
          ? 'openvisits'
          : str == 'Missed Visits'
          ? 'missedvisits'
          : 'cancelledvisits',
      cssId: 0,
    };
    try {
      this.dashboardService
        .getDashBoardVisitsDetails(JSON.stringify(jsonObj))
        .subscribe((res) => {
          console.log(res);
          this.visitData = res.visitData;
          let visitdata = [...new Set(this.visitData.map((x) => x.site))];
          let dcsData = [...new Set(this.visitData.map((x) => x.dcsName))];
          let cssData = [...new Set(this.visitData.map((x) => x.cssName))];
          let serviceData = [
            ...new Set(this.visitData.map((x) => x.serviceCode)),
          ];
          this.siteFilter = visitdata.map((x) => {
            return { site: x };
          });
          this.dcsFilter = dcsData.map((x) => {
            return { dcsName: x };
          });
          this.cssFilter = cssData.map((x) => {
            return { cssName: x };
          });
          this.serviceFilter = serviceData.map((x) => {
            return { serviceCode: x };
          });
          let visitdatedata = [
            ...new Set(this.visitData.map((x) => x.visitDate)),
          ];
          let graphData = [];
          visitdatedata.map((x) => {
            let i = 0;
            this.visitData.map((y) => {
              if (y.visitDate == x) {
                i++;
              }
            });
            let obj = { name: x, value: i };
            graphData.push(obj);
          });
          this.single = graphData;
          console.log(
            this.siteFilter,
            this.cssFilter,
            this.dcsFilter,
            this.serviceFilter
          );
          this.displyHighlightCard = str;
          this.displayVisitCards = false;
          this.highlightcardcount = count;
        });
    } catch (error) {}
  }
}
export var single2 = [
  {
    name: '10/28/2020',
    value: 9,
  },
  {
    name: '10/29/2020',
    value: 50,
  },
  {
    name: '10/30/2020',
    value: 72,
  },
  {
    name: '11/01/2020',
    value: 8,
  },
  {
    name: '11/02/2020',
    value: 50,
  },
  {
    name: '11/03/2020',
    value: 20,
  },
  {
    name: '11/04/2020',
    value: 20,
  },
  {
    name: '11/05/2020',
    value: 94,
  },
  {
    name: '11/06/2020',
    value: 55,
  },
  {
    name: '11/07/2020',
    value: 68,
  },
];

// showXAxis = true;
//   showYAxis = true;
//   gradient = false;
//   showLegend = false;
//   showXAxisLabel = true;
//   xAxisLabel = 'Date';
//   showYAxisLabel = true;
//   yAxisLabel = 'count';
