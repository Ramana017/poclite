import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AmsAlertsServiceService } from 'src/app/services/ams-alerts-service.service';
declare var $: any;
@Component({
  selector: 'app-communication-dashboard',
  templateUrl: './communication-dashboard.component.html',
  styleUrls: ['./communication-dashboard.component.sass']
})
export class CommunicationDashboardComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  customers: any = [];
  constructor(public ngxspineer: NgxSpinnerService, public amsService: AmsAlertsServiceService) { }
  public screenWidth: any;
  public screenHeight: any;
  public abcd: boolean = false;
  public date = [new Date(), (new Date())];
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

    this.authenticateUserForDevices();
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
  public appApprovalsFilter(template) {

    template.hide()

  }


  public amsAlertList = [{
    "toMail": " ",
    "alertSendDate": "11:35 pm",
    "subject": "LAEVV Job Errors",
    "errorCode": 0,
    "alertDefId": 14,
    "groupBy": "05\/04\/2021",
    "message": "LAEVV PA CSV File Import Job for 71434# failed on 05\/04\/2021 11:30 PM - <!DO CTYPE HTML PUBLIC \"-\/\/W3C\/\/DTD HTML 4.0 Draft\/\/EN\"><br\/><HT ML><br\/><HEAD><br\/><TITLE>Error 400--Bad Request<\/TITLE><br\/><\/HEAD><br\/><BODY bgcolor=\"white\"><br\/><FONT FACE=Helvetica><BR CLEAR=all><br\/><TABLE border=0 cellspacing=5><TR><TD><BR CLEAR=all><br\/><FONT FACE=\"Helvetica\" COLOR=\"black\" SIZE=\"3\"><H2>Error 400--Bad Request<\/H2><br\/><\/FONT><\/TD><\/TR><br\/><\/TABLE><br\/><TABLE border=0 width=100% cellpadding=10><TR><TD VALIGN=top WIDTH=100% BGCOLOR=white><FONT FACE=\"Courier New\"><FONT FACE=\"Helvetica\" SIZE=\"3\"><H3>From RFC 2068 <i>Hypertext Transfer Protocol -- HTTP\/1.1<\/i>:<\/H3><br\/><\/FONT><FONT FACE=\"Helvetica\" SIZE=\"3\"><H4>10.4.1 400 Bad Request<\/H4><br\/><\/FONT><P><FONT FACE=\"Courier New\">The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.<\/FONT><\/P><br\/><\/FONT><\/TD><\/TR><br\/><\/TABLE><br\/><br\/><\/BODY><br\/><\/HTML><br\/>",
    "userId": 52171,
    "buttonDetails": "[{\"confirmPrompt\":\"null,Are you sure you want to dismiss the Alert(s)?,Are you sure you want to dismiss the selected Alert(s) for all the Users?\",\"AmsActionIds\":\"0,1,2\",\"errorCode\":0,\"actions\":\"null,null,null\",\"captions\":\"Close,Dismiss,Action Taken\"}]",
    "aggregateAlertId": "0",
    "messageTypeId": 1,
    "id": 5.6332839e7,
    "alertId": 1.4798645e7,
    "applicationId": 2,
    "status": 1
  }, {
    "toMail": " ",
    "alertSendDate": "11:35 pm",
    "subject": "LAEVV Job Errors",
    "errorCode": 0,
    "alertDefId": 14,
    "groupBy": "05\/04\/2021",
    "message": "LAEVV PA CSV File Import Job for 71591# failed on 05\/04\/2021 11:30 PM - <!DO CTYPE HTML PUBLIC \"-\/\/W3C\/\/DTD HTML 4.0 Draft\/\/EN\"><br\/><HT ML><br\/><HEAD><br\/><TITLE>Error 400--Bad Request<\/TITLE><br\/><\/HEAD><br\/><BODY bgcolor=\"white\"><br\/><FONT FACE=Helvetica><BR CLEAR=all><br\/><TABLE border=0 cellspacing=5><TR><TD><BR CLEAR=all><br\/><FONT FACE=\"Helvetica\" COLOR=\"black\" SIZE=\"3\"><H2>Error 400--Bad Request<\/H2><br\/><\/FONT><\/TD><\/TR><br\/><\/TABLE><br\/><TABLE border=0 width=100% cellpadding=10><TR><TD VALIGN=top WIDTH=100% BGCOLOR=white><FONT FACE=\"Courier New\"><FONT FACE=\"Helvetica\" SIZE=\"3\"><H3>From RFC 2068 <i>Hypertext Transfer Protocol -- HTTP\/1.1<\/i>:<\/H3><br\/><\/FONT><FONT FACE=\"Helvetica\" SIZE=\"3\"><H4>10.4.1 400 Bad Request<\/H4><br\/><\/FONT><P><FONT FACE=\"Courier New\">The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.<\/FONT><\/P><br\/><\/FONT><\/TD><\/TR><br\/><\/TABLE><br\/><br\/><\/BODY><br\/><\/HTML><br\/>",
    "userId": 52171,
    "buttonDetails": "[{\"confirmPrompt\":\"null,Are you sure you want to dismiss the Alert(s)?,Are you sure you want to dismiss the selected Alert(s) for all the Users?\",\"AmsActionIds\":\"0,1,2\",\"errorCode\":0,\"actions\":\"null,null,null\",\"captions\":\"Close,Dismiss,Action Taken\"}]",
    "aggregateAlertId": "0",
    "messageTypeId": 1,
    "id": 5.6332837e7,
    "alertId": 1.4798644e7,
    "applicationId": 2,
    "status": 1
  }]


  public authenticateUserForDevices() {
    try {
      this.amsService.authenticateUserForDevices().subscribe(res => {
        console.log(res);
      })
    } catch (error) {

    }
  }
}
