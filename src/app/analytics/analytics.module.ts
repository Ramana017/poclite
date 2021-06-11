import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { DailyEvvComponent } from './daily-evv/daily-evv.component';
import { DailyCancelComponent } from './daily-cancel/daily-cancel.component';
import { EvvStatsBranchComponent } from './evv-stats-branch/evv-stats-branch.component';
import {AngularPivotTableModule} from 'angular-pivot-table';
import { SharedModule } from '../shared/shared.module';
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { PpivotTableComponent } from './pivot-table/ppivot-table.component';




@NgModule({
  declarations: [DailyScheduleComponent, DailyEvvComponent, DailyCancelComponent, EvvStatsBranchComponent, PpivotTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    AnalyticsRoutingModule,
    AngularPivotTableModule,
    PivotViewModule
  ]
})
export class AnalyticsModule { }
