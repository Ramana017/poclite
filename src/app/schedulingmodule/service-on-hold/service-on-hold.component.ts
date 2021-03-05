import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-service-on-hold',
  templateUrl: './service-on-hold.component.html',
  styleUrls: ['./service-on-hold.component.sass']
})
export class ServiceOnHoldComponent implements OnInit {
public covidCondition:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  dropdown() {
    $(".dashboard-nav-dropdown").toggleClass("show");
  }
  onChange(value) {
    var a = value;
    console.log(a);
   if(a == 1){
     this.covidCondition = true;
   }
   else{
    this.covidCondition = false;
  }
}
}
