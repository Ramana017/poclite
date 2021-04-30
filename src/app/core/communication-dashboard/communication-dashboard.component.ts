import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-communication-dashboard',
  templateUrl: './communication-dashboard.component.html',
  styleUrls: ['./communication-dashboard.component.sass']
})
export class CommunicationDashboardComponent implements OnInit {
  customers: any = [];
  constructor(public ngxspineer:NgxSpinnerService) { }
  public screenWidth: any;
  public screenHeight: any;
  public abcd: boolean = false;
  public date=[new Date(),(new Date())];
  // public appapproval: boolean = false;
  public widgetArray: Array<boolean> = [false, false, false, false];
  position: string;
  displayPosition: boolean;
  selectedState: any = null;
  states: any[] = [
    { name: 'Pending', code: 'Arizona' },
    { name: 'California', value: 'California' },
    { name: 'Florida', code: 'Florida' },
    { name: 'Ohio', code: 'Ohio' },
    { name: 'Washington', code: 'Washington' }
  ];
  ngOnInit(): void {
    this.resize();
    // this.widgetReSize()
    this.customers = [
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'company', header: 'Company' },
      { field: 'status', header: 'Status' },
      { field: 'activity', header: 'Activity' }
    ];
    // this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    var height = this.screenHeight / 2 - 130
    $('.table-responsive').css('height', height + 'px');
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event)
    // this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    console.log(this.screenWidth, this.screenHeight);
    if (this.abcd === false) {
      var height = this.screenHeight / 2 - 130
      $('.table-responsive').css('height', height + 'px');
      console.log(this.abcd)
    }
    else if (this.abcd === true) {
      this.screenHeight = window.innerHeight;
      console.log(this.screenWidth, this.screenHeight);
      var height = this.screenHeight - 200;
      $('.table-responsive').css('height', height + 'px');
    }
  }
  // for UI maximize and minimize
  public resize() {
    $('.max-1,.max-2,.max-3,.max-4').click(function () {
      $(this).parent().parent().parent().parent().parent().siblings().hide();
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
          .hasClass('col-md-6')
      ) {
        $(this)
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
          .removeClass('col-md-6');
      }
    });

    $('.min-1,.min-2,.min-3,.min-4').click(function () {
      $(this).parent().parent().parent().parent().parent().siblings().show();
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
          .hasClass('col-md-12')
      ) {
        $(this)
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
          .removeClass('col-md-12');
      }
    });
  }

  // minimize and maximize screens
  public widgetReSize(flag, widgetName, event?) {
    if (widgetName == 'ps') {
      flag
        ? (this.widgetArray = [true, false, false, false])
        : (this.widgetArray = [false, false, false, false]);
    }
    if (widgetName == 'admissions') {
      flag
        ? (this.widgetArray = [false, true, false, false])
        : (this.widgetArray = [false, false, false, false]);
    }
    if (widgetName == 'authorization') {
      flag
        ? (this.widgetArray = [false, false, true, false])
        : (this.widgetArray = [false, false, false, false]);
    }
    if (widgetName == 'dcs') {
      flag
        ? (this.widgetArray = [false, false, false, true])
        : (this.widgetArray = [false, false, false, false]);
    }
    if (flag === true) {
      this.abcd = true;
      this.onResize(event);
      // this.screenHeight = window.innerHeight;
      // console.log(this.screenWidth,this.screenHeight);
      // var height = this.screenHeight-200;

      // $('.table-responsive').css('height',height + 'px');
    }
    if (flag === false) {
      this.abcd = false;
      this.onResize(event);
      //     var height = this.screenHeight/2-130

      // $('.table-responsive').css('height',height + 'px');
    }

  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }


  public appApprovalsFilter(template){

    template.hide()

  }
}
