import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';

import { LocateDcsComponent } from './locate-dcs/locate-dcs.component';
import { DcsRouteMapComponent } from './dcs-route-map/dcs-route-map.component';
import { PsDcsMapComponent } from './ps-dcs-map/ps-dcs-map.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
      LocateDcsComponent, DcsRouteMapComponent, PsDcsMapComponent],
  imports: [
    CommonModule,
    SharedModule,
    MapsRoutingModule
  ],
  providers:[]
})

export class MapsModule { }

