import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgmCoreModule, LazyMapsAPILoaderConfigLiteral, LAZY_MAPS_API_CONFIG } from '@agm/core';
import { map } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const mapsApikey=sessionStorage.getItem('mapsApiKey');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    AgmCoreModule.forRoot(
      {
        apiKey:mapsApikey,
      }),
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
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule {
}

