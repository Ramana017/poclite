import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-delivery-plan',
  templateUrl: './delivery-plan.component.html',
  styleUrls: ['./delivery-plan.component.sass']
})
export class DeliveryPlanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  dropdown() {
    $(".user-menu-dropdown").toggleClass("show");
  }
  consumedUnits(){
    $(".consumed-units").toggleClass("show");
  }
}
