import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public userName;
  public useraccount: any;
  public heading: string;

  modalRef: BsModalRef;

  public activeclass: Array<boolean> = []

  constructor(private router: Router,private appService:AppService) { }

  ngOnInit(): void {

    var data = sessionStorage.getItem("useraccount");
    this.useraccount = JSON.parse(data);
    if (this.useraccount == undefined || null) {
      this.router.navigateByUrl('login')

    } else {
      console.log(this.router.url)
      if (this.router.url == '/charts') {
        this.activeclass = [false, true,false]
        this.heading = "POC DashBoard"
      } else if(this.router.url == '/summary') {
        this.activeclass = [true, false,false];
        this.heading = "POC Call Management"
      }else if(this.router.url == '/widgets'){
        this.activeclass=[false,false,true];
        this.heading = "POC Home"
      }
      else{
        this.heading="PS Registration"
      }
      var data = sessionStorage.getItem("useraccount");
      this.useraccount = JSON.parse(data);
      if (this.useraccount != undefined || null) {
        this.userName = this.useraccount.userName;
      }
    }
    // console.log("*********",this.userName);
  }
  public logout() {
    sessionStorage.removeItem('useraccount');

    setTimeout(() => {
      // console.log("Hello from setTimeout");
      this.router.navigateByUrl('login');
    this.appService.setUserLoggedIn(false);

    }, 100);

  }

}
