import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsModuleRoutingModule } from './ps-module-routing.module';
import { PsModuleComponent } from './ps-module.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';
// import {InputTextModule} from 'primeng/inputtext';
// import { FormsModule } from '@angular/forms';
// import { AutoCompleteModule } from "primeng/autocomplete";
import { PsHomeComponent } from './ps-home/ps-home.component';
// import {RadioButtonModule} from 'primeng/radiobutton';
@NgModule({
  declarations: [PsModuleComponent, SideBarComponent, PsHomeComponent],
  imports: [
    CommonModule,
    PsModuleRoutingModule,
    SharedModule,
  ]
})
export class PsModuleModule { }
