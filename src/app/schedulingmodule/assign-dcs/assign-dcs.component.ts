import { OnDestroy } from '@angular/core';
import { Input,Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare var $: any;

@Component({
  selector: 'app-assign-dcs',
  templateUrl: './assign-dcs.component.html',
  styleUrls: ['./assign-dcs.component.sass']
})
export class AssignDCSComponent implements OnDestroy, OnInit {
  public availabilityCheck: boolean=true;
  public scheduleArray: Array<any> = ['Yes', 'No'];

  public assignDCSList:Array<any>=[{"dcsId":14634,"overtimeFlag":1,"dcsName":"ADAMS, CAMILLE","termination_compare_flag":""},{"dcsId":14635,"overtimeFlag":0,"dcsName":"ADAMS, JOHN","termination_compare_flag":""},{"dcsId":946,"overtimeFlag":0,"dcsName":"ADAMS, TAMMY","termination_compare_flag":""},{"dcsId":14619,"overtimeFlag":0,"dcsName":"ALFORD, ASHLEE","termination_compare_flag":""},{"dcsId":15731,"overtimeFlag":0,"dcsName":"ATKINSON, JANICE","termination_compare_flag":""},{"dcsId":14638,"overtimeFlag":0,"dcsName":"AVERY, MANDY","termination_compare_flag":""},{"dcsId":14618,"overtimeFlag":0,"dcsName":"BANKS, ALLISON","termination_compare_flag":""},{"dcsId":14622,"overtimeFlag":0,"dcsName":"BANKS, LYNDA","termination_compare_flag":""},{"dcsId":15554,"overtimeFlag":0,"dcsName":"BARRETT, SHEILA","termination_compare_flag":""},{"dcsId":14659,"overtimeFlag":0,"dcsName":"BENHAM, PAMELA","termination_compare_flag":""}]
  dummy={"futureterminateddcscolor":"#00FFCC","service":"[ICWPS2] ICWPS2 - ICW PERSONAL SUPPORT","assignDCSList":[{"dcsId":14634,"overtimeFlag":1,"dcsName":"ADAMS, CAMILLE","termination_compare_flag":""},{"dcsId":14635,"overtimeFlag":0,"dcsName":"ADAMS, JOHN","termination_compare_flag":""},{"dcsId":946,"overtimeFlag":0,"dcsName":"ADAMS, TAMMY","termination_compare_flag":""},{"dcsId":14619,"overtimeFlag":0,"dcsName":"ALFORD, ASHLEE","termination_compare_flag":""},{"dcsId":15731,"overtimeFlag":0,"dcsName":"ATKINSON, JANICE","termination_compare_flag":""},{"dcsId":14638,"overtimeFlag":0,"dcsName":"AVERY, MANDY","termination_compare_flag":""},{"dcsId":14618,"overtimeFlag":0,"dcsName":"BANKS, ALLISON","termination_compare_flag":""},{"dcsId":14622,"overtimeFlag":0,"dcsName":"BANKS, LYNDA","termination_compare_flag":""},{"dcsId":15554,"overtimeFlag":0,"dcsName":"BARRETT, SHEILA","termination_compare_flag":""},{"dcsId":14659,"overtimeFlag":0,"dcsName":"BENHAM, PAMELA","termination_compare_flag":""}],"overtimevisitcolor":"#CC3399","payorPlan":"1","pastterminateddcscolor":"#33FFFF"}

@Input() dcsObject:any;
  constructor(public modelService:BsModalService,public bsmodelRef: BsModalRef) { }
 public modalRef: BsModalRef;


  ngOnInit(): void {
    console.log("assigndcs component")
  }

  checkAvailability() {
    this.availabilityCheck = false;
  }
  back() {
    this.availabilityCheck = true;
  }

  dropdown() {
    $(".dashboard-nav-dropdown").toggleClass("show");
  }
  public openCriteria(){
    console.log("open criteria")

  }

  public modelHide(){
    this.bsmodelRef.hide()
  }

  ngOnDestroy(){
    console.log('++++++++++++++++')
    console.log("NgOndestroy in assign DCS")
  }
}
