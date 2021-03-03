import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { getLocaleDateFormat, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CorrectionheaderComponent } from 'src/app/corrections/correctionheader/correctionheader.component';
import { ClockinComponent } from 'src/app/corrections/clockin/clockin.component';
import { ClockInAndOutComponent } from 'src/app/corrections/clock-in-and-out/clock-in-and-out.component';
import { ClockoutComponent } from 'src/app/corrections/clockout/clockout.component';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import * as d3 from 'd3';
import * as  GaugeChart from 'gauge-chart';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-summarytable',
  templateUrl: './summarytable.component.html',
  styleUrls: ['./summarytable.component.sass']
})
export class SummarytableComponent implements OnInit, AfterViewInit {
  // @ViewChild('a') auto;

  @ViewChild('ddd', { static: false }) dropdownRef: AngularMultiSelect;
  @ViewChild('ffff', { static: false }) exceptiondropdownRef: AngularMultiSelect;
  @ViewChild('autocss') autocss;
  @ViewChild('autodcs') autodcs;
  @ViewChild('autops') autops;
  @ViewChild('autoservice') autoservice;
  @ViewChild('autocss') itemTemplatecss;
  @ViewChild('autodcs') itemTemplatedcs;
  @ViewChild('autops') itemTemplateps;
  @ViewChild('autoservice') itemTemplateservice;

  bsmodelRef: BsModalRef;

  public useraccount: any
  public responsedata: any;
  public filterResponseData: any;
  public tableData: any = []
  public gpsExceptionCount: number = 0;
  public callerIdExceptionCount: number;
  public scheduleVarExceptionCount: number;
  public incompleteClockInOutCount: number;
  public invalidTokenCodeCount:number;
  public excessiveTtCount: number;
  public excessiveMileageCount: number;
  public currentDate: Date = new Date();
  public intialStartDate: Date = new Date();
  public apiParameters: object;
  public perpage: number = 20;
  public lowerBound: number = 1;
  public upperBound: number = this.perpage;
  public nextButton: boolean = true;
  public previousButton: boolean = false;
  public maxCount: number = null;
  public officeId: any = 0;
  public psId: number = 0;
  public dcsId: number = 0;
  public csssId: number = 0;
  public serviceId: number = 0;
  public tablelength: number;
  public siteList: Array<object> = [];
  public psList: Array<object>;
  public cssList: Array<object>;
  public serviceList: Array<object>;
  public dcsList: Array<object>;
  public userId: number;
  public keyword: string = 'dcsName';
  public sitekeyword = "siteName";
  public serviceKeyword = "serviceName";
  public csskeyword = "cssName";
  public pskeyword = "psName";
  public todayDate: Date = new Date();
  public pageArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  public datechanger: boolean = false;
  public minimumIntialDate: Date = new Date();
  public minimumintialdatetwo = new Date();
  public exception = [{ id: 1, name: 'GPS Discrepancy' }, { id: 2, name: 'Invalid CallerID' }, { id: 3, name: 'Schedule Variance' }, { id: 4, name: 'Missed ClockIn/Out' }
    , { id: 5, name: 'Excessive TT' }, { id: 6, name: 'Excessive Mileage' }];
  public currentSelected: {};
  public parameterstartdate;
  public parameterenddate;

  // public selectedItems;
  public exceptionSelected = [];
  public userdetails: any;
  public selctedItems = [];
  public dropdownSettings = {
    singleSelection: false,
    text: "Code",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    // enableFilterSelectAll	:true,
    noDataLabel: "No Data Available",
    classes: "myclass custom-class",
    showCheckbox: true,
    labelKey: "siteCode",
    // limitSelection: 3,
    primaryKey: 'siteCode',
    escapeToClose: false,
    searchBy: ['siteCode'],
    position: 'top'

  };
  public displayComponent;
  public exceptiondropdownSettings = {
    singleSelection: false,
    text: "Exception",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: true,
    labelKey: "name",
    // limitSelection: this.exception.length,
    primaryKey: 'id',
    escapeToClose: false,
    searchBy: ["name"],
    position: 'top'

  };
  public intialcssvalue: string;
  public resetfilter: boolean = true;
  public current = 0;

  private Defaultstartdate: Date = new Date();
  private defaultEndDate: Date = new Date();
  private popupscreenFlag: boolean = false;
  private exceptionCount: number;


  private cancelSubscription: Subscription;

  constructor(
    public _apiservice: ApiserviceService,
    private _router: Router,
    public datepipe: DatePipe,
    public modalService: BsModalService) {
    this.tableData = []
    this.selctedItems = [];
    this.exceptionSelected = [];
    var data = sessionStorage.getItem("useraccount");
    this.useraccount = JSON.parse(data);
    {

      this.userId = this.useraccount.userId;
      this.csssId = this.useraccount.userId;
      this.intialcssvalue = this.useraccount.userName;
      this.intialStartDate.setDate(this.todayDate.getDate() - 15);
      this.minimumIntialDate.setDate(this.todayDate.getDate() - 90);
      this.minimumintialdatetwo.setDate(this.todayDate.getDate() - 89);
      this.Defaultstartdate.setDate(this.todayDate.getDate() - 15);

      this.getFilterArrays();
      this.tableControl();

    }
    console.log("SUMMARY CONSTRUCTER")
  }
  public ngOnInit(): void {
  }
  ngOnDestroy() {
    console.log("ng on destroy")
    this.cancelSubscription.unsubscribe();
    localStorage.removeItem('userlist');
  }
  public ngAfterViewInit(): void {

    this.cancelSubscription = this._apiservice.updateTable$.subscribe(
      isupdated => {
        console.log("update observable call", isupdated)
        isupdated ? this.tableControl() : null;

      })
  }
  exceptionchange(exceptionSelected) {
    console.log("value changed", exceptionSelected);
  }
  //method to call table data

  public tableControl(): void {
    // console.log(this.exceptionSelected)
    var scheBeginDate = this.datepipe.transform(this.intialStartDate, 'MM/dd/yyyy');
    var scheEndDate = this.datepipe.transform(this.currentDate, 'MM/dd/yyyy');
    {

      let siteList = this.selctedItems.length > 0 ? this.selctedItems.map(a => a.siteId) : [0];
      let exceptionArray = this.exceptionSelected.length > 0 ? (this.exceptionSelected.map(a => a.id)) : [0];
      this.apiParameters = { "userId": this.userId, "officeId": siteList, "psId": this.psId, "dcsId": this.dcsId, "cssId": this.csssId, "serviceId": this.serviceId, "scheBeginDate": scheBeginDate, "scheEndDate": scheEndDate, "lowerBound": this.lowerBound, "upperBound": this.upperBound, 'exceptionFlag': exceptionArray };
      let jsondatastring = JSON.stringify(this.apiParameters)
      console.log(jsondatastring)
      try {
        this._apiservice.tableData(jsondatastring).subscribe(response => {
          console.log(response);
          // this.tableData.length = 0;

          this.responsedata = response;
          this.gpsExceptionCount = this.responsedata.callMgmtExceptionsCounts.gpsExceptionCount;
          this.callerIdExceptionCount = this.responsedata.callMgmtExceptionsCounts.callerIdExceptionCount;
          this.scheduleVarExceptionCount = this.responsedata.callMgmtExceptionsCounts.scheduleVarExceptionCount;
          this.incompleteClockInOutCount = this.responsedata.callMgmtExceptionsCounts.incompleteClockInOutCount;
          this.excessiveTtCount = this.responsedata.callMgmtExceptionsCounts.excessiveTtCount;
          this.excessiveMileageCount = this.responsedata.callMgmtExceptionsCounts.excessiveMileageCount;
          this.invalidTokenCodeCount=this.responsedata.callMgmtExceptionsCounts.invalidTokenCodeCount;
          this.tableData = this.responsedata.callMgmtExceptionsList;

          //------popup screen update-------------------------------------------------------------------------------
          // if (this.popupscreenFlag) {
          //   let data = localStorage.getItem('userlist');
          //   let previousdata = JSON.parse(data);
          //   console.log("prevouis data", previousdata.visitDetailsId)

          //   let previousvisit = previousdata.visitDetailsId;

          //   for (let h = 0; h < this.tableData.length; h++) {
          //     let newvisit = this.tableData[h].visitDetailsId;
          //     if (previousvisit == newvisit) {
          //       console.log("visitupdated");
          //       this.bsmodelRef.hide();
          //       this.correctException(h,4);
          //       this.popupscreenFlag=false;
          //       break;
          // }
          // else {
          //   console.log("viset failed to update");
          // }
          // }
          // }


          //---------------------------------------------------------------------------------------------------------
          // console.log(response);
          this.maxCount = this.responsedata.totalRecordsCount;
          this.tablelength = this.tableData.length;
          this.datechanger = true;
          let guageoptions = {
            hasNeedle: true,
            needleColor: 'gray',
            needleUpdateSpeed: 1000,
            arcColors: ['green', 'orange', 'red'],
            arcDelimiters: [10, 20],
          }
          {
            d3.select("#guagecharts").selectAll('svg').remove();
            GaugeChart.gaugeChart(document.getElementById('gpsGuage'), 150, {
              hasNeedle: true,
              needleColor: 'gray',
              arcColors: ['green', 'orange', 'red'],
              arcDelimiters: [10, 20],
            }).updateNeedle(this.responsedata.callMgmtExceptionsCounts.gpsExceptionCount);
            GaugeChart.gaugeChart(document.getElementById('invalidGuage'), 150, {
              hasNeedle: true,
              needleColor: 'gray',
              arcColors: ['green', 'orange', 'red'],
              arcDelimiters: [10, 20],

            }).updateNeedle(this.responsedata.callMgmtExceptionsCounts.callerIdExceptionCount);
            GaugeChart.gaugeChart(document.getElementById('scheduleGuage'), 150, {
              hasNeedle: true,
              needleColor: 'gray',
              arcColors: ['green', 'orange', 'red'],
              arcDelimiters: [10, 20],

            }).updateNeedle(this.responsedata.callMgmtExceptionsCounts.scheduleVarExceptionCount);
            GaugeChart.gaugeChart(document.getElementById('clockGuage'), 150, {
              hasNeedle: true,
              needleColor: 'gray',
              arcColors: ['green', 'orange', 'red'],
              arcDelimiters: [10, 20],

            }).updateNeedle(this.responsedata.callMgmtExceptionsCounts.incompleteClockInOutCount);
            GaugeChart.gaugeChart(document.getElementById('travelGuage'), 150, {
              hasNeedle: true,
              needleColor: 'gray',
              arcColors: ['green', 'orange', 'red'],
              arcDelimiters: [10, 20],

            }).updateNeedle(this.responsedata.callMgmtExceptionsCounts.excessiveTtCount);
            GaugeChart.gaugeChart(document.getElementById('mileageGuage'), 150, {
              hasNeedle: true,
              needleColor: 'gray',
              arcColors: ['green', 'orange', 'red'],
              arcDelimiters: [10, 20],

            }).updateNeedle(this.responsedata.callMgmtExceptionsCounts.excessiveMileageCount);
            GaugeChart.gaugeChart(document.getElementById('invalidToken'), 150, {
              hasNeedle: true,
              needleColor: 'gray',
              arcColors: ['green', 'orange', 'red'],
              arcDelimiters: [10, 20],

            }).updateNeedle(this.responsedata.callMgmtExceptionsCounts.invalidTokenCodeCount);

          }

          console.log(this.tableData.length)

        }, error => {
          if (error) {
            this.datechanger = true;

          }
        })

      } catch (error) {
        console.log(error);
      }
    }



  }


  // method to change next page
  public pagenext(): void {
    if (this.upperBound < this.maxCount) {
      this.lowerBound = this.lowerBound + this.perpage;
      this.upperBound = this.upperBound + this.perpage;
      this.tableData.length = 0;

      this.tableControl();
    }
    else {
      this.upperBound = this.maxCount;
      this.lowerBound = this.maxCount - this.perpage;
      // this.tableData.length = 0;
      this.tableControl();
    }



  }
  //method to change previous page
  public prevpage(): void {
    if (this.lowerBound != 1) {
      this.lowerBound = this.lowerBound - this.perpage;
      this.upperBound = this.upperBound - this.perpage;
      if (this.lowerBound <= 1) {
        this.lowerBound = 1;
        this.upperBound = this.perpage;
        this.tableData.length = 0;
        this.tableControl();
      } else {
        this.tableControl();
      }
    }
  }
  public getFilterArrays(): void {
    console.log("calling filter api")
    try {
      console.log(this.userId)
      let obj={"userId":this.userId}
      this._apiservice.tableFilterData(JSON.stringify(obj)).subscribe(response => {
        console.log(response);
        this.filterResponseData = response;
        this.siteList = this.filterResponseData.siteList;
        this.cssList = this.filterResponseData.CSSList;
        this.dcsList = this.filterResponseData.dcsList;
        this.serviceList = this.filterResponseData.serviceList;
        this.psList = this.filterResponseData.psList;
        console.log(this.cssList);
        // this.tableControl();


      }, error => {
        console.log(error);

      })
    } catch (error) {
      console.log(error);
    }


  }

  public pagereset(): void {
    this.tableData.length = 0;
    this.lowerBound = 1;
    this.upperBound = this.perpage;
    this.tableControl();

  }

  public correctException(i: number, disp: number): void {
    // this.exceptionCount = 0;

    console.log("++++", this.tableData[i])
    //checking exception counts -----------------------------------------------------------------------------
    // if (this.tableData[i].ArrGpsException == 1 || this.tableData[i].DepGpsException == 1) {
    //   this.exceptionCount++;
    // }
    // if (this.tableData[i].arrCallerIdException == 1 || this.tableData[i].depCallerIdException == 1) {
    //   this.exceptionCount++;
    // }
    // if (this.tableData[i].scheduleVarException == 1) {
    //   this.exceptionCount++;
    // }
    // if (this.tableData[i].arrTravelTimeException == 1) {
    //   this.exceptionCount++;
    // }
    // if (this.tableData[i].depMileageException == 1 || this.tableData[i].arrMileageException == 1) {
    //   this.exceptionCount++;
    // }
    // this.tableData[i].exceptionCount = this.exceptionCount;
    //----------------------------------------------------------------------------------------------------
    var userData = JSON.stringify(this.tableData[i])
    localStorage.setItem('userlist', userData);
    this.bsmodelRef = this.modalService.show(CorrectionheaderComponent, {
      backdrop: false,
      animated: true,
      keyboard: false,
      ignoreBackdropClick: true,
      initialState: {
        display: disp,
        userID: this.userId,
        data: {}
      }
    })
    // this.bsmodelRef.content.closeBtnName = 'Close';
  }


  public clockException(i: any): void {

    if (this.tableData[i].missedArrException == 1 && this.tableData[i].missedDepException != 1) {
      this.displayComponent = ClockinComponent;
    }
    else if (this.tableData[i].missedArrException != 1 && this.tableData[i].missedDepException == 1) {
      this.displayComponent = ClockoutComponent;
    }
    else {
      this.displayComponent = ClockInAndOutComponent;
    }
    console.log("", this.tableData[i]);

    var userData = JSON.stringify(this.tableData[i]);

    localStorage.setItem('userlist', userData);

    this.bsmodelRef = this.modalService.show(this.displayComponent,
      {
        backdrop: false,
        animated: true,
        keyboard: false,
        ignoreBackdropClick: true,
        initialState: {
          userID: this.userId,
          title: null,
          data: {}
        }
      },
    );

  }
  public selectFilterEvent(event?: any, filter?: string) {
    let eventpresent = event ? true : false
    console.log("+++++++", eventpresent, event)
    if (filter == "ps") {
      this.psId = eventpresent ? event.psId : 0;
      this.itemTemplateps.close();
    }
    if (filter == "dcs") {
      this.dcsId = eventpresent ? event.dcsId : 0;
      this.itemTemplatedcs.close();
    }
    if (filter == "css") {
      this.csssId = eventpresent ? event.cssId : 0;
      this.itemTemplatecss.close();

    }
    if (filter == "service") {
      this.serviceId = eventpresent ? event.serviceId : 0;
      this.itemTemplateservice.close();
    }
    // if (filter == "site") {
    //   this.officeId = eventpresent ? event.siteId : 0;
    // }
    if (event == this.intialcssvalue) { this.csssId = this.userId; }
    this.pagereset();

  }



  public exceptionDeselectALL() {
    console.log("deselect all")
    this.exceptionSelected.length = 0;
    this.exceptiondropdownRef.closeDropdown()

    // this.pagereset();
  }


  public resetall() {
    // this.ngAfterViewInit();
    this.resetfilter = false
    this.selctedItems.length = 0;
    this.exceptionSelected.length = 0;
    this.autocss.clear();
    this.autocss.close();
    this.autodcs.clear();
    this.autodcs.close();
    this.autops.clear();
    this.autops.close();
    this.autoservice.clear();
    this.autoservice.close();
    this.psId = 0; this.dcsId = 0; this.serviceId = 0;
    this.csssId = 0;
    // this.csssId = this.useraccount.cssId;
    this.currentDate = this.defaultEndDate
    this.intialStartDate = this.Defaultstartdate;
    // this.intialcssvalue = this.useraccount.userName;
    // this.tableControl();
    this.pagereset();
    this.resetfilter = true;
  }


  public dateenter(startdate?, enddate?) {

    // console.log(enddate, startdate, startdate > this.minimumIntialDate)
    if (startdate <= this.todayDate && enddate <= this.todayDate ) {
      {

        let startdateopt = Date.parse(this.datepipe.transform(startdate, 'MM/dd/yyyy'));
        let enddateopt = Date.parse(this.datepipe.transform(enddate, 'MM/dd/yyyy'));
        // console.log(startdateopt,enddateopt)
        //  this.intialStartDate = startdate;
        // this.currentDate = enddate;
        console.log(startdate <= enddate)
        if (startdateopt <= enddateopt) {
          this.intialStartDate = startdate;
          this.currentDate = enddate;
          this.tableControl();
        }
      }
    }
    // console.log("intialdate",this.intialStartDate)
    // console.log("current",this.currentDate)
  }

  public dropdownselect() {

    console.log('+++++++++')
    this.dropdownRef.closeDropdown();


  }
  public exceptionselect() {
    this.pagereset();
  }
  public exceptionDeselect() {
    console.log("ramana1")
    // if(this.dropdownRef.toggleDropdown)
    this.pagereset();
  }
  public siteselect() {
    if (this.selctedItems.length >= 0) {
      this.pagereset();
    }

  }
  public siteAllselect() {
    // if (this.selctedItems.length > 0) {
    //   this.pagereset();
    // }
    this.dropdownRef.closeDropdown();
  }
  public onItemSelect(item: any): void {
    console.log(item);
    console.log(this.selctedItems);
  }
  public siteDeselect() {
    console.log(this.selctedItems)
    this.selctedItems.length = 0;
    this.dropdownRef.closeDropdown();
    // this.pagereset();
  }

}
