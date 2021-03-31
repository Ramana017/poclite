import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import Sunburst from 'sunburst-chart';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import * as d3 from 'd3';
import { DatePipe, TitleCasePipe } from '@angular/common';
// import { Observable, forkJoin, observable } from 'rxjs';
// import { treemap, schemeSet3 } from 'd3';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
const color = d3.scaleOrdinal(d3.schemePaired);

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import * as moment from 'moment';

// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass'],
})
export class ChartsComponent implements OnInit {
  @ViewChild('ddd', { static: false }) dropdownRef: AngularMultiSelect;
  @ViewChild('template') template
  modalRef: BsModalRef;
  constructor(private apiservice: ApiserviceService, private tiltlecase: TitleCasePipe, private date: DatePipe, private modalService: BsModalService) { }
  public startdate: Date = new Date();
  public endDate: Date = new Date();
  private defaultstartdate: Date = new Date();
  public todayDate: Date = new Date();
  public childdata = [];
  public missedChildData = [];
  public responseData: any;
  public totalcount: number = 0;
  public totalMissedCount: number;
  public colors: Array<string> = ['#FF6633', '#FFB399', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  public userId: number;
  public datechanger = false;

  public dropdownSettings = {
    singleSelection: false,
    text: "Site Code",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    // enableFilterSelectAll	:true,
    noDataLabel: "No Data Available",
    classes: "myclass custom-class site1",
    showCheckbox: true,
    labelKey: "siteCode",
    // limitSelection: 3,
    primaryKey: 'siteCode',
    escapeToClose: false,
    searchBy: ['siteCode'],
    position: 'top'

  };
  public dropdownSettings2 = {
    singleSelection: true,
    text: "Category",
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    // enableFilterSelectAll	:true,
    noDataLabel: "No Data Available",
    classes: "myclass custom-class site1",
    showCheckbox: true,
    labelKey: "name",
    // limitSelection: 3,
    primaryKey: 'id',
    escapeToClose: false,
    searchBy: ['name'],
    position: 'top'

  };
  public mappedJson = [];

  public categorylist: Array<object> = [{ id: 1, name: 'Open Visits' }]
  public siteList: Array<object> = [];
  public selctedItems = [];
  public selectecatogery = [{ id: 1, name: 'Open Visits' }];
  public useraccount: any;
  public current = 0;
  public openVisitChart = Sunburst();
  public missedVisitsChart = Sunburst();


  public psflage: boolean = false;

  public psArray: Array<any> = [];
  public psmissedArray: Array<any> = [];


  public loadedcharcter: {};
  public psscount: number = 0;
  public popupdata: any;
  public psname: string;
  private parentchildcolor: Array<any> = [];
  private missedparentchildcolor: Array<any> = []
  public searchflag: number = 0



  ngOnInit(): void {
    // this.defaultstartdate.setDate(this.todayDate.getDate() - 7);
    // this.startdate.setDate(this.todayDate.getDate() - 7);
    // var data = sessionStorage.getItem("useraccount");
    // this.useraccount = JSON.parse(data);
    // if (this.useraccount != undefined || null) {
    //   this.userId = this.useraccount.userId;
    //   this.getUserSites();
    //   this.getVisitsDashboardDetails();

    // }
    this.openvists()

  }
  private getVisitsDashboardDetails(): void {
    this.psscount = 0;
    let siteList = this.selctedItems.length > 0 ? this.selctedItems.map(a => a.siteId) : [];
    var parameters = JSON.stringify({ "userId": this.userId, "startDate": this.date.transform(this.startdate, 'MM/dd/yyyy'), "endDate": this.date.transform(this.endDate, 'MM/dd/yyyy'), "officeId": siteList, "searchFlag": 1 });
    this.apiservice.getVisitsDashboardDetails(parameters).subscribe(
      response => {
        var count = 0;
        var missedcount = 0;
        this.datechanger = true;
        console.log(response);
        this.responseData = response;
        this.totalcount = this.responseData.totalOpenVisitsCount;
        this.totalMissedCount = this.responseData.totalMissedVisitsCount;
        console.log(this.responseData.missedVisitCountsByCSSLevel.length)
        if (this.totalcount == 0) {

          this.openvists(this.psArray)
        }
        else {
          for (let i = 0; i < this.responseData.openVisitCountsByCSSLevel.length; i++) {
            // let object = this.responseData.openVisitCountsByCSSLevel[i];
            let object: any = {}
            object.cssname = this.responseData.openVisitCountsByCSSLevel[i].cssName;
            object.cssId = this.responseData.openVisitCountsByCSSLevel[i].cssId;
            object.cssCount = this.responseData.openVisitCountsByCSSLevel[i].cssCount;
            object.color = this.colors[i];
            object.name = this.tiltlecase.transform(this.responseData.openVisitCountsByCSSLevel[i].cssName);
            object.id = this.responseData.openVisitCountsByCSSLevel[i].cssId;
            // object.count = this.responseData.openVisitCountsByCSSLevel[i].cssCount;
            let colorobject: any = { cssid: this.responseData.openVisitCountsByCSSLevel[i].cssId, color: i > this.colors.length ? this.colors[i - this.colors.length + 1] : this.colors[i] }
            this.parentchildcolor.push(colorobject)
            // this.childdata.push(object);
            this.psArray.push(object);
            console.log(this.parentchildcolor)
            count++;
          }
          // console.log(this.childdata)
          console.log(this.parentchildcolor)
          if (count == this.responseData.openVisitCountsByCSSLevel.length) {
            let pscount = 1;
            for (let i = 0; i < this.responseData.openVisitCountsByPSLevel.length; i++) {

              let object = {
                name: this.tiltlecase.transform(this.responseData.openVisitCountsByPSLevel[i].psName),
                count: this.responseData.openVisitCountsByPSLevel[i].psCount,
                parent: this.responseData.openVisitCountsByPSLevel[i].cssId,
                psName: this.responseData.openVisitCountsByPSLevel[i].psName,
                psCount: this.responseData.openVisitCountsByPSLevel[i].psCount,
                psId: this.responseData.openVisitCountsByPSLevel[i].psId,
                id: 'B' + pscount++,
                cssId: this.responseData.openVisitCountsByPSLevel[i].cssId,
                color: ''
              }
              for (let j = 0; j < this.parentchildcolor.length; j++) {
                if (object.parent == this.parentchildcolor[j].cssid) {

                  object.color = this.parentchildcolor[j].color;
                }
              }
              this.psArray.push(object);
              // this.getVisitsCountsToPSLevel(this.childdata[i].cssId,this.childdata[i].color);
            }
            this.openTreeArray();

          }
        }
        if (this.totalMissedCount == 0) {
          this.missedVisits(this.psmissedArray)
        }
        else {
          for (let i = 0; i < this.responseData.missedVisitCountsByCSSLevel.length; i++) {
            let object: any = {}
            object.cssname = this.responseData.missedVisitCountsByCSSLevel[i].cssName;
            object.cssId = this.responseData.missedVisitCountsByCSSLevel[i].cssId;
            object.cssCount = this.responseData.missedVisitCountsByCSSLevel[i].cssCount;
            object.color = this.colors[i];
            object.name = this.tiltlecase.transform(this.responseData.missedVisitCountsByCSSLevel[i].cssName);
            object.id = this.responseData.missedVisitCountsByCSSLevel[i].cssId;
            // object.count = this.responseData.missedVisitCountsByCSSLevel[i].cssCount;
            let colorobject: any = { cssid: this.responseData.missedVisitCountsByCSSLevel[i].cssId, color: i > this.colors.length ? this.colors[i - this.colors.length + 1] : this.colors[i] }
            this.missedparentchildcolor.push(colorobject)
            // this.childdata.push(object);
            this.psmissedArray.push(object);
            console.log("missed colors", this.missedparentchildcolor)
            missedcount++;
          }
          // console.log(this.childdata)
          console.log(this.parentchildcolor)
          if (missedcount == this.responseData.missedVisitCountsByCSSLevel.length) {

            let missedpscount: any = 1;
            for (let i = 0; i < this.responseData.missedVisitCountsByPSLevel.length; i++) {

              let object = {
                name: this.tiltlecase.transform(this.responseData.missedVisitCountsByPSLevel[i].psName),
                count: this.responseData.missedVisitCountsByPSLevel[i].psCount,
                parent: this.responseData.missedVisitCountsByPSLevel[i].cssId,
                psName: this.responseData.missedVisitCountsByPSLevel[i].psName,
                psCount: this.responseData.missedVisitCountsByPSLevel[i].psCount,
                psId: this.responseData.missedVisitCountsByPSLevel[i].psId,
                id: "A" + missedpscount++,
                cssId: this.responseData.missedVisitCountsByPSLevel[i].cssId,
                color: ''
              }
              for (let j = 0; j < this.missedparentchildcolor.length; j++) {
                if (object.parent == this.missedparentchildcolor[j].cssid) {

                  object.color = this.missedparentchildcolor[j].color;
                }
              }
              this.psmissedArray.push(object);
              // this.getVisitsCountsToPSLevel(this.childdata[i].cssId,this.childdata[i].color);
            }
            console.log(this.psmissedArray)
            this.MissedTreeArray();

          }

        }
      }
    )
  }


  public getUserSites(): void {
    var parameters = { "userId": this.userId };
    this.apiservice.getUserSites(JSON.stringify(parameters)).subscribe(
      response => {
        let data: any = response;
        this.siteList = data.siteList;
      }
    )
  }
  public chartclick(event: any, searchflag): void {
    console.log("click sunburst working", event)

    if (event !== null) {
      if (event.psName != undefined) {
        this.getPSVisitDetails(event.parent, event.psId, event.psName, searchflag)

      }
    }

  }

  public siteFilterChange(): void {
    this.openVisitChart.focusOnNode(null);
    this.missedVisitsChart.focusOnNode(null);
    // d3.select('#canvas').selectAll('svg').remove();
    this.psmissedArray = [];
    this.psArray = [];
    this.parentchildcolor = [];
    this.missedparentchildcolor = [];
    this.getVisitsDashboardDetails();
  }
  public siteselect(): void {
    if (this.selctedItems.length >= 0) {
      this.siteFilterChange();
    }

  }
  public siteAllselect(): void {
    if (this.selctedItems.length > 0) {
      // this.siteFilterChange();
      this.dropdownRef.closeDropdown();

    }
  }
  public onItemSelect(item: any): void {
    console.log(item);
    console.log(this.selctedItems);
    this.siteFilterChange();
  }
  public siteDeselect(): void {
    console.log(this.selctedItems)
    this.selctedItems.length = 0;
    // this.siteFilterChange();
    this.dropdownRef.closeDropdown();
  }


  private openTreeArray(): void {

    var data = this.psArray;
    console.log(data)
    localStorage.setItem('data', JSON.stringify(data))
    var tree = function (data, root) {
      var t = {};
      data.forEach(o => {
        Object.assign(t[o.id] = t[o.id] || {}, o);
        t[o.parent] = t[o.parent] || {};
        t[o.parent].children = t[o.parent].children || [];
        t[o.parent].children.push(t[o.id]);
        // console.log(o)
      });

      return t[root].children;
    }(data, undefined);

    console.log("finaltree", tree);
    this.openvists(tree);

  }
  private MissedTreeArray(): void {

    let data = this.psmissedArray;
    // console.log(data)
    var tree = function (data, root) {
      var t = {};
      data.forEach(o => {
        Object.assign(t[o.id] = t[o.id] || {}, o);
        t[o.parent] = t[o.parent] || {};
        t[o.parent].children = t[o.parent].children || [];
        t[o.parent].children.push(t[o.id]);
      });

      return t[root].children;
    }(data, undefined);

    console.log("finaltree", tree);
    this.missedVisits(tree);

  }

  public getPSVisitDetails(cssId, psId, psname, searchflag): void {

    this.psname = psname;
    let parameters = { "userId": this.userId, "startDate": this.date.transform(this.startdate, 'MM/dd/yyyy'), "endDate": this.date.transform(this.endDate, 'MM/dd/yyyy'), "officeId": [], "searchFlag": searchflag, "cssId": cssId, "psId": psId }
    this.apiservice.getPSVisitDetails(JSON.stringify(parameters)).subscribe(
      response => {
        console.log(response);
        let responsedata: any = response;
        this.popupdata = responsedata.psVisitDetails;
        console.log(this.popupdata)
        // this.modalRef = this.modalService.show(this.template);
        this.modalRef = this.modalService.show(this.template
          , Object.assign({}, { class: searchflag == 1 ? 'chartpopup' : 'chartpopup2' })
        );
      }
    )
  }

  public dateenter(startdate?, enddate?) {

    let startdateopt = Date.parse(this.date.transform(startdate, 'MM/dd/yyyy'));
    let enddateopt = Date.parse(this.date.transform(enddate, 'MM/dd/yyyy'));
    console.log(startdateopt <= enddateopt)
    console.log("start date", startdate)
    console.log("endate", enddate)

    if (startdateopt <= enddateopt) {
      this.startdate = startdate;
      this.endDate = enddate;
      this.siteFilterChange();
    }
  }
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
    this.mappedJson = this.popupdata.map(item => {
      if (this.searchflag == 1) {
        return {
          "Scheduled Start": item.schBeginDateTime ? moment(item.schBeginDateTime).format('MM/DD/YYYY hh:mm a') : '',
          "Scheduled End": item.schEndDateTime ? moment(item.schEndDateTime).format('MM/DD/YYYY hh:mm a') : '',
          " Service Name": item.serviceName
        }
      } else return {
        "Scheduled Start": item.schBeginDateTime ? moment(item.schBeginDateTime).format('MM/DD/YYYY hh:mm a') : '',
        "Scheduled End": item.schEndDateTime ? moment(item.schEndDateTime).format('MM/DD/YYYY hh:mm a') : '',
        "DCS Name": item.dcsName,
        " Service Name": item.serviceName
      }

    })
    var wscols = [
      { wch: 22 },
      { wch: 20 },
      { wch: 30 },
    ];
    var wscols2 = [
      { wch: 22 },
      { wch: 20 },
      { wch: 20 },
      { wch: 30 }
    ];
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.mappedJson);
    worksheet["!cols"] = this.searchflag == 1 ? wscols : wscols2;
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, this.psname);



  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'string' });
    /***********`
    *YOUR EXCEL FILE'S NAME
    */
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
  public reset(): void {
    this.datechanger = false;
    this.startdate = this.defaultstartdate;
    this.endDate = this.todayDate;
    this.selctedItems = [];
    this.siteFilterChange();
  }


  private openvists(tree?): void {
    d3.select('#canvas').selectAll('svg').remove();
    let tree2 = [
      {
        "interfaceDefinitionId": 3,
        "interfaceName": "CareBridge",
        "datasetList": [
          {
            "dataFlow": "Export",
            "name": "Completed Visits",
            "lastActivity": "11/12/2020 11:11 AM",
            "id": "5"
          },
          {
            "dataFlow": "Export",
            "name": "sdsd",
            "lastActivity": "",
            "id": "28"
          },
          {
            "dataFlow": "Export",
            "name": "test",
            "lastActivity": "",
            "id": "30"
          },
          {
            "dataFlow": "Export",
            "name": "Testnow",
            "lastActivity": "",
            "id": "29"
          }
        ]
      },
      {
        "interfaceDefinitionId": 11,
        "interfaceName": "CareBridge",
        "datasetList": []
      },
      {
        "interfaceDefinitionId": 10,
        "interfaceName": "CareBridge",
        "datasetList": []
      },
      {
        "interfaceDefinitionId": 4,
        "interfaceName": "HHA",
        "datasetList": [
          {
            "dataFlow": "Export",
            "name": "Datset1",
            "lastActivity": "",
            "id": "6"
          },
          {
            "dataFlow": "Export",
            "name": "dcs datset",
            "lastActivity": "",
            "id": "45"
          },
          {
            "dataFlow": "Export",
            "name": "dcs datset",
            "lastActivity": "",
            "id": "49"
          },
          {
            "dataFlow": "Export",
            "name": "dcs datset",
            "lastActivity": "",
            "id": "52"
          },
          {
            "dataFlow": "Import",
            "name": "test HHA",
            "lastActivity": "",
            "id": "56"
          }
        ]
      },
      {
        "interfaceDefinitionId": 9,
        "interfaceName": "HHA NJ",
        "datasetList": [
          {
            "dataFlow": "Export",
            "name": "Completed Visits",
            "lastActivity": "",
            "id": "26"
          },
          {
            "dataFlow": "Export",
            "name": "DCS",
            "lastActivity": "",
            "id": "25"
          },
          {
            "dataFlow": "Import",
            "name": "DCS DATASET",
            "lastActivity": "",
            "id": "53"
          },
          {
            "dataFlow": "Export",
            "name": "HHA NJ TEST 2",
            "lastActivity": "",
            "id": "37"
          },
          {
            "dataFlow": "Export",
            "name": "HHANJ-MAR30",
            "lastActivity": "",
            "id": "59"
          },
          {
            "dataFlow": "Import",
            "name": "Test",
            "lastActivity": "",
            "id": "32"
          },
          {
            "dataFlow": "Import",
            "name": "test",
            "lastActivity": "",
            "id": "35"
          },
          {
            "dataFlow": "Export",
            "name": "Test",
            "lastActivity": "",
            "id": "36"
          },
          {
            "dataFlow": "Import",
            "name": "test",
            "lastActivity": "",
            "id": "54"
          },
          {
            "dataFlow": "Import",
            "name": "TEST DATASET",
            "lastActivity": "",
            "id": "60"
          },
          {
            "dataFlow": "Export",
            "name": "TEST dcs hhanj",
            "lastActivity": "",
            "id": "57"
          },
          {
            "dataFlow": "Import",
            "name": "Test HHANJ",
            "lastActivity": "",
            "id": "55"
          }
        ]
      },
      {
        "interfaceDefinitionId": 1,
        "interfaceName": "Tellus",
        "datasetList": [
          {
            "dataFlow": "Export",
            "name": "aquila",
            "lastActivity": "",
            "id": "8"
          },
          {
            "dataFlow": "Import",
            "name": "test",
            "lastActivity": "",
            "id": "23"
          },
          {
            "dataFlow": "Export",
            "name": "Visits",
            "lastActivity": "",
            "id": "1"
          }
        ]
      },
      {
        "interfaceDefinitionId": 8,
        "interfaceName": "test 001",
        "datasetList": [
          {
            "dataFlow": "Export",
            "name": "001",
            "lastActivity": "",
            "id": "24"
          }
        ]
      },
      {
        "interfaceDefinitionId": 12,
        "interfaceName": "Test IN",
        "datasetList": [
          {
            "dataFlow": "Export",
            "name": "PS",
            "lastActivity": "",
            "id": "58"
          }
        ]
      },
      {
        "interfaceDefinitionId": 7,
        "interfaceName": "Test intertface2",
        "datasetList": [
          {
            "dataFlow": "Export",
            "name": "Test Dataset",
            "lastActivity": "",
            "id": "31"
          },
          {
            "dataFlow": "Export",
            "name": "Test2",
            "lastActivity": "",
            "id": "21"
          },
          {
            "dataFlow": "Export",
            "name": "Test3",
            "lastActivity": "",
            "id": "22"
          },
          {
            "dataFlow": "Export",
            "name": "Testdataset",
            "lastActivity": "",
            "id": "14"
          }
        ]
      }
    ]
    var mydata: any = {
      "name": this.totalcount !== 0 ? "Open Visits" : 'Dashboard',
      // "count": "TotalVisitsCoun" + this.totalcount.toString(),
      "color": 'lightblue',
      "datasetList": tree2
    }
    // var el = document.getElementById('canvas')
    // if (el)
    {

      // this.openVisitChart
      //   .data(mydata)
      //   .size((node: any) => {
      //     return node.count;
      //   })
      //   .color('color')
      //   .label(
      //     (d: any) => {

      //       return d.name;
      //     })
      //   .height(500)
      //   .width(500)
      //   .minSliceAngle(0)
      //   .excludeRoot(false)
      //   .tooltipContent((d, node) => `Count: <i>${node.value}</i>`)
      //   .onClick((node) => {
      //     console.log(node)
      //     this.chartclick(node, 1);
      //     this.searchflag = 1;
      //     this.openVisitChart.focusOnNode(node);
      //   })
      //   (document.getElementById('canvas'))

      this.openVisitChart.data(mydata)
        .size((node: any) => {
          return node.id != undefined ? node.id : node.interfaceDefinitionId;
        })
        .color((parent) => color(parent ? parent.name : null)).children('datasetList')
        .label(
          (d: any) => {
            if (d.name != undefined) {
              return d.name;

            } else {
              return d.interfaceName
            }
          })
        .height(500)
        .width(500)
        .minSliceAngle(0)
        .excludeRoot(true)



        (document.getElementById('canvas'))

    }

  }
  private missedVisits(tree): void {
    d3.select('#canvas2').selectAll('svg').remove();

    var mydata: any = {
      "name": this.totalcount !== 0 ? "Missed Visits" : 'NO Missed Visits Found',
      // "count": "TotalVisitsCoun" + this.totalcount.toString(),
      "color": 'lightblue',
      "children": tree
    }
    this.missedVisitsChart
      .data(mydata)
      .size((node: any) => {
        return node.count;
      })
      .color('color')
      .label(
        (d: any) => {

          return d.name;
        })
      .height(500)
      .width(500)
      .minSliceAngle(0)
      .excludeRoot(false)
      .tooltipContent((d, node) => `Count: <i>${node.value}</i>`)
      .onClick((node) => {
        console.log(node)
        this.searchflag = 2;
        this.chartclick(node, 2);
        this.missedVisitsChart.focusOnNode(node);
      })
      (document.getElementById('canvas2'))

  }
}
