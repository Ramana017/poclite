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
import { AuthorizationComponent } from './core/create_new_ps/authorization/authorization.component'



const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'summary', component: SummarytableComponent, },

  { path: 'charts', component: ChartsComponent },
  { path: 'widgets', component: DashboardComponent },
  {
    path: "registration-re", component: RegistrationComponent,
    children: [
      { path: "child-guarantor", component: GuarantorDetailsComponent },
      { path: "child-admission", component: AdmissionDetailsComponent },
      { path: "child-payorplan", component: PayorPlanDetailsComponent },
      { path: "child-basic", component: BasicInfoComponent },
      { path: "child-authorization", component: AuthorizationComponent },
    ]
  },
  { path: '**', redirectTo: "/widgets", pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
