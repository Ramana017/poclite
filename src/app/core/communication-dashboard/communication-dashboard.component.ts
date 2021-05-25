import { DatePipe } from '@angular/common';
import { Component, OnInit, HostListener, TemplateRef, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { alertForDevices, AmsAlertsServiceService, amsLogin } from 'src/app/services/ams-alerts-service.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
declare var $: any;
import { ToastRef, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-communication-dashboard',
  templateUrl: './communication-dashboard.component.html',
  styleUrls: ['./communication-dashboard.component.sass']
})
export class CommunicationDashboardComponent implements OnInit, AfterViewInit {
  // @ViewChild('op', { static: true }) public myScrollContainer: any;

  // @HostListener('window:resize', ['event'])
  customers: any = [];
  public userDetails: any;
  constructor(public toaster: ToastrService, public datepipe: DatePipe, private sanitizer: DomSanitizer, public dashboardService: DashboardService,
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
    this.dcsMessageInIt();
    this.authenticateUserForDevices();
    $(".p-overlaypanel-content").attr('id','msg-box');
    var objDiv = document.getElementById("msg-box");
    setTimeout(function(){ objDiv.scrollTop = objDiv?.scrollHeight; }, 1000);


  }
  ngAfterViewInit() {
    this.intialStartDate.setDate(this.todayDate.getDate() - 7);
    this.amsDateFilter = [this.intialStartDate, this.todayDate];
    this.appliedamsStartDate = this.datepipe.transform(this.amsDateFilter[0], 'MM/dd/yyyy');
    this.appliedamsEndDate = this.datepipe.transform(this.amsDateFilter[1], 'MM/dd/yyyy');;

    this.pointofCareIntialStartDate.setDate(this.todayDate.getDate() - 30)
    this.pointofCareStartDate = this.pointofCareIntialStartDate;
    this.pocStartDate = this.datepipe.transform(this.pointofCareStartDate, 'MM/dd/yyyy');
    this.pocEndDate = this.datepipe.transform(this.pointofCareEndDate, 'MM/dd/yyyy');

    this.resize();
    this.onResize();
    this.getPocReleaseNotesList();
    // this.myScrollContainer.nativeElement.className = 'p-overlaypanel-content';
    // console.log(this.myScrollContainer.nativeElement.className.innerHeight)
    // this.myScrollContainer.nativeElement.scrollTo(0, this.myScrollContainer.nativeElement.scrollHeight);
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
  public applicationId = null;
  public alertFlag = 1;
  public alertButtonDetails: any;
  public alertbuttons = [];
  public applicationList = [];
  public amsDateFilter = [];
  public amsSearchBy = '';
  public appliedamsStartDate = '';
  public appliedamsEndDate = '';
  public appliedamsSearch = '';
  public appliedApplicationId = 0;
  public appliedAlertDefinationId = 0;

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
              console.log("hello")
              this.alertDefinitionList = res;
            }
          })
      } catch (error) {

      }

  }

  public onApplicationIdChange(){
    this.alertDefinitionList=[];
    this.alertDefinationId=null;
    if (this.applicationId != null) {
       this.getAlertDefinitionList();
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
      this.amsService.getAlertsForDevices(this.amsAuthenicateResponse.userId, this.appliedApprovalStartDate, this.appliedamsEndDate, this.appliedamsSearch, 1, this.appliedApplicationId, this.appliedAlertDefinationId, this.amsAuthenicateResponse.sessionId).subscribe(res => {
        console.log(res);
        this.amsAlertList = res;
        this.amsAlertList.map(x => {
          x.buttonsNameArray = ((JSON.parse(x.buttonDetails)[0].captions.split(',')));
          x.buttonsActionIdsArray = ((JSON.parse(x.buttonDetails)[0].AmsActionIds.split(',')));
          x.buttonsActionArray = ((JSON.parse(x.buttonDetails)[0].actions.split(',')));
          x.confirmPromptArray = (JSON.parse(x.buttonDetails)[0].confirmPrompt.split(','));

        })
        console.log(this.amsAlertList)

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

  public processDynamicAlert(item, i) {
    Swal.fire({
      title: item.confirmPromptArray[i],
      icon: 'question',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: item.buttonsNameArray[i],
      showCancelButton: true,

    }).then((result) => {
      if (result.isConfirmed) {
        this.processDynamicActions(item, i);
      }
    })
  }
  public processDynamicActions(item, i) {



    try {
      console.log(item, i)
      // (userId,applicationId,captions,actions,amsActions,ids,alertIds,aggregateAlertIds,sessionId)
      this.amsService.processDynamicActions(this.amsAuthenicateResponse.userId, item.applicationId, item.buttonsNameArray[i], item.buttonsActionArray[i], item.buttonsActionIdsArray[i], item.id, item.alertId, item.aggregateAlertId, this.amsAuthenicateResponse.sessionId).subscribe(res => {
        console.log("res", res);
        if (res[0].returnFlag == 1) {
          Swal.fire('', 'Saved successfully', 'success');
          this.getAlertsForDevices();
        } else {
          Swal.fire('', 'Failed to save', 'error');
        }

      })
    } catch (error) {

    }
  }


  public onAmsSearch(template) {
    if (this.amsDateFilter[0] == null || this.amsDateFilter[1] == null) {
      Swal.fire('Invalid Dates', 'Start date and End date are mandatory feilds', 'warning')

    } else if (this.amsDateFilter[0] <= this.amsDateFilter[1]) {
      this.appliedamsStartDate = this.datepipe.transform(this.amsDateFilter[0], 'MM/dd/yyyy');
      this.appliedamsEndDate = this.datepipe.transform(this.amsDateFilter[1], 'MM/dd/yyyy');;
      this.appliedApplicationId = this.applicationId == null ? 0 : this.applicationId;
      this.appliedAlertDefinationId = this.alertDefinationId == null ? 0 : this.alertDefinationId;
      this.appliedamsSearch = this.amsSearchBy;

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
  public widgetReSize(flag, widgetName) {
    // console.log(template)
    // template.hide();

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
  // showPositionDialog(position: string) {
  //   this.position = position;
  //   this.displayPosition = true;
  // }
  // showcreateExceptionDialog(position: string) {
  //   this.position = position;
  //   this.createException = true;
  // }
  // showcreateAvailabilityDialog(position: string) {
  //   this.position = position;
  //   this.createAvailability = true;
  // }


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
  public approvalLowerBound = 1;
  public approvalUpperBound = 10;
  public approvalperPage = 10;
  public approvalTotalCount = 0;
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


    if (flag) { this.approvalpageReset(); template.hide() } else {
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
        this.approvalTotalCount = res.totalRecordsCount;
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
    console.log(this.appApprovalEndDate, this.appApprovalStartDate, this.appApprovalStartDate > this.appApprovalEndDate)
    if (this.appApprovalStartDate == null || this.appApprovalEndDate == null) {
      Swal.fire('Invalid Dates', 'Start date and End date are mandatory feilds', 'warning')

    }
    else if (this.appApprovalStartDate > this.appApprovalEndDate) {
      Swal.fire('Invalid Dates', 'Start date cannot be greater than End date', 'warning')

    } else {
      this.appliedApprovalStartDate = this.datepipe.transform(this.appApprovalStartDate, 'MM/dd/yyyy');
      this.appliedApprovalEndDate = this.datepipe.transform(this.appApprovalEndDate, 'MM/dd/yyyy');
      this.appliedApprovalTypeId = this.approvalTypeId != null ? this.approvalTypeId : 0;
      this.appliedDcsId = this.dcsFilterId != null ? this.dcsFilterId : 0;
      this.appliedStatusId = this.statusId != null ? this.statusId : 0;
      template.hide();
      this.approvalpageReset();
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
        this.dashboardService.approvingEditPunch((obj)).subscribe(res => {
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
        this.currentApprovedComments = this.appAvailabilityList.approvedComments ? this.appAvailabilityList.approvedComments : '';

        this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'available-modal' }));

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
      let obj = { dcsId: item.dcsId, startDate: item.startDate, endDate: item?.endDate ? item.endDate : '' }
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
        if (this.appAvailabilityEffectedVisitsResponse.effectedVisitsList.length > 0 && this.appAvailabilityEffectedVisitsResponse.availabilityId > 0 && (this.appAvailabilityEffectedVisitsResponse?.errorMsg.length > 0)) {
          //direct
          this.dcsmodelRef = this.modalService.show(template, Object.assign({}, { class: 'approval-modal' }));

        } else if (this.appAvailabilityEffectedVisitsResponse?.errorMsg.length > 0) {
          Swal.fire('', this.appAvailabilityEffectedVisitsResponse.errorMsg, 'error')
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
        endDate: this.appAvailabilityList?.endDate ? this.appAvailabilityList.endDate : '',
        days: this.appAvailabilityList.days,
        statusId: +(this.currentStatus),
        userId: this.userDetails.userId,
        availabilityId: flag ? 0 : this.appAvailabilityEffectedVisitsResponse.availabilityId,
        startTime1: this.appAvailabilityList.startTime1,
        endTime1: this.appAvailabilityList.endTime1,
        startTime2: this.appAvailabilityList?.startTime2 ? this.appAvailabilityList.startTime2 : '',
        endTime2: this.appAvailabilityList?.endTime2 ? this.appAvailabilityList.endTime2 : '',
        lastUpdated: flag ? 0 : this.appAvailabilityEffectedVisitsResponse.lastUpdated,
        actualStartDate:this.appAvailabilityEffectedVisitsResponse.actualStartDate?this.appAvailabilityEffectedVisitsResponse.actualStartDate:''
      }
      try {
        this.appApprovalSpinner++;
        this.ngxspineer.show('spinner1');
        this.dashboardService.approveAppDCSAvailability((obj)).subscribe(res => {
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
        this.currentApprovedComments = this.appExceptionList.approvedComments ? this.appExceptionList.approvedComments : '';

        this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'available-modal' }));

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
        let obj = { dcsId: item.dcsId, startDate: item.startDate, endDate: item?.endDate ? item.endDate : '' }
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
        this.dashboardService.approveAppDCSException((obj)).subscribe(res => {
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

  /*----------------------------------- APP Approval ENDED------------------------------  */


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
        this.pocTotalRecordsCount = res.totalRecordsCount;
        this.ngxspineer.hide('spinner3');
      }, err => {
        Swal.fire('404 Not Found', '', 'error')
        this.ngxspineer.hide('spinner3');

      })

    } catch (error) {

    }
  }
  public onPocSearch(template) {
    if (this.pointofCareStartDate == null || this.pointofCareEndDate == null) {
      Swal.fire('Invalid Dates', 'Start date and End date are mandatory feilds', 'warning')

    }
    else if (this.pointofCareStartDate > this.pointofCareEndDate) {
      Swal.fire('Invalid Dates', 'Start date cannot be greater than End date', 'warning')

    } else {
      this.pocStartDate = this.datepipe.transform(this.pointofCareStartDate, 'MM/dd/yyyy');
      this.pocEndDate = this.datepipe.transform(this.pointofCareEndDate, 'MM/dd/yyyy');
      template.hide();
      this.pocpageReset();
    }
  }

  public getPocReleaseNotesFile(id, fileName) {
    try {
      this.ngxspineer.show('spinner3');
      this.dashboardService.getPocReleaseNotesFile(id).subscribe(res => {
        this.pocReleaseNotesFile = (res.fileData);
        this.ngxspineer.hide('spinner3');
        var a: any = document.createElement("a");
        a.style = "display: none";

        const byteArray = new Uint8Array(atob(res.fileData).split('').map(char => char.charCodeAt(0)));
        var file = new Blob([byteArray], { type: 'application/pdf' });
        var fileURL = window.URL.createObjectURL(file);
        window.open(fileURL);
        // var a:any = document.createElement("a");
        // a.href = fileURL;
        // a.target = '_blank';
        // // Don't set download attribute
        // a.download = fileName;
        // a.click();

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

  /*----------------------------------DCS MESSAGES STARTED-----------------------------------------------*/
  public dcsStartDate: Date = new Date();
  public dcsEndDate: Date = new Date();
  public appliedDcsStartDate = "";
  public appliedDcsEndDate = '';
  public messageDcsId = null;
  public appliedmessageDcsId = 0;
  public dcsLowerBound = 1;
  public dcsUpperBound = 10;
  public dcsPerPage = 10;
  public dcsTotalRecordCount = 0;
  public dcsSpinner = 0;
  public allDcsWithRecentMessage = [];
  public dcsMessagesForUser = [];
  public currentMessage = '';
  public currentDcs: any;

  public dcsMessageInIt() {
    this.dcsStartDate.setDate(this.todayDate.getDate() - 7);
    this.appliedDcsStartDate = this.datepipe.transform(this.dcsStartDate, 'MM/dd/yyyy');
    this.appliedDcsEndDate = this.datepipe.transform(this.dcsEndDate, 'MM/dd/yyyy');
    this.getAllDcsWithRecentMessage();

  }

  public onDcsSearch(template) {

    if (this.dcsStartDate == null || this.dcsEndDate == null) {
      Swal.fire('Invalid Dates', 'Start date and End date are mandatory feilds', 'warning')

    }
    else if (this.dcsStartDate > this.dcsEndDate) {
      Swal.fire('Invalid Dates', 'Start date cannot be greater than End date', 'warning')

    } else {

      this.appliedDcsStartDate = this.datepipe.transform(this.dcsStartDate, 'MM/dd/yyyy');
      this.appliedDcsEndDate = this.datepipe.transform(this.dcsEndDate, 'MM/dd/yyyy');
      this.appliedmessageDcsId = this.messageDcsId == null ? 0 : this.messageDcsId;
      this.dcsPageReset();
      template.hide();
    }
  }
  public getAllDcsWithRecentMessage() {
    try {
      this.sendmessagecount=0;
      this.dcsSpinner++;
      this.ngxspineer.show('dcsSpinner');
      let obj = { userId: this.userDetails.userId, dcsId: this.appliedmessageDcsId, startDate: this.appliedDcsStartDate, endDate: this.appliedDcsEndDate, lowerBound: this.dcsLowerBound, upperBound: this.dcsUpperBound };
      this.dashboardService.getAllDcsWithRecentMessage(JSON.stringify(obj)).subscribe(res => {
        this.dcsSpinner--;
        if (this.dcsSpinner == 0) {
          this.ngxspineer.hide('dcsSpinner');
          console.log(res);
          this.dcsTotalRecordCount = res.totalRecordsCount;
          this.allDcsWithRecentMessage = res.allDcsWithRecentMessage;
        }

      }, err => {
        this.dcsSpinner--;
        if (this.dcsSpinner == 0) {
          this.ngxspineer.hide('dcsSpinner');
        }

      })
    } catch (error) {

    }

  }
  public currentindex=0;
  public sendmessagecount=0;
  public getDcsMessagesForUser(item,i,dailog?, event?) {
    this.currentDcs = item;
    this.currentindex=i;
      this.allDcsWithRecentMessage[i].unreadMessageCount=0;


    // this.dcsMessagesForUser = [];
    try {
      let obj = { userId: this.userDetails.userId, dcsId: item.dcsId, startDate: this.appliedDcsStartDate, endDate: this.appliedDcsEndDate, lowerBound: 0, upperBound: 0 };
      this.dcsSpinner++;
      this.ngxspineer.show('dcsSpinner');
      this.dashboardService.getDcsMessagesForUser(JSON.stringify(obj)).subscribe(res => {
        this.dcsSpinner--;
        if (this.dcsSpinner == 0) {
          this.ngxspineer.hide('dcsSpinner');
          this.dcsMessagesForUser = res.dcsMessagesForUser;
          this.dcsMessagesForUser.map(x => {
            x.date = this.datepipe.transform(x.createdOn, 'MM/dd/yyyy')
          })
        }
        dailog?.toggle(event);

        $(".p-overlaypanel-content").attr('id','msg-box');
        var objDiv = document.getElementById("msg-box");
        setTimeout(function(){ objDiv.scrollTop = objDiv?.scrollHeight; }, 1000);
        // console.log(objDiv.scrollHeight)

      }, err => {
        this.dcsSpinner--;
        if (this.dcsSpinner == 0) {
          this.ngxspineer.hide('dcsSpinner');
        }
      })

    } catch (error) {
    }
  }
  public saveDcsMessage() {
    if (this.currentMessage.trim().length == 0) {
      //  Swal.fire('','Please enter the message before send','info')
    } else {
      try {
        let obj = { userId: this.userDetails.userId, dcsId: this.currentDcs.dcsId, officeId: this.currentDcs.officeId, message: this.currentMessage };
        this.dcsSpinner++;
        this.ngxspineer.show('dcsSpinner');
        this.dashboardService.saveDcsMessage(JSON.stringify(obj)).subscribe(res => {
          this.dcsSpinner--;
          if (this.dcsSpinner == 0) {
            this.ngxspineer.hide('dcsSpinner');
          }
          this.toaster.success('', res.message, {
            timeOut: 1800
          });
          this.sendmessagecount++;
          this.currentMessage = '';
          // this.getAllDcsWithRecentMessage()

          this.getDcsMessagesForUser(this.currentDcs,this.currentindex);

        }, err => {
          this.dcsSpinner--;
          if (this.dcsSpinner == 0) {
            this.ngxspineer.hide('dcsSpinner');
          }
          this.toaster.error('', "Message sent Failed", {
            timeOut: 1800
          });
        })
      } catch (error) {
      }
    }
  }
  public dcsPageReset() {
    this.dcsLowerBound = 1;
    this.dcsUpperBound = this.dcsPerPage;
    this.getAllDcsWithRecentMessage();
  }
  public dcsPrevPage() {
    this.dcsLowerBound = this.dcsLowerBound - this.dcsPerPage;
    this.dcsUpperBound = this.dcsUpperBound - this.dcsPerPage;
    this.getAllDcsWithRecentMessage();
  }
  public dcsNextPage() {
    this.dcsLowerBound = this.dcsLowerBound + this.dcsPerPage;
    this.dcsUpperBound = this.dcsUpperBound + this.dcsPerPage;
    this.getAllDcsWithRecentMessage();
  }

























}
