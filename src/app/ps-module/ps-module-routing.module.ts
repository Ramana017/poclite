import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PsHomeComponent } from './ps-home/ps-home.component';

import { PsModuleComponent } from './ps-module.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  { path: '', component: PsModuleComponent ,
  children: [
    {path:'ps-home', component:PsHomeComponent}
  ]
},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsModuleRoutingModule { }
