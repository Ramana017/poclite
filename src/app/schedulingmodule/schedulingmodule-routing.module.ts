import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderSchedulingComponent } from '../core/calender-scheduling/calender-scheduling.component';
import { ScheduleManagementComponent } from '../core/schedule-management/schedule-management.component';

import { SchedulingmoduleComponent } from './schedulingmodule.component';

const routes: Routes = [
  { path: '', component: SchedulingmoduleComponent },
  {path:'scheduling',component:ScheduleManagementComponent},
  { path: 'calendar', component: CalenderSchedulingComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingmoduleRoutingModule { }
