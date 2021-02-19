
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { AppService } from 'src/app/services/app.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ZipcodeService } from 'src/app/services/zipcode.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';
declare var $: any;

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

      $('.navbar .dropdown-item').on('click', function (e) {
          var $el = $(this).children('.dropdown-toggle');
          var $parent = $el.offsetParent(".dropdown-menu");
          $(this).parent("li").toggleClass('open');

          if (!$parent.parent().hasClass('navbar-nav')) {
              if ($parent.hasClass('show')) {
                  $parent.removeClass('show');
                  $el.next().removeClass('show');
                  $el.next().css({"top": -999, "left": -999});
              } else {
                  $parent.parent().find('.show').removeClass('show');
                  $parent.addClass('show');
                  $el.next().addClass('show');
                  $el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 4});
              }
              e.preventDefault();
              e.stopPropagation();
          }
      });

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
