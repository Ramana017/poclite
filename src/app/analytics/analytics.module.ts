import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { SharedModule } from 'primeng/api';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { DailyEvvComponent } from './daily-evv/daily-evv.component';
import { DailyCancelComponent } from './daily-cancel/daily-cancel.component';
import { EvvStatsBranchComponent } from './evv-stats-branch/evv-stats-branch.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {AngularPivotTableModule} from 'angular-pivot-table';


@NgModule({
  declarations: [DailyScheduleComponent, DailyEvvComponent, DailyCancelComponent, EvvStatsBranchComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    SharedModule,
    TooltipModule,
    AngularPivotTableModule
  ]
})
export class AnalyticsModule { }
