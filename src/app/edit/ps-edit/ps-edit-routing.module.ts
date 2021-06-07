import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/core/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/services/auth.guard';

import { PsEditComponent } from './ps-edit.component';

const routes: Routes = [
{ path: '', component: PsEditComponent },
{ path: 'widgets', canActivate: [AuthGuard], component: DashboardComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsEditRoutingModule { }
