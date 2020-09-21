import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { AppService } from 'src/app/services/app.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public userName;
  public useraccount: any;
  public heading: string;
  public  userFlag:boolean;
  public adminFlag:boolean;

  modalRef: BsModalRef;

  public activeclass: Array<boolean> = []

  constructor(private router: Router, private appService: AppService, public apiService: ApiserviceService) { }

  ngOnInit(): void {
    var data = sessionStorage.getItem("useraccount");
    this.useraccount = JSON.parse(data);
    if (this.useraccount == undefined || null) {
      console.log("headerts called")
      this.router.navigateByUrl('login')
      window.location.reload();
    } else {
      console.log(this.router.url)
      if (this.router.url == '/charts') {
        this.heading = "POC DashBoard"
      } else if (this.router.url == '/summary') {
        this.heading = "POC Call Management"
      } else if (this.router.url == '/widgets') {
        this.heading = "POC Home"
      }
      else {
        this.heading = "PS Registration"
      }
      if (this.useraccount != undefined || null) {
        this.userName = this.useraccount.userName;
        (this.useraccount.priviledFlag=="ceat")?this.userFlag=true:this.userFlag=false;
        this.useraccount.priviledFlag=="all"?this.adminFlag=true:this.adminFlag=false;
      }
    }
  }
  public logout() {
    sessionStorage.removeItem('useraccount');
    setTimeout(() => {
      this.router.navigateByUrl('login');
      this.appService.setUserLoggedIn(false);
      sessionStorage.clear();
    }, 100);

  }

}
