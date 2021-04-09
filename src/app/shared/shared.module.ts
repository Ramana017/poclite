import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgmCoreModule}from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


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
    NgSelectModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule {
}

