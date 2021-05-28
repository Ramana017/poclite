import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsModuleComponent } from './ps-module.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  { path: '', component: PsModuleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsModuleRoutingModule { }
