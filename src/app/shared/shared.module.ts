import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgmCoreModule, LazyMapsAPILoaderConfigLiteral, LAZY_MAPS_API_CONFIG } from '@agm/core';
import { map } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    AgmCoreModule.forRoot(
      {
      }),
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: agmConfigFactory,
      deps: [HttpClient, LAZY_MAPS_API_CONFIG],
      multi: true
    },

  ],
  exports: [
    BsDatepickerModule,
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule,


  ]
})
export class SharedModule { }
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
          return mapresponse;
        })
      ).toPromise()

    })
  ).toPromise();
}
