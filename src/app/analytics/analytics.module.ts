import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { SharedModule } from 'primeng/api';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { DailyEvvComponent } from './daily-evv/daily-evv.component';
import { DailyCancelComponent } from './daily-cancel/daily-cancel.component';


@NgModule({
  declarations: [DailyScheduleComponent, DailyEvvComponent, DailyCancelComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    SharedModule
  ]
})
export class AnalyticsModule { }
