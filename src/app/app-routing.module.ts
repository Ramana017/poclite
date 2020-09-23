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
import {PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth.guard';
import { PsBasicComponent } from './core/update_ps/ps-basic/ps-basic.component';
import { EditPsComponent } from './core/update_ps/edit-ps/edit-ps.component';
import { PsGurantorComponent } from './core/update_ps/ps-gurantor/ps-gurantor.component';



const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  {path: 'edit-ps',component:EditPsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'summary',canActivate:[AuthGuard], component: SummarytableComponent, },

  { path: 'charts',canActivate:[AuthGuard], component: ChartsComponent },
  { path: 'widgets',canActivate:[AuthGuard], component: DashboardComponent },
  {
    path: "registration-re", canActivate:[AuthGuard],canActivateChild:[AuthGuard], component: RegistrationComponent,
    children: [
      { path: "child-guarantor", component: GuarantorDetailsComponent },
      { path: "child-admission", component: AdmissionDetailsComponent },
      { path: "child-payorplan", component: PayorPlanDetailsComponent },
      { path: "child-basic", component: BasicInfoComponent },
      { path: "child-authorization", component: AuthorizationComponent },
    ]
  },
  {
    path: "edit-ps", canActivate:[AuthGuard], component: EditPsComponent,
    children: [
      { path: "child-ps", component: PsBasicComponent },
      { path: "child-guarantor", component: PsGurantorComponent },
      // { path: "child-payorplan", component: PayorPlanDetailsComponent },
      // { path: "child-basic", component: BasicInfoComponent },
      // { path: "child-authorization", component: AuthorizationComponent },
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
