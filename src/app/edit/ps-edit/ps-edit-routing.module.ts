import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsEditComponent } from './ps-edit.component';

const routes: Routes = [{ path: '', component: PsEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsEditRoutingModule { }
