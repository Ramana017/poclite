import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
selector: 'app-registration',
templateUrl: './registration.component.html',
styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public activeArray=[false,false,false,false,false]

  constructor(private _router:Router){

  }

ngOnInit() {

}
activeclass(){
let currenturl= this._router.routerState.snapshot.url
if(currenturl=='/registration-re/child-basic'){
  this.activeArray=[true,false,false,false,false]

}else if(currenturl=='/registration-re/child-guarantor'){
this.activeArray=[false,true,false,false,false]
}
else if(currenturl=='/registration-re/child-admission'){
this.activeArray=[false,false,true,false,false]
}
else if(currenturl=='/registration-re/child-payorplan'){
 this.activeArray=[false,false,false,true,false]
}
else if(currenturl=='/registration-re/child-authorization'){
this.activeArray=[false,false,false,false,true];
}


}
}
