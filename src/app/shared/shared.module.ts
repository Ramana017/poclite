import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgmCoreModule}from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderModule } from 'ngx-order-pipe';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {RadioButtonModule} from 'primeng/radiobutton';
import { AutoCompleteModule } from "primeng/autocomplete";
import {SplitButtonModule} from 'primeng/splitbutton';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OrderModule,
    DialogModule,
    ButtonModule,
    ConfirmPopupModule,
    InputTextareaModule,
    DropdownModule,
    OverlayPanelModule,
    InputTextModule,
    RadioButtonModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    SplitButtonModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot()

  ],
  providers: [
  ],
  exports: [
    BsDatepickerModule,
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropdownModule,
    NgSelectModule,
    OrderModule,
    DialogModule,
    ButtonModule,
    ConfirmPopupModule,
    InputTextareaModule,
    DropdownModule,
    OverlayPanelModule,
    InputTextModule,
    SplitButtonModule,
    AutoCompleteModule,
    RadioButtonModule,
    ConfirmDialogModule,
    TabsModule,
    TooltipModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule {
}

