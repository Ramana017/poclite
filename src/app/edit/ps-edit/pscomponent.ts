import { CommunicationDashboardComponent } from "src/app/core/communication-dashboard/communication-dashboard.component";
import { DashboardComponent } from "src/app/core/dashboard/dashboard.component";
import { PsAdmissionsComponent } from "src/app/core/dashboard/ps-admissions/ps-admissions.component";
import { PsAuthorizationComponent } from "src/app/core/dashboard/ps-authorization/ps-authorization.component";
import { PsDcsComponent } from "src/app/core/dashboard/ps-dcs/ps-dcs.component";
import { PsHomeComponent } from "src/app/core/dashboard/ps-home/ps-home.component";
import { AddressesComponent } from "./addresses/addresses.component";
import { AllergiesComponent } from "./allergies/allergies.component";
import { AlternateIdComponent } from "./alternate-id/alternate-id.component";
import { CommentsComponent } from "./comments/comments.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { DetailsComponent } from "./details/details.component";
import { GurantorComponent } from "./gurantor/gurantor.component";
import { HealthComponent } from "./health/health.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
import { LanguagesComponent } from "./languages/languages.component";
import { MedicationComponent } from "./medication/medication.component";
import { PersonServedComponent } from "./person-served/person-served.component";
import { PsEditComponent } from "./ps-edit.component";
import { TelephonyComponent } from "./telephony/telephony.component";

export const psComponents=[PsEditComponent,
  AlternateIdComponent,
  CommentsComponent,
  TelephonyComponent,
  HospitalsComponent,
  DetailsComponent,
  LanguagesComponent,
  AllergiesComponent,
  MedicationComponent,
  HealthComponent,
  GurantorComponent,
  PersonServedComponent,
  AddressesComponent,
  ContactsComponent];

  export const dashboardcomponents=[
    DashboardComponent,
    PsHomeComponent,
    PsAdmissionsComponent,
    PsAuthorizationComponent,
    PsDcsComponent,
  ]
