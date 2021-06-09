import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';

import { AnalyticsComponent } from './analytics.component';
import { DailyCancelComponent } from './daily-cancel/daily-cancel.component';
import { DailyEvvComponent } from './daily-evv/daily-evv.component';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';

const routes: Routes = [{ path: '', component: AnalyticsComponent },
{path:'daily-schedule',canActivate: [AuthGuard],component:DailyScheduleComponent},
{path:'daily-evv',canActivate: [AuthGuard],component:DailyEvvComponent},
{path:'daily-cancel',canActivate: [AuthGuard],component:DailyCancelComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }