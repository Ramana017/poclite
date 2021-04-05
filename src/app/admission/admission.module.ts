import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { AdmissionComponent } from './admission.component';
import { EditAdmissionComponent } from './edit-admission/edit-admission.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AdmissionComponent, EditAdmissionComponent],
  imports: [
    CommonModule,
    AdmissionRoutingModule,DragDropModule
  ]
})
export class AdmissionModule { }
