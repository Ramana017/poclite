import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injectable, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login/login.component';
import { ConfigComponent } from './core/config/config.component';
import { SummarytableComponent } from './core/summarytable/summarytable.component';
import { CorrectionheaderComponent } from './corrections/correctionheader/correctionheader.component';
import { ScheduledvarianceComponent } from './corrections/scheduledvariance/scheduledvariance.component';
import { InvalidcalleridComponent } from './corrections/invalidcallerid/invalidcallerid.component';
import { MileageexceptionComponent } from './corrections/mileageexception/mileageexception.component';
import { TarveltimeexceptionComponent } from './corrections/tarveltimeexception/tarveltimeexception.component';
import {GpsdescrepancyComponent } from './corrections/gpsdescrepancy/gpsdescrepancy.component';
import { ClockinComponent } from './corrections/clockin/clockin.component';
import { ClockoutComponent } from './corrections/clockout/clockout.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './core/header/header.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe, APP_BASE_HREF, TitleCasePipe } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ClockInAndOutComponent } from './corrections/clock-in-and-out/clock-in-and-out.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsComponent } from './core/charts/charts.component';
// import { NgxGaugeModule } from 'ngx-gauge';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment';
import { InvalidTokenComponent } from './corrections/invalid-token/invalid-token.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';

import {RegistrationComponent} from './core/create_new_ps/registration/registration.component';
import {HeaderComponentPS} from './core/create_new_ps/header/header.component';
import{BasicInfoComponent} from './core/create_new_ps/basic-info/basic-info.component';
import{GuarantorDetailsComponent}from './core/create_new_ps/guarantor-details/guarantor-details.component';
import {AdmissionDetailsComponent} from './core/create_new_ps/admission-details/admission-details.component';
import {PayorPlanDetailsComponent} from './core/create_new_ps/payor-plan-details/payor-plan-details.component';
import {AuthorizationComponent} from './core/create_new_ps/authorization/authorization.component';
import { ToastrModule } from 'ngx-toastr';
import {PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { PsBasicComponent } from './core/update_ps/ps-basic/ps-basic.component';
import { PsHeaderComponent } from './core/update_ps/ps-header/ps-header.component';
import { PsGurantorComponent } from './core/update_ps/ps-gurantor/ps-gurantor.component';
import { PsTelephonyComponent } from './core/update_ps/ps-telephony/ps-telephony.component';
import { PsAddressComponent } from './core/update_ps/ps-address/ps-address.component';
import { PsContactsComponent } from './core/update_ps/ps-contacts/ps-contacts.component';
import { EditPsComponent } from './core/update_ps/edit-ps/edit-ps.component';
import { ChartLayoutComponent } from './core/chart-layout/chart-layout.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import {DomsanitizePipe, FilterPipe, PhonePipe} from '../app/pipes/domsanitize.pipe'

import { VisitReviewComponent } from './core/visit-review/visit-review.component';
import { ReviewExceptionpopupComponent } from './core/review-exceptionpopup/review-exceptionpopup.component';
import { AnalyticsComponent } from './core/analytics/analytics.component';
import { MaintainenceComponent } from './core/maintainence/maintainence.component';
import { DailyReportsComponent } from './core/daily-reports/daily-reports.component';
import { TelephonyStatsComponent } from './core/telephony-stats/telephony-stats.component';
import { UtilizationStatsComponent } from './core/utilization-stats/utilization-stats.component';
import { SharedModule } from './shared/shared.module';
import { AgmCoreModule, LazyMapsAPILoaderConfigLiteral, LAZY_MAPS_API_CONFIG } from '@agm/core';
import { map } from 'rxjs/operators';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
const mapsApikey=atob(sessionStorage.getItem('mapsApiKey'));
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderModule } from 'ngx-order-pipe';
import { CommunicationDashboardComponent } from './core/communication-dashboard/communication-dashboard.component';

import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfigComponent,
    SummarytableComponent,
    CorrectionheaderComponent,
    ScheduledvarianceComponent,
    InvalidcalleridComponent,
    MileageexceptionComponent,
    TarveltimeexceptionComponent,
    GpsdescrepancyComponent,
    ClockinComponent,
    ClockoutComponent,
    HeaderComponent,
    ClockInAndOutComponent,
    ChartsComponent,
    InvalidTokenComponent,
    DashboardComponent,
    HeaderComponentPS,
    RegistrationComponent,
    BasicInfoComponent,
    GuarantorDetailsComponent,
    AdmissionDetailsComponent,
    PayorPlanDetailsComponent,
    AuthorizationComponent,
    PageNotFoundComponent,
    PsBasicComponent,
    PsHeaderComponent,
    PsGurantorComponent,
    PsTelephonyComponent,
    PsAddressComponent,
    PsContactsComponent,
    EditPsComponent,
    ChartLayoutComponent,
    VisitReviewComponent,
    DomsanitizePipe,
    FilterPipe,
    PhonePipe,
    ReviewExceptionpopupComponent,
    AnalyticsComponent,
    MaintainenceComponent,
    DailyReportsComponent,
    TelephonyStatsComponent,
    UtilizationStatsComponent,
    CommunicationDashboardComponent,



  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AutocompleteLibModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AngularMultiSelectModule,
    TimepickerModule.forRoot(),

    AgmCoreModule.forRoot(
      {
        apiKey:mapsApikey
      }),
    NgbModule,
    // NgxGaugeModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    ToastrModule.forRoot(),
    NgxChartsModule,
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    MultiSelectModule,
    NgSelectModule,
    OrderModule,
    DialogModule,
    ButtonModule,
    ConfirmPopupModule,
    InputTextareaModule,
    DropdownModule,
    OverlayPanelModule,
    InputTextModule,

    ConfirmDialogModule

  ],
  providers: [DatePipe, BsModalRef,TitleCasePipe,ConfirmationService
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue: window['base-href']
    },
    {
      provide: APP_INITIALIZER,
      useFactory: agmConfigFactory,
      deps: [HttpClient, LAZY_MAPS_API_CONFIG],
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [CorrectionheaderComponent, MileageexceptionComponent, LoginComponent, AppComponent]
})
export class AppModule { }




export function agmConfigFactory(http: HttpClient, config: LazyMapsAPILoaderConfigLiteral) {
  return () => http.get('assets/url.json').pipe(
    map(urlresponse => {
      console.log(urlresponse)
      let data: any = urlresponse
      http.get(data.webserviceURL + '/callmanagement/getGoogleApiKey').pipe(
        map(mapresponse => {
          console.log(mapresponse)
          let data2: any = mapresponse;
          config.apiKey = data2.googleAPIKey;
          console.log(config.apiKey)
          sessionStorage.setItem('mapsApiKey',btoa(data2.googleAPIKey))
          return mapresponse;
        })
      ).toPromise()

    })
  ).toPromise();
}
