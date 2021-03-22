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
    singleSelection: true,
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
  public todayDate:Date=new Date();

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

  public siteFilterName = '';
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
  view: any[] = [700, 400];
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
    this.defaultstartdate.setDate(this.todayDate.getDate() - 7);
    this.scheduleStart.setDate(this.todayDate.getDate() - 7);

    // Object.assign(this.single, { single2 })
  }
  public psList: Array<any> = [];
  public pskeyword: string = '';
  public tableData: Array<any> = [];
  public clientVisitCount: number = 0;
  public displayClientVisits: boolean = false;
  public displayClientTable: boolean = false;
  public fileterStartDate: any = null;
  public filterEndeDate: any = null;
  public psName: string = null;
  public cssName: string = null;
  public dcsName: string = null;
  public serviceName: string = null;
  public siteName: string = null;
  public siteSelect;
  public displayTable = [];
  currentVisitScenario='';
  ngOnInit(): void {
    this.getFilterData();
    this.getDashBoardVisitsCount();
  }
  visits() {
    $('.divA').toggleClass('hide');
    this.displayVisitCards = true;
    this.displayClientVisits = false;
  }

  onSelect(event) {
    console.log(event);
  }

  public getDashBoardClientsCount(flag: boolean) {
    this.displayClientTable = false;
    this.displayClientVisits = true;
    this.displayVisitCards = false;
    if(flag){
      this.officeIds=[];
      this.defaultstartdate.setDate(new Date().getDate() - 7);
      this.scheduleStart.setDate(new Date().getDate() - 7);
    }
    console.log('startdate',this.scheduleStart);
    this.scheduleEnd = new Date();
    console.log('End Date',this.scheduleEnd)


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
    console.log(this.scheduleStart,this.scheduleEnd)
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
      this.dashboardService
        .getDashBoardClientsData(JSON.stringify(jsonObj))
        .subscribe((res) => {
          console.log(res);
          this.visitData = res.clientData;
          this.displayClientTable = true;
        });
    } catch (error) {}
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
    this.displayClientVisits = false;

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
    this.currentVisitScenario=str;
    this.single = [];
    this.displyHighlightCard = str;
    this.displayClientVisits = false;
    this.displayVisitCards = false;
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
        this.currentVisitScenario == 'Open Visits'
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
          this.displayTable = res.visitData;
          let visitdata = [...new Set(this.visitData.map((x) => x.site))];
          let dcsData = [...new Set(this.visitData.map((x) => x.dcsName))];
          let cssData = [...new Set(this.visitData.map((x) => x.cssName))];
          let psData = [...new Set(this.visitData.map((x) => x.psName))];
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
          this.psFilter = psData.map((x) => {
            return { psName: x };
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

  public selectFilterEvent(event?: any, filter?: string) {
    let eventpresent = event ? true : false;
    console.log('+++++++', eventpresent, event);

    if (filter == 'ps') {
      this.psName = eventpresent ? event.psName : null;
    }
    if (filter == 'dcs') {
      this.dcsName = eventpresent ? event.dcsName : null;
    }
    if (filter == 'css') {
      this.cssName = eventpresent ? event.cssName : null;
    }
    if (filter == 'service') {
      this.serviceName = eventpresent ? event.serviceCode : null;
    }
    if (filter == 'site') {
      this.siteName = eventpresent ? event[0].site : null;
    }
    this.arrayManipulate();
  }

  public arrayManipulate() {
    console.log(this.visitData);
    this.displayTable = this.visitData;
    console.log(this.displayTable);

    if (this.psName != null) {
      console.log('****', this.psName);
      this.displayTable = this.displayTable.filter((x) => {
        return x.psName == this.psName;
      });
      console.log(this.displayTable);
    }
    if (this.cssName != null) {
      this.displayTable = this.displayTable.filter((x) => {
        return x.cssName == this.cssName;
      });
    }
    if (this.dcsName != null) {
      this.displayTable = this.displayTable.filter((x) => {
        return x.dcsName == this.dcsName;
      });
    }
    if (this.serviceName != null) {
      this.displayTable = this.displayTable.filter((x) => {
        return x.serviceCode == this.serviceName;
      });
    }
    if (this.siteName != null) {
      this.displayTable = this.displayTable.filter((x) => {
        return x.site == this.siteName;
      });
    }

    if (this.filterEndeDate != null && this.filterEndeDate != undefined) {
      this.displayTable = this.displayTable.filter((x) => {
        return (
          x.visitDate ==
          this.datePipe.transform(this.filterEndeDate, 'MM/dd/yyyy')
        );
      });
    }

    if (this.fileterStartDate != null && this.fileterStartDate != undefined) {
      this.displayTable = this.displayTable.filter((x) => {
        return (
          x.visitDate ==
          this.datePipe.transform(this.fileterStartDate, 'MM/dd/yyyy')
        );
      });
    }
    console.log(this.displayTable);
  }

  public FilterDateChange(event, flag?) {
    console.log("+++++++",this.datePipe.transform(event, 'MM/dd/yyyy'));
    if (flag == 'start') {
      this.fileterStartDate =
        event != null ? this.datePipe.transform(event, 'MM/dd/yyyy') : null;
    }
    if (flag == 'end') {
      this.filterEndeDate =
        event != null ? this.datePipe.transform(event, 'MM/dd/yyyy') : null;
    }
    console.log(this.fileterStartDate);
    console.log(this.filterEndeDate);
    this.arrayManipulate();
  }

  public resetFilters() {
    this.officeIds = [];
    this.cssIds = [];
    this.defaultstartdate.setDate(new Date().getDate() - 7);
    this.scheduleStart.setDate(new Date().getDate() - 7);
    this.scheduleEnd=new Date();
    this.getDashBoardVisitsCount();
  }
}
