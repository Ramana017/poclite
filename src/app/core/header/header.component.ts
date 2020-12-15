
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { AppService } from 'src/app/services/app.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ZipcodeService } from 'src/app/services/zipcode.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public userName;
  public useraccount: any;
  public heading: string;
  public adminFlag: boolean;
  public showNotifOn = [];
  public batchLength = 0;

  modalRef: BsModalRef;
  IsShowHide: boolean = false;

  public activeclass: Array<boolean> = []

  constructor(private router: Router, public service: ZipcodeService, private appService: AppService, public userDetailService: UserdetailsService, public apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.useraccount = JSON.parse(sessionStorage.getItem("useraccount"));
    if (this.useraccount != undefined || null) {
      this.userName = this.useraccount.userName;
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



  onClick(event) {

    this.IsShowHide = !this.IsShowHide;

  }


}
