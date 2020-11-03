import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-layout',
  templateUrl: './chart-layout.component.html',
  styleUrls: ['./chart-layout.component.sass']
})
export class ChartLayoutComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#bbbbbbbb']
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
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
  {
    "name": "Germany2",
    "value": 8940000
  },
  {
    "name": "USA2",
    "value": 5000000
  },
  {
    "name": "France2",
    "value": 7200000
  }
];
