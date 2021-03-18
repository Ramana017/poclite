import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsEditRoutingModule } from './ps-edit-routing.module';
import { PsEditComponent } from './ps-edit.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [PsEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    PsEditRoutingModule,
    TabsModule.forRoot(),
    FileUploadModule,HttpClientModule,
    ModalModule
  ]
})
export class PsEditModule { }
