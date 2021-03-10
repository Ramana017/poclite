import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';

import { LocateDcsComponent } from './locate-dcs/locate-dcs.component';
import { DcsRouteMapComponent } from './dcs-route-map/dcs-route-map.component';
import { PsDcsMapComponent } from './ps-dcs-map/ps-dcs-map.component';


@NgModule({
  declarations: [MapsComponent,  LocateDcsComponent, DcsRouteMapComponent, PsDcsMapComponent],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
