import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent implements OnInit {
 public MangmentScreens:Array<Boolean>=[true,false,false,false]
  constructor() { }

  ngOnInit(): void {
  }

}
