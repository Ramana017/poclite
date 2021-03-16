import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsEditRoutingModule } from './ps-edit-routing.module';
import { PsEditComponent } from './ps-edit.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [PsEditComponent],
  imports: [
    CommonModule,
    PsEditRoutingModule,
    TabsModule.forRoot()
  ]
})
export class PsEditModule { }
