import { Component, OnInit, ViewChild } from '@angular/core';
import { PsAuthorizationComponent } from '../ps-authorization/ps-authorization.component';
import { PsServiceService } from '../ps-service.service';

@Component({
  selector: 'app-ps-admissions',
  templateUrl: './ps-admissions.component.html',
  styleUrls: ['./ps-admissions.component.sass']
})
export class PsAdmissionsComponent implements OnInit {
  @ViewChild(PsAuthorizationComponent) authorizationComponent: PsAuthorizationComponent;

  public psListArray: Array<any>;
  public admissionsList: any = [];
  private userId: number;
  public admissionLowerBound: number = 1;
  public admissionUpperBound: number = 20;
  public admissionPerPage: number = 20;
  // public admissionId: number = null;
  public admissiontotalRecordsCount: number;
  public maxmize:boolean=false;


  constructor(public psService: PsServiceService) {
    let data: any = JSON.parse(sessionStorage.getItem('useraccount'));
    this.userId = data.userId;

   }

  ngOnInit(): void {
    this.getAdmissionsList()
  }
  public getAdmissionsList() {
    let params = {
      userId: this.userId,psId: this.psService.psAdmissionId==null?0:this.psService.psAdmissionId,lowerBound: this.admissionLowerBound,upperBound: this.admissionUpperBound,
    };
    this.psService
      .getAdmissionsList(JSON.stringify(params))
      .subscribe((res) => {
        console.log(res);
        let data: any = res;
        this.admissionsList = data.admissionList;
        this.admissiontotalRecordsCount = data.totalRecordsCount;
      });
  }
  public admissionPageNext() {
    this.admissionLowerBound = this.admissionLowerBound + this.admissionPerPage;
    this.admissionUpperBound = this.admissionUpperBound + this.admissionPerPage;
    this.getAdmissionsList();
  }
  public admissionPagePrev() {
    this.admissionLowerBound = this.admissionLowerBound - this.admissionPerPage;
    this.admissionUpperBound = this.admissionUpperBound - this.admissionPerPage;
    console.log(
      this.admissionUpperBound,
      this.admissionLowerBound,
      this.admissionPerPage
    );
    this.getAdmissionsList();
  }
  public admissionpagereset(): void {
    this.admissionLowerBound = 1;
    this.admissionUpperBound = this.admissionPerPage;
    this.getAdmissionsList();
  }

  public onAuthorization(psId){
    this.psService.psAuthorizationid=psId;
    this.authorizationComponent?.authorizationpagereset();

  }

}
