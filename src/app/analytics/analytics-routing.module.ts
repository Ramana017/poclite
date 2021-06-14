import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';

import { AnalyticsComponent } from './analytics.component';
import { DailyCancelComponent } from './daily-cancel/daily-cancel.component';
import { DailyEvvComponent } from './daily-evv/daily-evv.component';
import { DailyReportsComponent } from './daily-reports/daily-reports.component';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { EvvStatsBranchComponent } from './evv-stats-branch/evv-stats-branch.component';
import { PpivotTableComponent } from './pivot-table/ppivot-table.component';

const routes: Routes = [
{ path: 'analytics',canActivate:[AuthGuard] ,component: AnalyticsComponent },
{path:'daily-schedule',canActivate: [AuthGuard],component:DailyScheduleComponent},
{path:'daily-evv',canActivate: [AuthGuard],component:DailyEvvComponent},
{path:'daily-cancel',canActivate: [AuthGuard],component:DailyCancelComponent},
{path:'evv-stats',canActivate: [AuthGuard],component:EvvStatsBranchComponent},
{path:'pivot',canActivate:[AuthGuard],component:PpivotTableComponent},
{path:'daily-reports',canActivate: [AuthGuard],component:DailyReportsComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
