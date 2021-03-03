import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-assign-dcs',
  templateUrl: './assign-dcs.component.html',
  styleUrls: ['./assign-dcs.component.sass']
})
export class AssignDCSComponent implements OnInit {
  public availabilityCheck: boolean=true;
  public scheduleArray: Array<any> = ['Yes', 'No'];


  constructor() { }

  ngOnInit(): void {
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
}
