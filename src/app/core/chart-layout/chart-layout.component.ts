import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-chart-layout',
  templateUrl: './chart-layout.component.html',
  styleUrls: ['./chart-layout.component.sass']
})
export class ChartLayoutComponent implements OnInit {
  public siteList= [ {
    "siteCode": "72072",
    "siteId": 64,
    "siteName": "CN COT ADOPTION SUBSIDY"
    },
    {
    "siteCode": "72087",
    "siteId": 52,
    "siteName": "CN COT NARBHA"
    },
    {
    "siteCode": "72013",
    "siteId": 55,
    "siteName": "CN COTTONWOOD DDD"
    },
    {
    "siteCode": "72014",
    "siteId": 56,
    "siteName": "CN COTTONWOOD EVERCARE"
    },



    ]
    public selectsite=[]
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
    public dropdownSettings2 = {
      singleSelection: false,
      text: "CSS",
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
  single: any[];
  multi: any[];
  animationState = 'out';
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'count';

  public displayVisitCards:boolean=true;
  public displyHighlightCard='';

  colorScheme = {
    domain: ['#4472c3']
  };


  constructor() {
    Object.assign(this, { single })

   }
  public psList:Array<any>=[];
  public pskeyword:string='';
  public tableData:Array<any>=[];
  ngOnInit(): void {

  }
  visits(){
    $('.divA').toggleClass('hide');
    this.displayVisitCards=true;
  }

  onSelect(event) {
    console.log(event);
  }


  public openvisits(str){
  this.displyHighlightCard=str;
  this.displayVisitCards=false;

  }
}
export var single = [
  {
    "name": "10/28/2020",
    "value": 9
  },
  {
    "name": "10/29/2020",
    "value": 50
  },
  {
    "name": "10/30/2020",
    "value": 72
  },
  {
    "name": "11/01/2020",
    "value": 8
  },
  {
    "name": "11/02/2020",
    "value": 50
  },
  {
    "name": "11/03/2020",
    "value": 20
  },
  {
    "name": "11/04/2020",
    "value": 20
  },
  {
    "name": "11/05/2020",
    "value": 94
  },
  {
    "name": "11/06/2020",
    "value": 55
  },
  {
    "name": "11/07/2020",
    "value": 68
  }
];
