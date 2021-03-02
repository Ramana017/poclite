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
