import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulingmoduleRoutingModule } from './schedulingmodule-routing.module';
import { SchedulingmoduleComponent } from './schedulingmodule.component';
import { ScheduleManagementComponent } from '../core/schedule-management/schedule-management.component';
import { CalenderSchedulingComponent } from '../core/calender-scheduling/calender-scheduling.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignDCSComponent } from './assign-dcs/assign-dcs.component';
import { AddVisitsComponent } from './add-visits/add-visits.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { CancelCodeComponent } from './cancel-code/cancel-code.component';


import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { MoveVisitsComponent } from './move-visits/move-visits.component';
import { DcsResExpComponent } from './dcs-res-exp/dcs-res-exp.component';


@NgModule({
  declarations: [SchedulingmoduleComponent,
    ScheduleManagementComponent,
    CalenderSchedulingComponent,
    AssignDCSComponent,
    AddVisitsComponent,
    ChangeStatusComponent,
    CancelCodeComponent,
    MoveVisitsComponent,
    DcsResExpComponent],
  imports: [
    CommonModule,
    SchedulingmoduleRoutingModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers:[BsModalRef]
})
export class SchedulingmoduleModule { }
