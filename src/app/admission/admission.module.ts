import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { AdmissionComponent } from './admission.component';
import { EditAdmissionComponent } from './edit-admission/edit-admission.component';


@NgModule({
  declarations: [AdmissionComponent, EditAdmissionComponent],
  imports: [
    CommonModule,
    AdmissionRoutingModule
  ]
})
export class AdmissionModule { }
