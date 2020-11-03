import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-layout',
  templateUrl: './chart-layout.component.html',
  styleUrls: ['./chart-layout.component.sass']
})
export class ChartLayoutComponent implements OnInit {

  constructor() { }
  public psList:Array<any>=[];
  public pskeyword:string='';
  public tableData:Array<any>=[];
  ngOnInit(): void {

  }

}
