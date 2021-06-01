import { Component, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import { PsServiceService } from './ps-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public psHomeDynamicClass: boolean = false;
  constructor(private psService: PsServiceService) {
    this.psService.geturl()

    let useraccount = sessionStorage.getItem('useraccount');
    let mapkey = sessionStorage.getItem('mapsApiKey');
    let logindata = sessionStorage.getItem(btoa('logindetils'));

    sessionStorage.clear();
    sessionStorage.setItem('useraccount', useraccount);
    sessionStorage.setItem('mapsApiKey', mapkey);
    sessionStorage.setItem(btoa('logindetils'), logindata);
  }



  ngOnInit() {
    this.resize();
  }
  public resize() {
    $('.max-1,.max-2,.max-3,.max-4').click(function () {
      $(this).parent().parent().parent().parent().parent().parent().parent().siblings().hide();
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .siblings()
        .hide();
      $(this).parent().parent().parent().parent().css({ height: '87vh' });
      $('.widget-block').find('.table-responsive').addClass('table-resize');
      $('.cms-widget,.scrolling-alerts').hide();

      if (
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .hasClass('col-md-6')
      ) {
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('col-md-12');
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .removeClass('col-md-6');
      }
    });

    $('.min-1,.min-2,.min-3,.min-4').click(function () {
      $(this).parent().parent().parent().parent().parent().parent().parent().siblings().show();
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .siblings()
        .show();
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .css({ height: '', width: '' });
      $('.widget-block').find('.table-responsive').removeClass('table-resize');
      $('.cms-widget,.scrolling-alerts').show();

      if (
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .hasClass('col-md-12')
      ) {
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('col-md-6');
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .removeClass('col-md-12');
      }
    });
  }


  ngOnDestroy() {
    console.log("NgOndestroy in widgets managment");
    this.psService.psAdmissionId = null;
    this.psService.psAuthorizationid = null;
  }
  addDynamicClass(value?) {
    console.log("++++++++",value);
    this.psHomeDynamicClass=value;
  }
}
