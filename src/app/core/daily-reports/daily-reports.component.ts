import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.sass']
})
export class DailyReportsComponent implements OnInit {

  public navbuttons:Array<boolean>=[false,true,false];
  constructor() { }

  ngOnInit(): void {
  }

}
