import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DcsRouteMapComponent } from './dcs-route-map/dcs-route-map.component';
import { LocateDcsComponent } from './locate-dcs/locate-dcs.component';

import { MapsComponent } from './maps.component';
import { PsDcsMapComponent } from './ps-dcs-map/ps-dcs-map.component';

const routes: Routes = [{ path: '', component: MapsComponent },{path: 'ps-dcs', component:PsDcsMapComponent},{path: 'locate-dcs',component:LocateDcsComponent},{path:'dcs-map',component:DcsRouteMapComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { 
  static components = []
}
