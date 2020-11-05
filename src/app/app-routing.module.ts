import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login/login.component';
import { SummarytableComponent } from './core/summarytable/summarytable.component';
import { ChartsComponent } from './core/charts/charts.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';

import { RegistrationComponent } from './core/create_new_ps/registration/registration.component';
import { HeaderComponentPS } from './core/create_new_ps/header/header.component';
import { BasicInfoComponent } from './core/create_new_ps/basic-info/basic-info.component';
import { GuarantorDetailsComponent } from './core/create_new_ps/guarantor-details/guarantor-details.component';
import { AdmissionDetailsComponent } from './core/create_new_ps/admission-details/admission-details.component';
import { PayorPlanDetailsComponent } from './core/create_new_ps/payor-plan-details/payor-plan-details.component';
import { AuthorizationComponent } from './core/create_new_ps/authorization/authorization.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth.guard';
import { PsBasicComponent } from './core/update_ps/ps-basic/ps-basic.component';
import { EditPsComponent } from './core/update_ps/edit-ps/edit-ps.component';
import { PsGurantorComponent } from './core/update_ps/ps-gurantor/ps-gurantor.component';
import { PsContactsComponent } from './core/update_ps/ps-contacts/ps-contacts.component';
import { PsAddressComponent } from './core/update_ps/ps-address/ps-address.component';
import { PsTelephonyComponent } from './core/update_ps/ps-telephony/ps-telephony.component';
import { ChartLayoutComponent } from './core/chart-layout/chart-layout.component';
import { VisitReviewComponent } from './core/visit-review/visit-review.component';



const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'summary', canActivate: [AuthGuard], component: SummarytableComponent, },
  // { path: 'visitreview', component: VisitReviewComponent },

  { path: 'charts', canActivate: [AuthGuard], component: ChartsComponent },
  // { path: 'chart-layout', component: ChartLayoutComponent },
  { path: 'widgets', canActivate: [AuthGuard], component: DashboardComponent },
  {
    path: "registration", canActivate: [AuthGuard], canActivateChild: [AuthGuard], component: RegistrationComponent,
    children: [
      { path: "guarantor", component: GuarantorDetailsComponent },
      { path: "admission", component: AdmissionDetailsComponent },
      { path: "payorplan", component: PayorPlanDetailsComponent },
      { path: "basic", component: BasicInfoComponent },
      { path: "authorization", component: AuthorizationComponent },
    ]
  },
  {
    path: "update", canActivate: [AuthGuard], component: EditPsComponent,
    children: [
      { path: "ps", component: PsBasicComponent },
      { path: "guarantor", component: PsGurantorComponent },
      { path: "contact", component: PsContactsComponent },
      { path: "addresses", component: PsAddressComponent },
      { path: "telephony", component: PsTelephonyComponent },
    ]
  },
  { path: "page-not-found", component: PageNotFoundComponent }
  ,
  { path: '**', redirectTo: "/page-not-found", pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
