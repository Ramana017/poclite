import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.sass']
})
export class DailyScheduleComponent implements OnInit {

  constructor() { }

  public scheduledHoursList=[];

  ngOnInit(): void {
  }

}
