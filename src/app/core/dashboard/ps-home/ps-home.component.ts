import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';
import { PsAdmissionsComponent } from '../ps-admissions/ps-admissions.component';
import { PsAuthorizationComponent } from '../ps-authorization/ps-authorization.component';
import { PsServiceService } from '../ps-service.service';
declare var $: any;
@Component({
  selector: 'app-ps-home',
  templateUrl: './ps-home.component.html',
  styleUrls: ['./ps-home.component.sass']
})
export class PsHomeComponent implements OnInit {
  @Input()authoriztion:PsAuthorizationComponent;
  @Input()admission:PsAdmissionsComponent;

  public psList: any = [];

  public psLowerBound: number = 1;
  public psUpperBound: number = 20;
  public psPerPage: number = 20;
  public pstotalRecordsCount: number = 0;
  private userId: number;
  public psId = null;
  public maximize:boolean=false;
  public psListArray: Array<any>;



  constructor( public psService: PsServiceService,
    public apiService: ApiserviceService,
    public userDetailService:UserdetailsService,
   ) {
      let data: any = JSON.parse(sessionStorage.getItem('useraccount'));
      this.userId = data.userId;
     }

  ngOnInit(): void {
    this.getPsList();
    this.getPsListFilter();
  }
  public getPsList() {
    console.log(this.psId==null,this.psId)
    this.psList = [];
    let parameters = {userId: this.userId,lowerBound: this.psLowerBound, psId: this.psId != null?this.psId:0,upperBound: this.psUpperBound };
    console.log(parameters);
    this.psService.getPSList(JSON.stringify(parameters)).subscribe((res) => {
        let data: any = res;
        this.psList = data.psList;
        this.pstotalRecordsCount = data.totalRecordsCount;
        console.log(this.psList);
      });
  }
  public getPsListFilter() {
    this.psList = [];
    let parameters = {userId: this.userId};
    console.log(parameters);
    this.psService.getPSList(JSON.stringify(parameters)).subscribe((res) => {
        let data: any = res;
        this.psService.PsList = data.psList;
        console.log(this.psList);
      });
  }
  public psPageNext() {
    this.psLowerBound = this.psLowerBound + this.psPerPage;
    this.psUpperBound = this.psUpperBound + this.psPerPage;
    this.getPsList();
  }
  public psPagePrev() {
    this.psLowerBound = this.psLowerBound - this.psPerPage;
    this.psUpperBound = this.psUpperBound - this.psPerPage;
    console.log(this.psUpperBound, this.psLowerBound, this.psPerPage);
    this.getPsList();
  }
  public pspagereset(): void {
    this.psLowerBound = 1;
    this.psUpperBound = this.psPerPage;
    this.getPsList();
  }
  public onAuthorization(psId){
    this.psService.psAuthorizationid=psId;
    this.authoriztion.authorizationpagereset();

  }
  public onAdmission(psId){
    this.psService.psAdmissionId=psId;
    this.admission.admissionpagereset()

  }

  public onEdit(){
    console.log("hellp")
    document.getElementById('widgetDashboard').classList.add("wizard-dashboard");
    // document.getElementById('right-form-container').show();
    $("#right-form-container").show();
  }
  public onMinMize(){
    // this.maximize=false;

    document.getElementById('widgetDashboard').classList.remove("wizard-dashboard");
  }
}
