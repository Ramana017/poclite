import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsEditRoutingModule } from './ps-edit-routing.module';
import { PsEditComponent } from './ps-edit.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [PsEditComponent],
  imports: [
    CommonModule,
    PsEditRoutingModule,
    TabsModule.forRoot(),
    FileUploadModule,HttpClientModule,
    ModalModule
  ]
})
export class PsEditModule { }
