import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-ps',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponentPS implements OnInit {

  public headerName:string;

  constructor(private _router:Router) {
    if(this._router.url=="/list"){
      this.headerName='List of Person Served'
    }else{
      this.headerName='PS Registration';
    }
   }

  ngOnInit() {
  }

}
