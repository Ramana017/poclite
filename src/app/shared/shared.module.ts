import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgmCoreModule}from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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

  ],

})
export class SharedModule {
}

