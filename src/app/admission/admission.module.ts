import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { AdmissionComponent } from './admission.component';
import { EditAdmissionComponent } from './edit-admission/edit-admission.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MultiSelectModule} from 'primeng/multiselect';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {SplitButtonModule} from 'primeng/splitbutton';
@NgModule({
  declarations: [AdmissionComponent, EditAdmissionComponent],
  imports: [
    CommonModule,
    AdmissionRoutingModule,DragDropModule,OverlayPanelModule,MultiSelectModule,ButtonModule,CheckboxModule,BsDropdownModule,SplitButtonModule
  ]
})
export class AdmissionModule { }
