import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, HostListener } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { filter } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import * as moment from 'moment';
const EXCEL_EXTENSION = '.xlsx';

declare var $: any;
@Component({
  selector: 'app-chart-layout',
  templateUrl: './chart-layout.component.html',
  styleUrls: ['./chart-layout.component.sass'],
})
export class ChartLayoutComponent implements OnInit {

  psFilterAutocomplete = '';
  cssFilterAutocomplete = '';
  serviceFilterAutoComplete = '';
  public cssdropdownSettings = {
    singleSelection: true,
    text: 'CSS',
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
    position: 'bottom',
  };

  public siteList = [];

  public cssList = [];
  public officeIds = [];
  public cssIds = [];

  public archiveDate: Date = new Date();
  public scheduleStart: Date = new Date();
  public scheduleEnd: Date = new Date();
  public todayDate: Date = new Date();

  public psFilter = [];
  public dcsFilter = [];
  public siteFilter = [];
  public cssFilter = [];
  public serviceFilter = [];
  public visitData = [];
  public clientData = [];
  private defaultstartdate: Date = new Date();
  public cancelledVisitsCount: number = 0;
  public missedVisitsCount: number = 0;
  public openVisitsCount: number = 0;

  public siteFilterName = '';
  animationState = 'out';

  single = [];
  multi: any[];
  view: any[] = [700, 400];
  public displayVisitCards: boolean = true;
  public displyHighlightCard = '';
  public highlightcardcount: number = 0;

  colorScheme = {
    domain: ['#4472c3'],
  };

  public userData: any;

  public modelRef: BsModalRef;

  constructor(
    private dashboardService: DashboardService,
    public datePipe: DatePipe,
    public modelService: BsModalService
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
  public siteSelect = [];
  public displayTable = [];
  currentVisitScenario = '';
  public orderByColumn = "site"
  public reverse: boolean = false;
  public screenHeight:any;
  ngOnInit(): void {
    this.getFilterData();
    this.getDashBoardVisitsCount();
    this.resize();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log(event)
    this.resize();
  }
  public chartheight
  resize(){
    this.screenHeight = window.innerHeight;
      var height = this.screenHeight - 67
      $('.side-bar').css('height', height + 'px');
      $('.chart-content').css('height', height + 'px');
  }
  visits() {
    $('.divA').toggleClass('hide');
    this.displayVisitCards = true;
    this.displayClientVisits = false;

  }
  charts() {

    $('.divB').toggleClass('hide');
  }


  public getDashBoardClientsCount(flag: boolean) {

    this.displayClientTable = false;
    this.displayClientVisits = true;
    this.displayVisitCards = false;
    if (flag) {
      this.officeIds = [];
      this.scheduleStart = this.defaultstartdate;
      this.scheduleEnd = this.todayDate;
    }
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
    } catch (error) { }
  }

  public getDashBoardClientsData() {
    console.log(this.scheduleStart, this.scheduleEnd)
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
          this.clientData = res.clientData;
          this.displayClientTable = true;
        });
    } catch (error) { }
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
    } catch (error) { }
  }
  public getDashBoardVisitsCount() {

    this.displayVisitCards = true;
    this.displayClientVisits = false;

    console.log('$$$$$$$$$$$$$########', this.officeIds.toString());
    let officelist = [];
    let csslist = [];
    this.officeIds.map((y) => {
      officelist.push(y.siteId);
    });
    this.cssIds.map(x => {
      csslist.push(x.cssId);
    })
    let obj = {
      userId: this.userData.userId,
      startDate: this.datePipe.transform(this.scheduleStart, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(this.scheduleEnd, 'MM/dd/yyyy'),
      officeIds: officelist.length > 0 ? officelist.toString() : '',
      cssId: csslist.length > 0 ? csslist.toString() : '',
    };

    try {
      this.dashboardService
        .getDashBoardVisitsCount(JSON.stringify(obj))
        .subscribe((res) => {
          this.cancelledVisitsCount = res.cancelledVisitsCount;
          this.openVisitsCount = res.openVisitsCount;
          this.missedVisitsCount = res.missedVisitsCount;
        });
    } catch (error) { }
  }
  public getDashBoardVisitsDetails(str, count) {

    if (count >= 0) {
      this.cssFilterAutocomplete = '';
      this.psFilterAutocomplete = '';
      this.siteSelect = [];
      this.serviceFilterAutoComplete = '';
      this.filterEndeDate = null;
      this.fileterStartDate = null;
      this.orderByColumn="site";
      this.reverse=false;

      this.currentVisitScenario = str;
      this.single = [];
      this.displyHighlightCard = str;
      this.displayClientVisits = false;
      this.displayVisitCards = false;
      this.highlightcardcount = count;
      let officelist = [];
      let csslist = [];
      this.officeIds.map((y) => {
        officelist.push(y.siteId);
      });
      this.cssIds.map(x => {
        csslist.push(x.cssId);
      })
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
        cssId: csslist.length > 0 ? csslist.toString() : '',
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
      } catch (error) { }
    } else {
      Swal.fire(`No ${str} are there to display`)
    }
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

    this.arrayManipulate();
  }

  public arrayManipulate() {
    // console.log(this.visitData);
    this.displayTable = this.visitData;
    // console.log(this.displayTable);

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

    if (this.siteSelect.length > 0) {
      console.log(this.siteSelect.length);

      let dummeyarray = [];
      this.displayTable.map(x => {
        this.siteSelect.map(y => {
          if (x.site == y.site) {
            dummeyarray.push(x);

          }
        })
      })
      this.displayTable = dummeyarray;

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
    // if ((this.filterEndeDate == null && this.fileterStartDate != null) || (this.filterEndeDate != null && this.fileterStartDate == null)) {
    //   Swal.fire('Invalid Dates', 'Start and End Dates both are Mandatory','warning')
    // } else {
    //   if (this.filterEndeDate != null && this.filterEndeDate != undefined && this.fileterStartDate != null && this.fileterStartDate != undefined) {
    //     let dummeyarray = [];
    //     let startdate = Date.parse(this.datePipe.transform(this.fileterStartDate, 'MM/dd/yyyy'));
    //     let endDate = Date.parse(this.datePipe.transform(this.filterEndeDate, 'MM/dd/yyyy'));
    //     this.displayTable.map(x => {
    //       let scheduledBeginDateTime = Date.parse(this.datePipe.transform(x.scheduledBeginDateTime, 'MM/dd/yyyy'));
    //       let scheduledEndDateTime = Date.parse(this.datePipe.transform(x.scheduledEndDateTime, 'MM/dd/yyyy'));
    //       if (scheduledBeginDateTime >= startdate && scheduledEndDateTime <= endDate) {
    //         dummeyarray.push(x);
    //       }
    //     })
    //     this.displayTable = dummeyarray;



    //   } else {

    //   }
    // }
    console.log(this.displayTable);
  }

  public FilterDateChange(event, flag?) {
    console.log("+++++++", event);

    if (flag == 'start') {
      this.fileterStartDate =
        event != null ? event : null;
    }
    if (flag == 'end') {
      this.filterEndeDate =
        event != null ? event : null;
    }

    console.log(this.fileterStartDate);
    console.log(this.filterEndeDate);
    this.arrayManipulate();
  }

  public resetFilters() {
    this.officeIds = [];
    this.cssIds = [];
    this.scheduleStart = this.defaultstartdate;
    this.scheduleEnd = this.todayDate;
    this.getDashBoardVisitsCount()

  }

  public onGo() {

    if (this.scheduleStart == null || this.scheduleEnd == null) {
      let str = !this.displayClientVisits ? 'Visit' : 'Authz Service';
      Swal.fire('Invalid Dates', `${this.scheduleStart == null && this.scheduleEnd == null ? str + ' Start and End Dates are mandatory fields' : this.scheduleStart == null ? str + ' Start Date is mandatory field' : str + ' End Date is mandatory field'}`, 'warning')

    }

    let startDate = Date.parse(this.datePipe.transform(this.scheduleStart, 'MM/dd/yyyy'));;
    let archivedate = Date.parse(this.datePipe.transform(this.archiveDate, 'MM/dd/yyyy'));
    let endDate = Date.parse(this.datePipe.transform(this.scheduleEnd, 'MM/dd/yyyy'));


    if (startDate >= archivedate && startDate <= endDate) {
      console.log("validation  Ok");
      this.displayClientVisits ? this.getDashBoardClientsCount(false) : this.getDashBoardVisitsCount()

    } else {
      if (startDate < archivedate) {
        Swal.fire('Invalid Dates', `${!this.displayClientVisits ? 'Visit' : 'Authz Service'} Start Date cannot be prior to <strong> ${this.datePipe.transform(this.archiveDate, 'MM/dd/yyyy')}</strong>`, 'warning')
      } else if (startDate > endDate) {
        Swal.fire('Invalid Dates', `${!this.displayClientVisits ? 'Visit' : 'Authz Service'} End Date should be greater than or equal to ${!this.displayClientVisits ? 'Visit' : 'Authz Service'} Start Date <strong> ${this.datePipe.transform(this.scheduleStart, 'MM/dd/yyyy')}</strong>`, 'warning')
      }

    }


  }
  /**
   * onBarclick method to get data from bar chart
   */

  public popUpTable = [];
  public popupDate='';
  public onBarclick(e, template: TemplateRef<any>) {
    console.log(e);
    this.popupDate=e.label;
    this.modelRef = this.modelService.show(template, Object.assign({}, { class: 'barGraphPopup modal-dialog-centered' }));
    this.popUpTable = this.visitData.filter(x => x.visitDate == e.label);
    console.log(this.popUpTable)

  }
  setOrder(value: string, reverse: boolean) {
    this.reverse = reverse;
    this.orderByColumn = value;
    console.log(this.orderByColumn)
  }
  public resetAllFiltersinVisit() {
    this.officeIds = [];
    this.cssIds = []
    this.scheduleStart = this.defaultstartdate;
    this.scheduleEnd = this.todayDate;
    this.getDashBoardVisitsCount();
  }


public mappedJson=[];
  public exportexcel(): void {
    /* table id is passed over here */
    // let element = document.getElementById('excel-table');
    // console.log(typeof(element))
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */

    // XLSX.writeFile(wb, this.psname + '.xlsx');
    //-----------------------------------------------
    this.mappedJson = this.popUpTable.map(item => {
        return {
          "site":item.site,
          "PS":item.psName,
          "css":item.cssName,
          " Service Name": item.serviceCode,
          "Scheduled Start": item.scheduledBeginDateTime ? moment(item.scheduledBeginDateTime).format('MM/DD/YYYY hh:mm a') : '',
          "Scheduled End": item.scheduledEndDateTime ? moment(item.scheduledEndDateTime).format('MM/DD/YYYY hh:mm a') : '',

      }

    })
    var wscols = [
      { wch: 15 },
      { wch: 22 },
      { wch: 22 },
      { wch: 20 },
      { wch: 30 },
      { wch: 30 },

    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.mappedJson);
    worksheet["!cols"] =  wscols;
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, (this.currentVisitScenario+'-'+this.popupDate));



  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'string' });
    /***********`
    *YOUR EXCEL FILE'S NAME
    */
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
