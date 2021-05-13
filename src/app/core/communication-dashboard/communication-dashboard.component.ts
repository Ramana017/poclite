import { DatePipe } from '@angular/common';
import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AmsAlertsServiceService } from 'src/app/services/ams-alerts-service.service';
import { DashboardService } from 'src/app/services/dashboard.service';
declare var $: any;
@Component({
  selector: 'app-communication-dashboard',
  templateUrl: './communication-dashboard.component.html',
  styleUrls: ['./communication-dashboard.component.sass']
})
export class CommunicationDashboardComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  customers: any = [];
  constructor(public datepipe: DatePipe,public dashboardService:DashboardService,
    public ngxspineer: NgxSpinnerService, public amsService: AmsAlertsServiceService) {


    this.screenHeight = window.innerHeight;
    var height = this.screenHeight / 2 - 130
    $('.table-responsive').css('height', height + 'px');
  }
  public screenWidth: any;
  public screenHeight: any;
  public minmaxResize: boolean = false;
  public intialStartDate = new Date();
  public todayDate = new Date();
  public date = [];
  public approvalTypeFilterList = [];
  public appAprovalStatusList=[];
  // public appapproval: boolean = false;
  public widgetArray: Array<boolean> = [false, false, false, false];
  position: string;
  displayPosition: boolean;
  createException: boolean;
  createAvailability: boolean;
  selectedState: any = null;
  states: any[] = [
    { name: 'Pending', code: 'Arizona' },
    { name: 'California', value: 'California' },
    { name: 'Florida', code: 'Florida' },
    { name: 'Ohio', code: 'Ohio' },
    { name: 'Washington', code: 'Washington' }
  ];
  ngOnInit(): void {
    this.intialStartDate.setDate(this.todayDate.getDate() - 7);
    this.amsDateFilter = [this.intialStartDate, this.todayDate];
    this.date = [this.intialStartDate, this.todayDate]

    this.resize();
    this.onResize();
    this.authenticateUserForDevices();
    // this.defaultstaticData();
    // this.getAlertsForDevices();

    this.approvalTypeFilterList = [{ name: 'Edited Punch', id: 1 },
    { name: 'Create Exception', id: 2 },
    { name: 'Create Availability', id: 3 }]
    this.appAprovalStatusList=[{ name: 'Accept', id: 1 },
    { name: 'Pending', id: 2 },
    { name: 'Reject', id: 3 }]

    this.getPocReleaseNotesList();

  }

  public appApprovalsFilter(template) {

    template.hide()

  }


  public amsAlertList = [];
  public amsAuthenicateResponse: any;
  public alertDefinitionList = [];
  public alertDefinationId = null;
  public applicationId = 0;
  public alertFlag = 1;
  public alertButtonDetails: any;
  public alertbuttons = [];
  public applicationList = [];
  public amsDateFilter = [];
  public amsSearchBy = '';

  public authenticateUserForDevices() {
    try {
      console.log("Authentic user")
      this.amsService.authenticateUserForDevices().subscribe(res => {
        console.log(res);
        this.amsAuthenicateResponse = res;
        this.getAlertsForDevices();
        this.getApplicationList();
        this.getAlertDefinitionList();
      })
    } catch (error) {

    }
  }

  public getAlertDefinitionList() {
    try {
      this.amsService.getAlertDefinitionList(this.applicationId, this.alertFlag, this.amsAuthenicateResponse?.sessionId)
        .subscribe(res => {
          console.log(res);
          if(res[0].errorCode!=412){
            this.alertDefinitionList = res;
          }
        })
    } catch (error) {

    }
  }


  public getAlertButtonDetails() {
    this.alertbuttons = this.alertButtonDetails[0].captions.split(',');
    try {
      this.amsService.getAlertButtonDetails(this.applicationId, this.alertFlag, this.amsAuthenicateResponse.userId, this.amsAuthenicateResponse?.sessionId).subscribe(res => {
        console.log(res);
        this.alertButtonDetails = res;
        console.log(this.alertButtonDetails[0].captions.split(','))
        this.alertbuttons = this.alertButtonDetails[0].captions.split(',');
      })
    } catch (error) {

    }
  }

  public getApplicationList() {
    try {
      this.amsService.getApplicationList(this.amsAuthenicateResponse.userId, this.amsAuthenicateResponse.userTypeId, this.amsAuthenicateResponse.sessionId).subscribe(res => {
        console.log(res)
        this.applicationList = res;
      })
    } catch (error) {

    }
  }

  public getAlertsForDevices() {

    try {
      this.ngxspineer.show('amsspinner');
      this.amsService.getAlertsForDevices(this.amsAuthenicateResponse.userId, this.datepipe.transform(this.amsDateFilter[0], 'MM/dd/yyyy'), this.datepipe.transform(this.amsDateFilter[1], 'MM/dd/yyyy'), this.amsSearchBy, 1, this.applicationId, this.alertDefinationId, this.amsAuthenicateResponse.sessionId).subscribe(res => {
        console.log(res);
        this.amsAlertList = res;
        this.ngxspineer.hide('amsspinner');

      }, err => {
        this.ngxspineer.hide('amsspinner');

      })

    } catch (error) {

    }
  }

  public onAmsSearch(template) {
    console.log(this.amsDateFilter);
    template.hide();
    this.getAlertsForDevices()
  }

  onResize() {
    // console.log(event)
    // this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    console.log(this.screenWidth, this.screenHeight);
    if (this.minmaxResize === false) {
      var height = this.screenHeight / 2 - 115;
      $('.table-responsive').css('height', height + 'px');
      // console.log(this.minmaxResize)
    }
    else if (this.minmaxResize === true) {
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
          .hasClass('col-lg-6')
      ) {
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('col-lg-12');
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .removeClass('col-lg-6');
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
          .hasClass('col-lg-12')
      ) {
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('col-lg-6');
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .removeClass('col-lg-12');
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
      this.minmaxResize = true;
      this.onResize();
      // this.screenHeight = window.innerHeight;
      // console.log(this.screenWidth,this.screenHeight);
      // var height = this.screenHeight-200;

      // $('.table-responsive').css('height',height + 'px');
    }
    if (flag === false) {
      this.minmaxResize = false;
      this.onResize();
      //     var height = this.screenHeight/2-130

      // $('.table-responsive').css('height',height + 'px');
    }

  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  showcreateExceptionDialog(position: string) {
    this.position = position;
    this.createException = true;
  }
  showcreateAvailabilityDialog(position: string) {
    this.position = position;
    this.createAvailability = true;
  }
  defaultstaticData() {
    this.amsAlertList = [{
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
    }];

    this.alertDefinitionList = [{
      "name": "Certification Expired",
      "errorCode": 0,
      "id": 1
    }, {
      "name": "Missed Arrival",
      "errorCode": 0,
      "id": 2
    }, {
      "name": "Missed Departure",
      "errorCode": 0,
      "id": 3
    }, {
      "name": "DCS Denied Visits",
      "errorCode": 0,
      "id": 4
    }, {
      "name": "DCS Exceptions",
      "errorCode": 0,
      "id": 5
    }, {
      "name": "Sandata Job Errors",
      "errorCode": 0,
      "id": 6
    }, {
      "name": "LA EVV Job Errors",
      "errorCode": 0,
      "id": 8
    }, {
      "name": "Broadcast Message",
      "errorCode": 0,
      "id": 10
    }, {
      "name": "CareBridge Job Errors",
      "errorCode": 0,
      "id": 12
    }, {
      "name": "HHA NJ Job Errors",
      "errorCode": 0,
      "id": 13
    }, {
      "name": "Sandata AZ Job Errors",
      "errorCode": 0,
      "id": 16
    }, {
      "name": "Sandata NC Job Errors",
      "errorCode": 0,
      "id": 17
    }, {
      "name": "Sandata IN Job Errors",
      "errorCode": 0,
      "id": 18
    }, {
      "name": "POC Job Errors",
      "errorCode": 0,
      "id": 19
    }]

    this.alertButtonDetails = [{
      "confirmPrompt": "null,Are you sure you want to dismiss the Alert(s)?,Are you sure you want to dismiss the selected Alert(s) for all the Users?",
      "AmsActionIds": "0,1,2",
      "errorCode": 0,
      "actions": "null,null,null",
      "captions": "Close,Dismiss,Action Taken"
    }];
    console.log(this.alertButtonDetails[0].captions.split(','))
    this.alertbuttons = this.alertButtonDetails[0].captions.split(',');

    this.applicationList = [{
      "name": "Rescare - POC",
      "errorCode": 0,
      "id": 2
    }]
    this.customers = [
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'company', header: 'Company' },
      { field: 'status', header: 'Status' },
      { field: 'activity', header: 'Activity' }
    ];
  }






public pocReleaseNotesList=[];
public getPocReleaseNotesList(template?){
  try {

    let jsonObj={"startDate":"05/01/2020","endDate":"05/12/2021","lowerBound":1,"upperBound":10};
     this.dashboardService.getPocReleaseNotesList(JSON.stringify(jsonObj)).subscribe(res=>{
       this.pocReleaseNotesList=res.releaseNotesList;
     })


  } catch (error) {

  }
}


displayBasic: boolean;

showBasicDialog() {
  this.displayBasic = true;
}

}
