import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmissionComponent } from './admission.component';
import { EditAdmissionComponent } from './edit-admission/edit-admission.component';

const routes: Routes = [{ path: '', component: AdmissionComponent },
{path:'edit-admission',component:EditAdmissionComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule {
  static components = [EditAdmissionComponent]
 }
