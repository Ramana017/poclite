import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-layout',
  templateUrl: './chart-layout.component.html',
  styleUrls: ['./chart-layout.component.sass']
})
export class ChartLayoutComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [400, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'count';

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


  onSelect(event) {
    console.log(event);
  }

}
export var single = [
  {
    "name": "10/28/2020",
    "value": 894
  },
  {
    "name": "10/29/2020",
    "value": 500
  },
  {
    "name": "10/30/2020",
    "value": 720
  },
  {
    "name": "11/01/2020",
    "value": 894
  },
  {
    "name": "11/02/2020",
    "value": 500
  },
  {
    "name": "11/03/2020",
    "value": 720
  },
  {
    "name": "11/04/2020",
    "value": 720
  },
  {
    "name": "11/05/2020",
    "value": 894
  },
  {
    "name": "11/06/2020",
    "value": 500
  },
  {
    "name": "11/07/2020",
    "value": 720
  }
];
