import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';
import { PsServiceService } from '../ps-service.service';

@Component({
  selector: 'app-ps-authorization',
  templateUrl: './ps-authorization.component.html',
  styleUrls: ['./ps-authorization.component.sass']
})
export class PsAuthorizationComponent implements OnInit {

  public authorizationList: any = [];
  public authorizationLowerBound = 1;
  public authorizationUpperBound: number = 20;
  public authorizationPerPage: number = 20;
  public authorizationtotalRecordsCount: number;
  // public psId=null;
  public userId:number;
  public maxmize:boolean=false;


  constructor( public psService: PsServiceService,
   ) {
      let data: any = JSON.parse(sessionStorage.getItem('useraccount'));
      this.userId = data.userId;
     }
  ngOnInit(): void {
    this.getAuthorizationList();
  }
  public  getAuthorizationList() {
    const userData = {
      userId: this.userId,
      psId: this.psService.psAuthorizationid==null?0:this.psService.psAuthorizationid,
      lowerBound: this.authorizationLowerBound,
      upperBound: this.authorizationUpperBound,
    };
    this.psService.getAuthorizationsList(JSON.stringify(userData)).subscribe((res) => {
        this.authorizationList = res.authServiceList;
        this.authorizationtotalRecordsCount = res.totalRecordsCount;
      });
  }

  public authorizationPageNext() {
    this.authorizationLowerBound =
      this.authorizationLowerBound + this.authorizationPerPage;
    this.authorizationUpperBound =
      this.authorizationUpperBound + this.authorizationPerPage;
    this.getAuthorizationList();
  }
  public authorizationPagePrev() {
    this.authorizationLowerBound =
      this.authorizationLowerBound - this.authorizationPerPage;
    this.authorizationUpperBound =
      this.authorizationUpperBound - this.authorizationPerPage;
    console.log(
      this.authorizationUpperBound,
      this.authorizationLowerBound,
      this.authorizationPerPage
    );
    this.getAuthorizationList();
  }
  public authorizationpagereset(): void {
    console.log("Page Reset called")
    this.authorizationLowerBound = 1;
    this.authorizationUpperBound = this.authorizationPerPage;
    this.getAuthorizationList();
  }

}
