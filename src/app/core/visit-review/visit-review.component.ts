import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CorrectionheaderComponent } from 'src/app/corrections/correctionheader/correctionheader.component';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { ReviewExceptionpopupComponent } from '../review-exceptionpopup/review-exceptionpopup.component';
declare var $: any;

@Component({
  selector: 'app-visit-review',
  templateUrl: './visit-review.component.html',
  styleUrls: ['./visit-review.component.sass']
})
export class VisitReviewComponent implements OnInit {
  @ViewChild('autocss') autocss;
  @ViewChild('autodcs') autodcs;
  @ViewChild('autops') autops;
  @ViewChild('autoservice') autoservice;
  @ViewChild('autocss') itemTemplatecss;
  @ViewChild('autodcs') itemTemplatedcs;
  @ViewChild('autops') itemTemplateps;
  @ViewChild('autoservice') itemTemplateservice;
  bsmodelRef: BsModalRef;

  public psId: number = 0;
  public dcsId: number = 0;
  public cssId: number = 0;
  public serviceId: number = 0;
  public officelist: Array<any> = [];
  public noProgressNotesFlag: boolean = false;
  public noPSSignatureFlag: boolean = false;
  public noDCSSignatureFlag: boolean = false;
  public noTaskFlag: boolean = false;
  public perpage = 10
  public lowerBound = 1;
  public upperBound = this.perpage;

  public userId: number;
  public cssList: Array<any> = [];
  public dcsList: Array<any> = [];
  public psList: Array<any> = [];
  public serviceList: Array<any> = [];
  public siteList: Array<any> = [];
  public scheBeginDate: Date = new Date();
  public scheEndDate: Date = new Date();
  public systemDate: Date = new Date()
  public visitReviewListList: Array<visitReviewList> = [];
  public totalRecordsCount: number = 0;
  public psSelected;
  public dcsSelected;
  public getVisitTimesresponse: any = {};
  public getTaskListresponse: Array<any>;
  public getSignaturesresponse: any = {psSignature:'',dcsSignature:''}

  constructor(public apiservice: ApiserviceService, public modalService: BsModalService, public datepipe: DatePipe) {
    var data = JSON.parse(sessionStorage.getItem("useraccount"));
    this.userId = data.userId;
    console.log(this.userId)
    this.scheBeginDate.setDate(this.scheEndDate.getDate() - 7)

  }
  public dropdownSettings = {
    singleSelection: false,
    text: "Code",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    // enableFilterSelectAll	:true,
    noDataLabel: "No Data Available",
    classes: "myclass custom-class",
    showCheckbox: true,
    labelKey: "siteCode",
    // limitSelection: 3,
    primaryKey: 'siteCode',
    escapeToClose: false,
    searchBy: ['siteCode'],
    position: 'top'

  };

  ngOnInit(): void {
    this.getFilterData();
    this.getVisitReviewList();
  }
  public getVisitReviewList() {
    let obj = { "userId": this.userId, "officeIds": this.officelist.length > 0 ? this.officelist.map(x => x.siteId) : [], "psId": this.psId, "dcsId": this.dcsId, "cssId": this.cssId, "serviceId": this.serviceId, "scheBeginDate": this.datepipe.transform(this.scheBeginDate, 'MM/dd/yyyy'), "scheEndDate": this.datepipe.transform(this.scheEndDate, 'MM/dd/yyyy'), "noPSSignatureFlag": this.noPSSignatureFlag ? 1 : 0, "noDCSSignatureFlag": this.noDCSSignatureFlag ? 1 : 0, "noTaskFlag": this.noTaskFlag ? 1 : 0, "noProgressNotesFlag": this.noProgressNotesFlag ? 1 : 0, "lowerBound": this.lowerBound, "upperBound": this.upperBound }
    try {
      this.apiservice.getVisitReviewList(JSON.stringify(obj)).subscribe(
        res => {
          console.log(res);
          let data: any = res;
          this.visitReviewListList = data.visitReviewListList;
          this.totalRecordsCount = data.totalRecordsCount;

        }
      )
    } catch (error) {

    }
  }
  public getFilterData() {
    try {
      this.apiservice.tableFilterData(this.userId).subscribe(res => {
        console.log(res);
        let data: any = res;
        this.psList = data.psList;
        this.dcsList = data.dcsList
        this.cssList = data.CSSList;
        this.serviceList = data.serviceList;
        this.siteList = data.siteList;

      })
    } catch (error) {

    }
  }
  public selectFilterEvent(event?: any, filter?: string) {
    let eventpresent = event ? true : false
    console.log("+++++++", eventpresent, event)
    if (filter == "ps") {
      this.psId = eventpresent ? event.psId : 0;
      this.itemTemplateps.close();
    }
    if (filter == "dcs") {
      this.dcsId = eventpresent ? event.dcsId : 0;
      this.itemTemplatedcs.close();
      console.log(this.dcsId)
    }
    if (filter == "css") {
      this.cssId = eventpresent ? event.cssId : 0;
      this.itemTemplatecss.close();

    }
    if (filter == "service") {
      this.serviceId = eventpresent ? event.serviceId : 0;
      this.itemTemplateservice.close();
    }


  }

  public getVisitTimes(modalId, visitDetailsId) {
    try {
      let obj = { "visitDetailId": visitDetailsId }
      this.apiservice.getVisitTimes(JSON.stringify(obj)).subscribe(res => {
        console.log(res)
        this.getVisitTimesresponse = res;
        $(modalId).modal({ keyboard: false, backdrop: false }, 'show')
      })
    } catch (error) {

    }

  }
  public getTaskList(modalId, departureInfoId) {
    try {
      let obj = { "departureInfoId": departureInfoId }
      this.apiservice.getTaskList(JSON.stringify(obj)).subscribe(res => {
        console.log(res)
        let data: any = res;
        this.getTaskListresponse = data;
        $(modalId).modal({ keyboard: false, backdrop: false }, 'show')
      })
    } catch (error) {

    }

  }
  public getSignatures(modalId, arrivalInfoId,departureInfoId) {
    try {
      let obj = {"arrivalInfoId":arrivalInfoId,"departureInfoId":departureInfoId}
      this.apiservice.getSignatures(JSON.stringify(obj)).subscribe(res => {
        console.log(res)
        this.getSignaturesresponse = res;
        $(modalId).modal({ keyboard: false, backdrop: false }, 'show')
      })
    } catch (error) {

    }
  }

  public filtertoggles(flag, event) {
    console.log(event.target.checked);
    if (flag = "ps") {
      this.noPSSignatureFlag = event.target.checked
    } else if (flag = "task") {
      this.noTaskFlag = event.target.checked
    } else if (flag = "dcs") {
      this.noDCSSignatureFlag = event.target.checked
    } else if (flag = "progress") {
      this.noProgressNotesFlag = event.target.checked
    }
  }
  public datchange() {
    // console.log(this.endDate)
    console.log("scheBeginDate", this.datepipe.transform(this.scheBeginDate, 'MM/dd/yyyy'))
    console.log("scheEndDate", this.datepipe.transform(this.scheEndDate, 'MM/dd/yyyy'))
    console.log(this.scheEndDate > this.systemDate)
    if (this.scheEndDate < this.scheBeginDate) {
      this.scheEndDate = new Date(this.datepipe.transform(this.scheBeginDate, 'MM/dd/yyyy'))
    }
    if (this.scheEndDate > this.systemDate) {
      this.scheEndDate = new Date(this.datepipe.transform(this.systemDate, 'MM/dd/yyyy'))

    }
    if (this.scheBeginDate > this.systemDate) {
      this.scheBeginDate = new Date(this.datepipe.transform(this.systemDate, 'MM/dd/yyyy'))
    }
    if (this.scheBeginDate > this.scheEndDate) {
      this.scheBeginDate = new Date(this.datepipe.transform(this.scheEndDate, 'MM/dd/yyyy'))
    }
    console.log("finalscheBeginDate", this.datepipe.transform(this.scheBeginDate, 'MM/dd/yyyy'))
    console.log("finalscheEndDate", this.datepipe.transform(this.scheEndDate, 'MM/dd/yyyy'))
  }
  public prevpage(): void {
    this.lowerBound = this.lowerBound - this.perpage;
    this.upperBound = this.upperBound - this.perpage;
    this.getVisitReviewList();

  }
  public nextPage(): void {
    this.lowerBound = this.lowerBound + this.perpage;
    this.upperBound = this.upperBound + this.perpage;
    this.getVisitReviewList();

  }
  public pageChange() {
    this.lowerBound = 1;
    this.upperBound = this.perpage;
    this.getVisitReviewList();
  }

  public correctException(i: number) :void{
    // this.exceptionCount = 0;
let disp;
    console.log("++++", this.visitReviewListList[i])
    this.visitReviewListList[i].ArrGpsException=this.visitReviewListList[i].arrGpsException
    this.visitReviewListList[i].DepGpsException=this.visitReviewListList[i].depGpsException
    this.visitReviewListList[i].id=this.visitReviewListList[i].callMgmtExceptionsId

    //checking exception counts -----------------------------------------------------------------------------
    if (this.visitReviewListList[i].arrGpsException == 1 || this.visitReviewListList[i].depGpsException == 1) {
      disp=0;
    }else
    if (this.visitReviewListList[i].arrCallerIdException == 1 || this.visitReviewListList[i].depCallerIdException == 1) {
      disp=2;
    }else
    if (this.visitReviewListList[i].scheduleVarException == 1) {
      disp=1;
    }else
    if (this.visitReviewListList[i].arrTravelTimeException == 1) {
      disp=3;
    }else
    if (this.visitReviewListList[i].depMileageException == 1 || this.visitReviewListList[i].arrMileageException == 1) {
      disp=4;
    }

    //----------------------------------------------------------------------------------------------------
    var userData = JSON.stringify(this.visitReviewListList[i])
    localStorage.setItem('userlist', userData);
    this.bsmodelRef = this.modalService.show(ReviewExceptionpopupComponent, {
      backdrop: false,
      animated: true,
      keyboard: false,
      ignoreBackdropClick: true,
      initialState: {
        display: disp,
        userID: this.userId,
        data: {}
      }
    })
    // this.bsmodelRef.content.closeBtnName = 'Close';
  }

  filtermenu() {
    $(".filter-menu").toggleClass("show");
  }
}
interface visitReviewList {
  visitDetailsId: number,
  callMgmtExceptionsId: number,
  dcsSignatureAval: string,
  psSignatureAval: string,
  procedureCode: string,
  scheduledEndDateTime: string,
  exceptionCount: number,
  siteName: string,
  scheduledDate: string,
  depMileageException: number,
  psId: number,
  arrTravelTimeException: number,
  depCallerIdException: number,
  cssName: string,
  missedArrException: number,
  totalExceptions: number,
  arrGpsException: number,
  officeId: number,
  reportedDate: string,
  cssId: number,
  scheduledStartTime: string,
  reportedStartTime: string,
  departureDateTime: string,
  scheduledBeginDateTime: string,
  arrivalDateTime: string,
  plan: string,
  departureId: number,
  dcsId: number,
  siteCode: number,
  missedDepException: number,
  dcsName: string,
  arrivalId: number,
  scheduledEndTime: string,
  accountNumber: number,
  serviceName: string,
  planCode: number,
  depGpsException: number,
  scheduleVarException: number,
  taskCount: number,
  psAddressId: number,
  arrCallerIdException: number,
  psName: string,
  reportedEndTime: string,
  arrMileageException: number,
  payorCode: number,
  progressNotesAval: string,
  isApproved: string,
  arrivalInfoId: number,
  departureInfoId: number,
  ArrGpsException:number,
  DepGpsException:number,
  id:number

}
