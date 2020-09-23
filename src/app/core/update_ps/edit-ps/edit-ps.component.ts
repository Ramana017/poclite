import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-edit-ps',
  templateUrl: './edit-ps.component.html',
  styleUrls: ['./edit-ps.component.sass']
})
export class EditPsComponent implements OnInit {
  public activeArray=[false,false,false,false,false]
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  activeclass(){
    let currenturl= this._router.routerState.snapshot.url
    if(currenturl=='/edit-ps/child-ps'){
      this.activeArray=[true,false,false,false,false]
    
    }else if(currenturl=='/edit-ps/child-guarantor'){
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
