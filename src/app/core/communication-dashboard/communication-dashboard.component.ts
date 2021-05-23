import { DatePipe } from '@angular/common';
import { Component, OnInit, HostListener, TemplateRef, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { alertForDevices, AmsAlertsServiceService, amsLogin } from 'src/app/services/ams-alerts-service.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-communication-dashboard',
  templateUrl: './communication-dashboard.component.html',
  styleUrls: ['./communication-dashboard.component.sass']
})
export class CommunicationDashboardComponent implements OnInit, AfterViewInit {

  // @HostListener('window:resize', ['event'])
  customers: any = [];
  public userDetails: any;
  constructor(public datepipe: DatePipe, private sanitizer: DomSanitizer, public dashboardService: DashboardService,
    public ngxspineer: NgxSpinnerService, public amsService: AmsAlertsServiceService, private modalService: BsModalService) {

    this.userDetails = JSON.parse(sessionStorage.getItem('useraccount'))

    this.screenHeight = window.innerHeight;
    var height = this.screenHeight / 2 - 130
    $('.table-responsive').css('height', height + 'px');
  }
  public screenWidth: any;
  public screenHeight: any;
  public minmaxResize: boolean = false;
  public intialStartDate = new Date();
  public todayDate = new Date();

  public widgetArray: Array<boolean> = [false, false, false, false];
  public modalRef: BsModalRef;
  public dcsmodelRef: BsModalRef;
  public dcsExceptionModelRef: BsModalRef;
  position: string;
  displayPosition: boolean;
  createException: boolean;
  createAvailability: boolean;

  ngOnInit(): void {
    this.appaprovalInint();
    this.authenticateUserForDevices();

  }
  ngAfterViewInit() {
    this.intialStartDate.setDate(this.todayDate.getDate() - 7);
    this.amsDateFilter = [this.intialStartDate, this.todayDate];
    this.pointofCareIntialStartDate.setDate(this.todayDate.getDate() - 30)
    this.pointofCareStartDate = this.pointofCareIntialStartDate;
    this.pocStartDate = this.datepipe.transform(this.pointofCareStartDate, 'MM/dd/yyyy');
    this.pocEndDate = this.datepipe.transform(this.pointofCareEndDate, 'MM/dd/yyyy');

    this.resize();
    this.onResize();
    this.getPocReleaseNotesList();
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'approval-modal' }));
  }
  scheduleModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'schedule-modal' }));
  }
  public amsAlertList: Array<alertForDevices> = [];
  public amsAuthenicateResponse: amsLogin;
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
        this.amsAuthenicateResponse = res[0];
        this.getAlertsForDevices();
        this.getApplicationList();
        this.getAlertDefinitionList();
      }, err => {
        Swal.fire('', 'Failed to Authenticate AMS', 'error')
      })
    } catch (error) {

    }
  }

  public getAlertDefinitionList() {
    try {
      this.amsService.getAlertDefinitionList(this.applicationId, this.alertFlag, this.amsAuthenicateResponse?.sessionId)
        .subscribe(res => {
          console.log(res);
          if (res[0].errorCode != 412) {
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
  public onAmsReset(template) {
    this.amsDateFilter = [this.intialStartDate, this.todayDate];
    this.applicationId = 0;
    this.alertDefinationId = 0;
    this.amsSearchBy = '';
    template.hide();
    this.getAlertsForDevices()
  }


  public onAmsSearch(template) {

    if (this.amsDateFilter[0] <= this.amsDateFilter[1]) {
      console.log(this.amsDateFilter);
      template.hide();
      this.getAlertsForDevices();
    } else {
      Swal.fire('Invalid Dates', 'Start date cannot be greater than End date', 'warning')

    }
  }

  onResize() {
    this.screenHeight = window.innerHeight;
    console.log(this.screenWidth, this.screenHeight);
    if (this.minmaxResize === false) {
      var height = this.screenHeight / 2 - 127;
      $('.table-responsive').css('height', height + 'px');
      $('.alert-responsive').css('height', height + 30 + 'px');
    }
    else if (this.minmaxResize === true) {
      this.screenHeight = window.innerHeight;
      console.log(this.screenWidth, this.screenHeight);
      var height = this.screenHeight - 200;
      $('.table-responsive').css('height', height + 'px');
      $('.alert-responsive').css('height', height + 30 + 'px');
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
    }
    if (flag === false) {
      this.minmaxResize = false;
      this.onResize();
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


  /* ---------------------- App approval Started------------------------*/

  public approvalTypeList = [];
  public appAprovalStatusList = [];
  public appApprovalDCSList = [];
  public appApprovalList = [];
  public appApprovalSpinner = 0;
  public appApprovalStartDate: Date = new Date();
  public appApprovalEndDate: Date = new Date();
  public appApprovalIntialDate: Date = new Date();
  private appliedApprovalStartDate = '';
  private appliedApprovalEndDate = '';
  public dcsFilterId = null;
  public approvalTypeId = null;
  public statusId = null;
  public appEditPunchList: any;
  private appliedApprovalTypeId = 0;
  private appliedDcsId = 0;
  private appliedStatusId = 0;
  public currentApprovedComments = '';
  public currentAppApprovalId = 0;
  public currentStatus = null;
  public approvalLowerBound=1;
  public approvalUpperBound=10;
  public approvalperPage=10;
  public approvalTotalCount=0;
  public appAvailabilityList: any;
  public appExceptionList: any;
  public appAvailabilityEffectedVisitsResponse: any;
  public appExceptionEffectedVisitsResponse: any;


  public appaprovalInint(flag?: boolean, template?) {
    this.appApprovalIntialDate.setDate(this.todayDate.getDate() - 30)
    this.appApprovalStartDate = this.appApprovalIntialDate;
    this.appApprovalEndDate = this.todayDate;
    this.appliedApprovalStartDate = this.datepipe.transform(this.appApprovalStartDate, 'MM/dd/yyyy');
    this.appliedApprovalEndDate = this.datepipe.transform(this.appApprovalEndDate, 'MM/dd/yyyy');


    if (flag) { this.getAppApprovals(); template.hide() } else {
      this.getDCSList()
      this.getAppApprovals();
      this.getLookupsData();
    }

  }

  public getAppApprovals() {
    this.appApprovalSpinner++;
    this.ngxspineer.show('spinner1');
    let obj = { dcsId: this.appliedDcsId, appApprovalTypeId: this.appliedApprovalTypeId, approvalStatusId: this.appliedStatusId, startDate: this.appliedApprovalStartDate, endDate: this.appliedApprovalEndDate, userId: this.userDetails.userId, lowerBound: this.approvalLowerBound, upperBound: this.approvalUpperBound }
    try {
      this.dashboardService.getAppApprovals(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.appApprovalList = res.appApprovalList;
           this.approvalTotalCount=res?.totalCount;
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }

      }, err => {
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      })
    } catch (error) {

    }
  }

  public getDCSList() {
    try {
      this.appApprovalSpinner++;
      this.ngxspineer.show('spinner1');
      let obj = { userId: this.userDetails.userId }
      this.dashboardService.getDcsList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        let data: any = res;
        this.appApprovalDCSList = data.dcsList;
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      }, err => {
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      })
    } catch (error) {

    }
  }
  public getLookupsData() {
    try {
      this.appApprovalSpinner++;
      this.ngxspineer.show('spinner1');
      let obj = { userId: this.userDetails.userId }
      this.dashboardService.getLookupsData().subscribe(res => {
        console.log(res);
        this.approvalTypeList = res.app_approval_type;
        this.appAprovalStatusList = res.approval_status;


        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      }, err => {
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      })
    } catch (error) {

    }
  }
  public onAppApprovalSearch(template) {
    if (this.appApprovalStartDate > this.appApprovalEndDate) {
      Swal.fire('Invalid Dates', 'Start date cannot be greater than End date', 'warning')

    } else {
      this.appliedApprovalStartDate = this.datepipe.transform(this.appApprovalStartDate, 'MM/dd/yyyy');
      this.appliedApprovalEndDate = this.datepipe.transform(this.appApprovalEndDate, 'MM/dd/yyyy');
      this.appliedApprovalTypeId = this.approvalTypeId != null ? this.approvalTypeId : 0;
      this.appliedDcsId = this.dcsFilterId != null ? this.dcsFilterId : 0;
      this.appliedStatusId = this.statusId != null ? this.statusId : 0;
      template.hide();
      this.getAppApprovals();
    }
  }

  public getAppEditPunchList(data, template: TemplateRef<any>) {
    this.currentAppApprovalId = data.appApprovalId;
    this.currentStatus = null;
    try {
      this.appApprovalSpinner++;
      this.ngxspineer.show('spinner1');
      let obj = { "appApprovalId": data.appApprovalId }
      this.dashboardService.getAppEditPunchList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
        this.appEditPunchList = res;
        this.currentStatus = this.appEditPunchList.status;
        this.currentApprovedComments = this.appEditPunchList.approvedComments ? this.appEditPunchList.approvedComments : '';
        this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'approval-modal' }));

      }, err => {
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      })

    } catch (error) {

    }
  }
  public approvingEditPunch() {
    console.log(this.currentStatus, this.currentApprovedComments.length)

    if (this.currentStatus == null || (this.currentApprovedComments.length > 4000 || this.currentApprovedComments.length == 0)) {
      if (this.currentStatus == null && this.currentApprovedComments.length == 0) {
        Swal.fire('Invalid ', `Status and Comments are mandatory feilds`, 'warning');
      } else
        if (this.currentStatus == null && this.currentApprovedComments.length > 0) {
          Swal.fire('Invalid ', `Status is mandatory feild`, 'warning');
        } else if (this.currentStatus != null && this.currentApprovedComments.length == 0) {
          Swal.fire('Invalid ', `Comments is mandatory feild`, 'warning');
        } else if (this.currentApprovedComments.length > 4000) {
          Swal.fire('Invalid ', `Comments Cannot be More than 4000 Characters`, 'warning');
        }
    }
    else {

      try {
        this.appApprovalSpinner++;
        this.ngxspineer.show('spinner1');
        console.log(this.currentStatus)
        let obj = { "appApprovalId": this.currentAppApprovalId, "userId": this.userDetails.userId, "approvedComments": this.currentApprovedComments, "status": this.currentStatus }
        this.dashboardService.approvingEditPunch(JSON.stringify(obj)).subscribe(res => {
          console.log(res);
          console.log(Object.keys(res).length)
          if (Object.keys(res).length > 0) {
            Swal.fire('', res.errorMsg, 'error')
          } else {
            this.modalRef.hide();
            Swal.fire('', 'Sucessfully saved', 'success')
            this.getAppApprovals();
          }
          this.appApprovalSpinner--;
          if (this.appApprovalSpinner == 0) {
            this.ngxspineer.hide('spinner1');
          }
        }, err => {
          this.appApprovalSpinner--;
          if (this.appApprovalSpinner == 0) {
            this.ngxspineer.hide('spinner1');
          }
        })

      } catch (error) {

      }
    }
  }
  public getAppAvailabilityList(data, template: TemplateRef<any>) {
    this.currentApprovedComments = '';
    this.currentAppApprovalId = data.appApprovalId;
    this.currentStatus = null;
    try {
      this.appApprovalSpinner++;
      this.ngxspineer.show('spinner1');
      let obj = { "appApprovalId": data.appApprovalId }
      this.dashboardService.getAppAvailabilityList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
        this.appAvailabilityList = res
        this.currentStatus = this.appAvailabilityList.status;
        this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'approval-modal' }));

      }, err => {
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      })

    } catch (error) {

    }
  }

  public validateAPPAvailability(item, template: TemplateRef<any>) {
    if (this.currentStatus == null || (this.currentApprovedComments.length > 4000 || this.currentApprovedComments.length == 0)) {
      if (this.currentStatus == null && this.currentApprovedComments.length == 0) {
        Swal.fire('Invalid ', `Status and Comments are mandatory feilds`, 'warning');
      } else
        if (this.currentStatus == null && this.currentApprovedComments.length > 0) {
          Swal.fire('Invalid ', `Status is mandatory feild`, 'warning');
        } else if (this.currentStatus != null && this.currentApprovedComments.length == 0) {
          Swal.fire('Invalid ', `Comments is mandatory feild`, 'warning');
        } else if (this.currentApprovedComments.length > 4000) {
          Swal.fire('Invalid ', `Comments Cannot be More than 4000 Characters`, 'warning');
        }
    }
    else if (this.appAvailabilityList.terminationDate) {
      let terminationDate = Date.parse(this.appAvailabilityList.terminationDate);
      let startDate = Date.parse(this.appAvailabilityList.startDate);
      let enddate = Date.parse(this.appAvailabilityList.enddate);

      if (enddate <= terminationDate && startDate <= terminationDate) {
        this.getAppAvailabilityEffectedVisits(item, template)
      } else {
        if (enddate > terminationDate && startDate > terminationDate) {
          Swal.fire('Invalid Dates', `Start and  End dates should be less than or equal to DCS Termination Date ${this.appAvailabilityList.terminationDate}`, 'warning');
        } else if (startDate > terminationDate) {
          Swal.fire('Invalid Dates', `Start date should be less than or equal to DCS Termination Date ${this.appAvailabilityList.terminationDate}`, 'warning');
        } else if (enddate > terminationDate) {
          Swal.fire('Invalid Dates', `End date should be less than or equal to DCS Termination Date ${this.appAvailabilityList.terminationDate}`, 'warning');
        }

      }
    }
    else {
      this.getAppAvailabilityEffectedVisits(item, template)

    }
  }
  private getAppAvailabilityEffectedVisits(item, template: TemplateRef<any>) {
    try {
      let obj = { dcsId: item.dcsId, startDate: item.startDate, endDate: item.endDate }
      this.appApprovalSpinner++;
      this.ngxspineer.show('spinner1');
      this.dashboardService.getAppAvailabilityEffectedVisits(JSON.stringify(obj)).subscribe(res => {
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
        console.log(res);

        this.appAvailabilityEffectedVisitsResponse = res;
        console.log()
        if (this.appAvailabilityEffectedVisitsResponse.effectedVisitsList.length > 0 && this.appAvailabilityEffectedVisitsResponse.availabilityId > 0 && (this.appAvailabilityEffectedVisitsResponse?.errorMsg.length>0)) {
          //direct
          this.dcsmodelRef = this.modalService.show(template, Object.assign({}, { class: 'approval-modal' }));

        }else if(this.appAvailabilityEffectedVisitsResponse?.errorMsg.length>0){
           Swal.fire('',this.appAvailabilityEffectedVisitsResponse.errorMsg,'error')
        } else {
          console.log("validation Failed");
          this.approveAppDCSAvailability();

        }
      }, err => {
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      })
    } catch (error) {
    }

  }
  public approveAppDCSAvailability(flag?: boolean) {

    if (this.currentStatus == null || (this.currentApprovedComments.length > 4000 || this.currentApprovedComments.length == 0)) {
      if (this.currentStatus == null && this.currentApprovedComments.length == 0) {
        Swal.fire('Invalid ', `Status and Comments are mandatory feilds`, 'warning');
      } else
        if (this.currentStatus == null && this.currentApprovedComments.length > 0) {
          Swal.fire('Invalid ', `Status is mandatory feild`, 'warning');
        } else if (this.currentStatus != null && this.currentApprovedComments.length == 0) {
          Swal.fire('Invalid ', `Comments is mandatory feild`, 'warning');
        } else if (this.currentApprovedComments.length > 4000) {
          Swal.fire('Invalid ', `Comments Cannot be More than 4000 Characters`, 'warning');
        }
    } else {

      let obj = {
        appApproveId: this.currentAppApprovalId,
        approvedComments: this.currentApprovedComments,
        dcsId: this.appAvailabilityList.dcsId,
        officeId: this.appAvailabilityList.officeId,
        startDate: this.appAvailabilityList.startDate,
        endDate: this.appAvailabilityList.endDate,
        days: this.appAvailabilityList.days,
        statusId: +(this.currentStatus),
        userId: this.userDetails.userId,
        availabilityId: flag ? 0 : this.appAvailabilityEffectedVisitsResponse.availabilityId,
        startTime1: this.appAvailabilityList.startTime1,
        endTime1: this.appAvailabilityList.endTime1,
        startTime2: this.appAvailabilityList?.startTime2?this.appAvailabilityList.startTime2:'',
        endTime2: this.appAvailabilityList?.endTime2?this.appAvailabilityList.endTime2:'',
        lastUpdated: flag ? 0 : this.appAvailabilityEffectedVisitsResponse.lastUpdated
      }
      try {
        this.appApprovalSpinner++;
        this.ngxspineer.show('spinner1');
        this.dashboardService.approveAppDCSAvailability(JSON.stringify(obj)).subscribe(res => {
          this.appApprovalSpinner--;
          if (this.appApprovalSpinner == 0) {
            this.ngxspineer.hide('spinner1');
          }
          this.modalRef.hide();
          Swal.fire('', 'Sucessfully saved', 'success')
          this.getAppApprovals();
        }, err => {
          this.appApprovalSpinner--;
          if (this.appApprovalSpinner == 0) {
            this.ngxspineer.hide('spinner1');
          }
        })
      } catch (error) {

      }
    }

  }
  public availbilityAlert(flag) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Continue Changing Availbility",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#76bd43',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed'
    }).then((result) => {
      if (result.isConfirmed) {
        if (flag == 'availbility') {
          this.approveAppDCSAvailability();
        } else {
          this.approveAppDCSException();
        }
      }
    })

  }

  public getAppExceptionList(data, template: TemplateRef<any>) {
    this.currentApprovedComments = '';
    this.currentAppApprovalId = data.appApprovalId;
    this.currentStatus = null;
    try {
      this.appApprovalSpinner++;
      this.ngxspineer.show('spinner1');
      let obj = { "appApprovalId": data.appApprovalId }
      this.dashboardService.getAppExceptionList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
        this.appExceptionList = res;
        this.currentStatus = this.appExceptionList.status;
        this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'approval-modal' }));

      }, err => {
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      })

    } catch (error) {

    }
  }

  public getAppExceptionEffectedVisits(item, template: TemplateRef<any>) {
    if (this.currentStatus == null || (this.currentApprovedComments.length > 4000 || this.currentApprovedComments.length == 0)) {
      if (this.currentStatus == null && this.currentApprovedComments.length == 0) {
        Swal.fire('Invalid ', `Status and Comments are mandatory feilds`, 'warning');
      } else
        if (this.currentStatus == null && this.currentApprovedComments.length > 0) {
          Swal.fire('Invalid ', `Status is mandatory feild`, 'warning');
        } else if (this.currentStatus != null && this.currentApprovedComments.length == 0) {
          Swal.fire('Invalid ', `Comments is mandatory feild`, 'warning');
        } else if (this.currentApprovedComments.length > 4000) {
          Swal.fire('Invalid ', `Comments Cannot be More than 4000 Characters`, 'warning');
        }
    }
    else {
      try {
        let obj = { dcsId: item.dcsId, startDate: item.startDate, endDate: item.endDate }
        this.appApprovalSpinner++;
        this.ngxspineer.show('spinner1');
        this.dashboardService.getAppExceptionEffectedVisits(JSON.stringify(obj)).subscribe(res => {
          this.appApprovalSpinner--;
          if (this.appApprovalSpinner == 0) {
            this.ngxspineer.hide('spinner1');
          }
          console.log(res);
          this.appExceptionEffectedVisitsResponse = res;
          if (this.appExceptionEffectedVisitsResponse.effectedVisitsList.length > 0) {
            this.dcsExceptionModelRef = this.modalService.show(template, Object.assign({}, { class: 'approval-modal' }));
          } else {
            this.approveAppDCSException()
          }

        }, err => {
          this.appApprovalSpinner--;
          if (this.appApprovalSpinner == 0) {
            this.ngxspineer.hide('spinner1');
          }
        })
      } catch (error) {

      }
    }
  }

  public approveAppDCSException() {
    if (this.currentStatus == null || (this.currentApprovedComments.length > 4000 || this.currentApprovedComments.length == 0)) {
      if (this.currentStatus == null && this.currentApprovedComments.length == 0) {
        Swal.fire('Invalid ', `Status and Comments are mandatory feilds`, 'warning');
      } else
        if (this.currentStatus == null && this.currentApprovedComments.length > 0) {
          Swal.fire('Invalid ', `Status is mandatory feild`, 'warning');
        } else if (this.currentStatus != null && this.currentApprovedComments.length == 0) {
          Swal.fire('Invalid ', `Comments is mandatory feild`, 'warning');
        } else if (this.currentApprovedComments.length > 4000) {
          Swal.fire('Invalid ', `Comments Cannot be More than 4000 Characters`, 'warning');
        }
    } else {


      let obj = {
        appApproveId: this.currentAppApprovalId,
        approvedComments: this.currentApprovedComments,
        dcsId: this.appExceptionList.dcsId,
        officeId: this.appExceptionList.officeId,
        statusId: +(this.currentStatus),
        userId: this.userDetails.userId,
        exceptionTypeId: this.appExceptionList.exceptionTypeId,
        exceptionComments: this.appExceptionList.exceptionComments,
        startDate: this.appExceptionList.startDate,
        endDate: this.appExceptionList.endDate,
        startTime1: this.appExceptionList.startTime1,
        endTime1: this.appExceptionList.endTime1,

      }
      try {
        this.appApprovalSpinner++;
        this.ngxspineer.show('spinner1');
        this.dashboardService.approveAppDCSException(JSON.stringify(obj)).subscribe(res => {
          this.appApprovalSpinner--;
          if (this.appApprovalSpinner == 0) {
            this.ngxspineer.hide('spinner1');
          }
          this.modalRef.hide();
          Swal.fire('', 'Sucessfully saved', 'success')
          this.getAppApprovals();
        }, err => {
          this.appApprovalSpinner--;
          if (this.appApprovalSpinner == 0) {
            this.ngxspineer.hide('spinner1');
          }
        })
      } catch (error) {
      }
    }
  }
  private dummymethod() {
    try {
      this.appApprovalSpinner++;
      this.ngxspineer.show('spinner1');
      this.dashboardService.getAppExceptionList(1).subscribe(res => {
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      }, err => {
        this.appApprovalSpinner--;
        if (this.appApprovalSpinner == 0) {
          this.ngxspineer.hide('spinner1');
        }
      })
    } catch (error) {

    }
  }

  public approvalPrevPage() {
    this.approvalLowerBound = this.approvalLowerBound - this.approvalperPage;
    this.approvalUpperBound = this.approvalUpperBound - this.approvalperPage;
    this.getAppApprovals()
  }
  public approvalNextPage() {
    this.approvalLowerBound = this.approvalLowerBound + this.approvalperPage;
    this.approvalUpperBound = this.approvalUpperBound + this.approvalperPage;
    this.getAppApprovals()

  }

  public approvalpageReset() {
    this.approvalLowerBound = 1;
    this.approvalUpperBound = this.approvalperPage;
    this.getAppApprovals()

  }




  /*------------------------------ Point of care Started-----------------------------------*/
  public pocReleaseNotesList = [];
  public pointofCareDates = [];
  public pointofCareStartDate: Date = new Date();
  public pointofCareEndDate: Date = new Date();
  public pointofCareIntialStartDate: Date = new Date();
  public pocTotalRecordsCount = 0;
  public pocReleaseNotesFile: any;
  public pocUpperBound = 10;
  public pocLowerBound = 1;
  public pocperPage = 10;
  private pocStartDate = '';
  private pocEndDate = '';
  public getPocReleaseNotesList() {
    try {
      this.ngxspineer.show('spinner3');
      let jsonObj = { "startDate": this.pocStartDate, "endDate": this.pocEndDate, "lowerBound": this.pocLowerBound, "upperBound": this.pocUpperBound };
      // let jsonObj = { "startDate": '01/01/2020', "endDate": '01/01/2021', "lowerBound": 1, "upperBound": 10 };
      this.dashboardService.getPocReleaseNotesList(JSON.stringify(jsonObj)).subscribe(res => {
        this.pocReleaseNotesList = res.releaseNotesList;
        this.pocTotalRecordsCount = res.totalCount;
        this.ngxspineer.hide('spinner3');
      }, err => {
        Swal.fire('404 Not Found', '', 'error')
        this.ngxspineer.hide('spinner3');

      })

    } catch (error) {

    }
  }
  public onPocSearch(template) {
    if (this.pointofCareStartDate <= this.pointofCareEndDate) {
      this.pocStartDate = this.datepipe.transform(this.pointofCareStartDate, 'MM/dd/yyyy');
      this.pocEndDate = this.datepipe.transform(this.pointofCareEndDate, 'MM/dd/yyyy');
      template.hide();
      this.getPocReleaseNotesList();
    }
    else {
      Swal.fire('Invalid Dates', 'Start date cannot be greater than End date', 'warning')
    }
  }

  public getPocReleaseNotesFile(id) {
    try {
      this.ngxspineer.show('spinner3');
      this.dashboardService.getPocReleaseNotesFile(id).subscribe(res => {
        this.pocReleaseNotesFile = (res.fileData);
        this.ngxspineer.hide('spinner3');
        const byteArray = new Uint8Array(atob(res.fileData).split('').map(char => char.charCodeAt(0)));
        var file = new Blob([byteArray], { type: 'application/pdf' });
        var fileURL = window.URL.createObjectURL(file);
        window.open(fileURL, 'name')
      })


    } catch (error) {

    }
  }
  public pocPrevPage() {
    this.pocLowerBound = this.pocLowerBound - this.pocperPage;
    this.pocUpperBound = this.pocUpperBound - this.pocperPage;
    this.getPocReleaseNotesList();
  }
  public PocNextPage() {
    this.pocLowerBound = this.pocLowerBound + this.pocperPage;
    this.pocUpperBound = this.pocUpperBound + this.pocperPage;
    this.getPocReleaseNotesList();
  }
  public pocFilterReset(template) {
    this.pointofCareStartDate = this.pointofCareIntialStartDate;
    this.pointofCareEndDate = new Date();
    this.pocpageReset();
    template.hide();
  }
  public pocpageReset() {
    this.pocLowerBound = 1;
    this.pocUpperBound = this.pocperPage;
    this.getPocReleaseNotesList();
  }
  /* ------------------- POC Release notes Ended-------------------------------------------- *****/

  displayBasic: boolean;






























  defaultstaticData() {
    this.amsAlertList = [
      {
        "alertSendDate": "03:10 am",
        "subject": "Certification Expired",
        "errorCode": 0,
        "alertDefId": 1,
        "groupBy": "05/19/2021",
        "message": "CHRISTY NORTON's TB Skin Test Certification will expire on 06/15/2021 [RCHC GA TOCCOA (30017)].",
        "userId": 52171,
        "buttonDetails": "[{\"confirmPrompt\":\"null,Are you sure you want to dismiss the Alert(s)?,Are you sure you want to dismiss the selected Alert(s) for all the Users?\",\"AmsActionIds\":\"0,1,2\",\"errorCode\":0,\"actions\":\"null,null,null\",\"captions\":\"Close,Dismiss,Action Taken\"}]",
        "aggregateAlertId": "0",
        "messageTypeId": 1,
        "id": 56449587,
        "alertId": 14943762,
        "applicationId": 2,
        "status": 1
      },
      {
        "alertSendDate": "03:10 am",
        "subject": "Certification Expired",
        "errorCode": 0,
        "alertDefId": 1,
        "groupBy": "05/19/2021",
        "message": "LUCIA ACOSTA BEIRO's Annual Evaluation Certification will expire on 06/17/2021 [RCHC GA TOCCOA (30017)].",
        "userId": 52171,
        "buttonDetails": "[{\"confirmPrompt\":\"null,Are you sure you want to dismiss the Alert(s)?,Are you sure you want to dismiss the selected Alert(s) for all the Users?\",\"AmsActionIds\":\"0,1,2\",\"errorCode\":0,\"actions\":\"null,null,null\",\"captions\":\"Close,Dismiss,Action Taken\"}]",
        "aggregateAlertId": "0",
        "messageTypeId": 1,
        "id": 56449657,
        "alertId": 14943786,
        "applicationId": 2,
        "status": 1
      },
      {
        "alertSendDate": "03:10 am",
        "subject": "Certification Expired",
        "errorCode": 0,
        "alertDefId": 1,
        "groupBy": "05/19/2021",
        "message": "LAURA BROTHERS's Annual Competency Certification will expire on 06/17/2021 [RCHC GA TOCCOA (30017)].",
        "userId": 52171,
        "buttonDetails": "[{\"confirmPrompt\":\"null,Are you sure you want to dismiss the Alert(s)?,Are you sure you want to dismiss the selected Alert(s) for all the Users?\",\"AmsActionIds\":\"0,1,2\",\"errorCode\":0,\"actions\":\"null,null,null\",\"captions\":\"Close,Dismiss,Action Taken\"}]",
        "aggregateAlertId": "0",
        "messageTypeId": 1,
        "id": 56454020,
        "alertId": 14945540,
        "applicationId": 2,
        "status": 1
      },
      {
        "alertSendDate": "03:10 am",
        "subject": "Certification Expired",
        "errorCode": 0,
        "alertDefId": 1,
        "groupBy": "05/19/2021",
        "message": "CHRISTY NORTON's Annual Competency Certification will expire on 06/17/2021 [RCHC GA TOCCOA (30017)].",
        "userId": 52171,
        "buttonDetails": "[{\"confirmPrompt\":\"null,Are you sure you want to dismiss the Alert(s)?,Are you sure you want to dismiss the selected Alert(s) for all the Users?\",\"AmsActionIds\":\"0,1,2\",\"errorCode\":0,\"actions\":\"null,null,null\",\"captions\":\"Close,Dismiss,Action Taken\"}]",
        "aggregateAlertId": "0",
        "messageTypeId": 1,
        "id": 56449633,
        "alertId": 14943778,
        "applicationId": 2,
        "status": 1
      },
      {
        "alertSendDate": "03:10 am",
        "subject": "Certification Expired",
        "errorCode": 0,
        "alertDefId": 1,
        "groupBy": "05/19/2021",
        "message": "LAURA BROTHERS's TB Skin Test Certification will expire on 06/18/2021 [RCHC GA TOCCOA (30017)].",
        "userId": 52171,
        "buttonDetails": "[{\"confirmPrompt\":\"null,Are you sure you want to dismiss the Alert(s)?,Are you sure you want to dismiss the selected Alert(s) for all the Users?\",\"AmsActionIds\":\"0,1,2\",\"errorCode\":0,\"actions\":\"null,null,null\",\"captions\":\"Close,Dismiss,Action Taken\"}]",
        "aggregateAlertId": "0",
        "messageTypeId": 1,
        "id": 56454063,
        "alertId": 14945554,
        "applicationId": 2,
        "status": 1
      },
      {
        "alertSendDate": "03:10 am",
        "subject": "Certification Expired",
        "errorCode": 0,
        "alertDefId": 1,
        "groupBy": "05/19/2021",
        "message": "LAURA BROTHERS's First Aid Certification will expire on 06/17/2021 [RCHC GA TOCCOA (30017)].",
        "userId": 52171,
        "buttonDetails": "[{\"confirmPrompt\":\"null,Are you sure you want to dismiss the Alert(s)?,Are you sure you want to dismiss the selected Alert(s) for all the Users?\",\"AmsActionIds\":\"0,1,2\",\"errorCode\":0,\"actions\":\"null,null,null\",\"captions\":\"Close,Dismiss,Action Taken\"}]",
        "aggregateAlertId": "0",
        "messageTypeId": 1,
        "id": 56454023,
        "alertId": 14945542,
        "applicationId": 2,
        "status": 1
      },
      {
        "alertSendDate": "03:10 am",
        "subject": "Certification Expired",
        "errorCode": 0,
        "alertDefId": 1,
        "groupBy": "05/19/2021",
        "message": "LAURA BROTHERS's BBP/Infection Control Certification will expire on 06/17/2021 [RCHC GA TOCCOA (30017)].",
        "userId": 52171,
        "buttonDetails": "[{\"confirmPrompt\":\"null,Are you sure you want to dismiss the Alert(s)?,Are you sure you want to dismiss the selected Alert(s) for all the Users?\",\"AmsActionIds\":\"0,1,2\",\"errorCode\":0,\"actions\":\"null,null,null\",\"captions\":\"Close,Dismiss,Action Taken\"}]",
        "aggregateAlertId": "0",
        "messageTypeId": 1,
        "id": 56454019,
        "alertId": 14945539,
        "applicationId": 2,
        "status": 1
      }
    ]

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

}
