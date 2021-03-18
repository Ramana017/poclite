import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsEditRoutingModule } from './ps-edit-routing.module';
import { PsEditComponent } from './ps-edit.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlternateIdComponent } from './alternate-id/alternate-id.component';
import { CommentsComponent } from './comments/comments.component';
import { TelephonyComponent } from './telephony/telephony.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DetailsComponent } from './details/details.component';
import { LanguagesComponent } from './languages/languages.component';
import { AllergiesComponent } from './allergies/allergies.component';
import { MedicationComponent } from './medication/medication.component';
import { HealthComponent } from './health/health.component';
import { GurantorComponent } from './gurantor/gurantor.component';
import { PersonServedComponent } from './person-served/person-served.component';
@NgModule({
  declarations: [PsEditComponent, AlternateIdComponent, CommentsComponent, TelephonyComponent, HospitalsComponent, DetailsComponent, LanguagesComponent, AllergiesComponent, MedicationComponent, HealthComponent, GurantorComponent, PersonServedComponent],
  imports: [
    CommonModule,
    SharedModule,
    PsEditRoutingModule,
    TabsModule.forRoot(),
    FileUploadModule,HttpClientModule,
    ModalModule
  ]
})
export class PsEditModule { }
