import { Component, OnInit } from '@angular/core';
import { PsServiceService } from '../ps-service.service';

@Component({
  selector: 'app-ps-dcs',
  templateUrl: './ps-dcs.component.html',
  styleUrls: ['./ps-dcs.component.sass']
})
export class PsDcsComponent implements OnInit {

  public dcsLowerBound: number = 1;
  public dcsUpperBound: number = 20;
  public dcsPerPage: number = 20;
  public dcstotalRecordsCount: number;
  public userId:number;
  public dcsId:number=null;
  public dcsList: any = [];
  public maximize:boolean=false;



  constructor( public psService: PsServiceService,
    ) {
       let data: any = JSON.parse(sessionStorage.getItem('useraccount'));
       this.userId = data.userId;
      }
  ngOnInit(): void {
    this.getDcsList();
    this.getDcsFilter()
  }
  public getDcsList() {
    const userData = {userId: this.userId, dcsId: this.dcsId==null?0:this.dcsId, lowerBound: this.dcsLowerBound, upperBound: this.dcsUpperBound,
    };
    this.psService.getDcsList(JSON.stringify(userData)).subscribe((res) => {
        console.log(res);
        this.dcsList = res.dcsList;
        this.dcstotalRecordsCount = res.totalRecordsCount;
      });
  }
  public getDcsFilter(){
    let obj = {userId: this.userId};
    this.psService.getDcsList(JSON.stringify(obj)).subscribe((res) => {
        console.log(res);
       this.psService.dcsList = res.dcsList;
      });
  }

  public dcsPageNext() {
    this.dcsLowerBound = this.dcsLowerBound + this.dcsPerPage;
    this.dcsUpperBound = this.dcsUpperBound + this.dcsPerPage;
    this.getDcsList();
  }
  public dcsPagePrev() {
    this.dcsLowerBound = this.dcsLowerBound - this.dcsPerPage;
    this.dcsUpperBound = this.dcsUpperBound - this.dcsPerPage;
    console.log(this.dcsUpperBound, this.dcsLowerBound, this.dcsPerPage);
    this.getDcsList();
  }
  public dcspagereset(): void {
    this.dcsLowerBound = 1;
    this.dcsUpperBound = this.dcsPerPage;
    this.getDcsList();
  }
}
